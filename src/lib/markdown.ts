import type { ArticleData, ArticleFrontmatter, SearchEntry } from "@/types/article";

const mdModules = import.meta.glob<string>("/content/**/*.md", {
  query: "?raw",
  eager: true,
  import: "default",
});

function parseFrontmatter(raw: string): { data: ArticleFrontmatter; content: string } {
  const trimmed = raw.trimStart();
  if (!trimmed.startsWith("---")) {
    return { data: {} as ArticleFrontmatter, content: raw };
  }

  const endIdx = trimmed.indexOf("---", 3);
  if (endIdx === -1) {
    return { data: {} as ArticleFrontmatter, content: raw };
  }

  const frontmatterStr = trimmed.slice(3, endIdx).trim();
  const content = trimmed.slice(endIdx + 3).trimStart();

  const data: Record<string, unknown> = {};
  for (const line of frontmatterStr.split("\n")) {
    const colonIdx = line.indexOf(":");
    if (colonIdx === -1) continue;
    const key = line.slice(0, colonIdx).trim();
    let value: unknown = line.slice(colonIdx + 1).trim();

    if (typeof value === "string") {
      if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
        value = value.slice(1, -1);
      } else if (value.startsWith("[") && value.endsWith("]")) {
        try {
          value = JSON.parse(value.replace(/'/g, '"'));
        } catch {
          value = value.slice(1, -1).split(",").map((s: string) => s.trim());
        }
      }
    }

    data[key] = value;
  }

  return { data: data as ArticleFrontmatter, content };
}

function parseArticle(path: string, raw: string): ArticleData | null {
  const { data: frontmatter, content } = parseFrontmatter(raw);

  if (!frontmatter.title || !frontmatter.date || !frontmatter.category) {
    console.warn(`Skipping ${path}: missing required frontmatter`);
    return null;
  }

  const slug = path
    .replace(/^\/content\//, "")
    .replace(/\.md$/, "")
    .replace(/\//g, "-");

  return {
    ...frontmatter,
    slug,
    content,
    readingTime: Math.max(1, Math.ceil(content.length / 500)),
  };
}

export function getAllArticles(): ArticleData[] {
  return Object.entries(mdModules)
    .map(([path, raw]) => parseArticle(path, raw))
    .filter((a): a is ArticleData => a !== null && !a.draft)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getArticleBySlug(slug: string): ArticleData | undefined {
  return getAllArticles().find((a) => a.slug === slug);
}

export function getSearchIndex(): SearchEntry[] {
  return getAllArticles().map(({ slug, title, summary, category, tags, content }) => ({
    slug,
    title,
    summary,
    category,
    tags,
    contentPreview: content.replace(/[#*`\[\]()>~_\-|]/g, "").slice(0, 500),
  }));
}
