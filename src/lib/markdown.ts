import type { ArticleData, ArticleFrontmatter, SearchEntry, TreeNode } from "@/types/article";

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

  if (!frontmatter.title) {
    console.warn(`Skipping ${path}: missing title`);
    return null;
  }

  const cleanPath = path.replace(/^\/content\//, "").replace(/\.md$/, "");
  const pathParts = cleanPath.split("/");
  const fileName = pathParts[pathParts.length - 1];

  return {
    slug: cleanPath,
    title: frontmatter.title || fileName,
    date: frontmatter.date || new Date().toISOString().split("T")[0],
    summary: frontmatter.summary || "",
    tags: (frontmatter.tags as string[]) || [],
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

export function buildTree(): TreeNode[] {
  const articles = getAllArticles();
  const root: TreeNode[] = [];

  for (const article of articles) {
    const parts = article.slug.split("/");
    let currentLevel = root;
    let currentPath = "";

    for (let i = 0; i < parts.length - 1; i++) {
      const part = parts[i];
      currentPath = currentPath ? `${currentPath}/${part}` : part;

      let node = currentLevel.find((n) => n.name === part && n.type === "folder");
      if (!node) {
        node = {
          name: part,
          type: "folder",
          path: currentPath,
          children: [],
          isOpen: false,
        };
        currentLevel.push(node);
      }
      currentLevel = node.children!;
    }

    const fileName = parts[parts.length - 1];
    currentLevel.push({
      name: article.title,
      type: "file",
      path: article.slug,
      article,
    });
  }

  function sortNodes(nodes: TreeNode[]): TreeNode[] {
    nodes.sort((a, b) => {
      if (a.type === "folder" && b.type === "file") return -1;
      if (a.type === "file" && b.type === "folder") return 1;
      return a.name.localeCompare(b.name, "zh-CN");
    });
    for (const node of nodes) {
      if (node.children) {
        sortNodes(node.children);
      }
    }
    return nodes;
  }

  return sortNodes(root);
}

export function getRecentArticles(limit = 5): ArticleData[] {
  return getAllArticles().slice(0, limit);
}

export function getFolderStats(): { total: number; folders: number } {
  const articles = getAllArticles();
  const folders = new Set<string>();

  for (const article of articles) {
    const parts = article.slug.split("/");
    for (let i = 0; i < parts.length - 1; i++) {
      folders.add(parts.slice(0, i + 1).join("/"));
    }
  }

  return { total: articles.length, folders: folders.size };
}

export function getSearchIndex(): SearchEntry[] {
  return getAllArticles().map((article) => ({
    slug: article.slug,
    title: article.title,
    summary: article.summary,
    contentPreview: article.content.slice(0, 200),
    category: article.category,
  }));
}
