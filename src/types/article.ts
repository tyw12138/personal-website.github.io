export interface ArticleFrontmatter {
  title: string;
  date: string;
  category: string;
  tags: string[];
  summary: string;
  draft?: boolean;
}

export interface ArticleMeta extends ArticleFrontmatter {
  slug: string;
  readingTime: number;
}

export interface ArticleData extends ArticleMeta {
  content: string;
}

export interface Category {
  key: string;
  label: string;
}

export interface SearchEntry {
  slug: string;
  title: string;
  summary: string;
  category: string;
  tags: string[];
  contentPreview: string;
}
