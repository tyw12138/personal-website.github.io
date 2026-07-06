import { getAllArticles } from "@/lib/markdown";
import ArticleList from "@/components/blog/ArticleList";

export default function Home() {
  const articles = getAllArticles();

  return (
    <div className="container py-8 max-w-3xl">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-stone-900 dark:text-stone-100 mb-3">
          学习记录
        </h1>
        <p className="text-stone-500 dark:text-stone-400">
          记录学习过程中的笔记、思考与实践
        </p>
      </div>

      <ArticleList articles={articles} />
    </div>
  );
}
