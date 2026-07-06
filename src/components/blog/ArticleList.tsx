import { useState } from "react";
import type { ArticleMeta } from "@/types/article";
import ArticleCard from "./ArticleCard";
import CategoryFilter from "./CategoryFilter";
import Empty from "@/components/common/Empty";

interface ArticleListProps {
  articles: ArticleMeta[];
}

export default function ArticleList({ articles }: ArticleListProps) {
  const [category, setCategory] = useState("");

  const filtered = category
    ? articles.filter((a) => a.category === category)
    : articles;

  return (
    <div>
      <div className="mb-6">
        <CategoryFilter selected={category} onChange={setCategory} />
      </div>

      {filtered.length === 0 ? (
        <Empty message="暂无文章" />
      ) : (
        <div className="grid gap-4">
          {filtered.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      )}
    </div>
  );
}
