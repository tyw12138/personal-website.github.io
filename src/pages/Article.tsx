import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import { format } from "date-fns";
import { getArticleBySlug } from "@/lib/markdown";
import { categories } from "@/data/categories";
import Tag from "@/components/common/Tag";
import MarkdownRenderer from "@/components/blog/MarkdownRenderer";

export default function Article() {
  const { slug } = useParams<{ slug: string }>();
  const article = slug ? getArticleBySlug(slug) : undefined;

  if (!article) {
    return (
      <div className="container py-16 text-center max-w-3xl">
        <h1 className="text-2xl font-bold text-stone-900 dark:text-stone-100 mb-4">
          文章未找到
        </h1>
        <p className="text-stone-500 dark:text-stone-400 mb-8">
          你访问的文章不存在或已被删除
        </p>
        <Link to="/" className="btn-primary">
          <ArrowLeft className="w-4 h-4" />
          返回首页
        </Link>
      </div>
    );
  }

  const category = categories.find((c) => c.key === article.category);

  return (
    <div className="container py-8 max-w-3xl">
      <Link
        to="/"
        className="inline-flex items-center gap-1.5 text-sm text-stone-500 hover:text-indigo-600
                   dark:text-stone-400 dark:hover:text-indigo-400 transition-colors mb-8"
      >
        <ArrowLeft className="w-4 h-4" />
        返回列表
      </Link>

      <article>
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-stone-900 dark:text-stone-100 mb-4">
            {article.title}
          </h1>
          <div className="flex flex-wrap items-center gap-3 text-sm text-stone-500 dark:text-stone-400">
            {category && (
              <span className="px-2 py-0.5 rounded-md bg-stone-100 text-stone-600 font-medium
                              dark:bg-stone-800 dark:text-stone-300">
                {category.label}
              </span>
            )}
            <span className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {format(new Date(article.date), "yyyy-MM-dd")}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {article.readingTime} 分钟
            </span>
          </div>
          {article.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-3">
              {article.tags.map((tag) => (
                <Tag key={tag}>{tag}</Tag>
              ))}
            </div>
          )}
        </header>

        <MarkdownRenderer content={article.content} />
      </article>
    </div>
  );
}
