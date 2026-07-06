export interface ArticleFrontmatter {
  title?: string;
  date?: string;
  summary?: string;
  tags?: string[];
  draft?: boolean;
  category?: string;
}

export interface ArticleData {
  slug: string;
  title: string;
  date: string;
  summary: string;
  tags: string[];
  content: string;
  readingTime: number;
  draft?: boolean;
  category?: string;
}

export interface TreeNode {
  name: string;
  type: "folder" | "file";
  path: string;
  children?: TreeNode[];
  article?: ArticleData;
  isOpen?: boolean;
}

export interface SearchEntry {
  slug: string;
  title: string;
  summary: string;
  contentPreview: string;
}
