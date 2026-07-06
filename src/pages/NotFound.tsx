import { Link } from "react-router-dom";
import { Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="container py-24 text-center max-w-3xl">
      <h1 className="text-6xl font-bold text-stone-300 dark:text-stone-700 mb-4">404</h1>
      <p className="text-lg text-stone-500 dark:text-stone-400 mb-8">
        页面未找到
      </p>
      <Link to="/" className="btn-primary">
        <Home className="w-4 h-4" />
        返回首页
      </Link>
    </div>
  );
}
