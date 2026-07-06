import matter from "gray-matter";
import type { ArticleData, ArticleFrontmatter, SearchEntry } from "@/types/article";

const mdModules = import.meta.glob<string>("/content/**/*.md", {
  query: "?raw",
  eager: true,
  import: "default",
});

function parseArticle(path: string, raw: string): ArticleData | null {
  const { data, content } = matter(raw);
  const frontmatter = data as ArticleFrontmatter;

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
