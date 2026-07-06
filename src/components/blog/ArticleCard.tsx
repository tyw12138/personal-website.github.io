import { Link } from "react-router-dom";
import { Calendar, Clock } from "lucide-react";
import { format } from "date-fns";
import type { ArticleMeta } from "@/types/article";
import { categories } from "@/data/categories";
import Tag from "@/components/common/Tag";

export default function ArticleCard({ article }: { article: ArticleMeta }) {
  const category = categories.find((c) => c.key === article.category);

  return (
    <Link to={`/article/${article.slug}`} className="card block p-5 group">
      <div className="flex items-center gap-3 mb-2 text-xs text-stone-500 dark:text-stone-400">
        {category && (
          <span className="px-2 py-0.5 rounded-md bg-stone-100 text-stone-600 font-medium
                          dark:bg-stone-800 dark:text-stone-300">
            {category.label}
          </span>
        )}
        <span className="flex items-center gap-1">
          <Calendar className="w-3.5 h-3.5" />
          {format(new Date(article.date), "yyyy-MM-dd")}
        </span>
        <span className="flex items-center gap-1">
          <Clock className="w-3.5 h-3.5" />
          {article.readingTime} min
        </span>
      </div>

      <h2 className="text-lg font-semibold text-stone-900 group-hover:text-indigo-600
                     dark:text-stone-100 dark:group-hover:text-indigo-400 transition-colors mb-2">
        {article.title}
      </h2>

      <p className="text-sm text-stone-500 dark:text-stone-400 line-clamp-2 mb-3">
        {article.summary}
      </p>

      {article.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {article.tags.map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </div>
      )}
    </Link>
  );
}
