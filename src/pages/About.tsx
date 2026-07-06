import { Github } from "lucide-react";
import { siteConfig } from "@/data/profile";

export default function About() {
  return (
    <div className="container py-8 max-w-3xl">
      <h1 className="text-3xl font-bold text-stone-900 dark:text-stone-100 mb-8">
        关于我
      </h1>

      <div className="card p-8">
        <div className="flex items-center gap-6 mb-6">
          <div className="w-20 h-20 rounded-full bg-indigo-100 dark:bg-indigo-950 flex items-center justify-center text-3xl font-bold text-indigo-600 dark:text-indigo-400">
            T
          </div>
          <div>
            <h2 className="text-2xl font-bold text-stone-900 dark:text-stone-100">
              {siteConfig.author}
            </h2>
            <p className="text-stone-500 dark:text-stone-400 mt-1">
              学习 · 记录 · 成长
            </p>
          </div>
        </div>

        <div className="space-y-4 text-stone-700 dark:text-stone-300 leading-relaxed">
          <p>
            你好，我是 tyw。这个博客用来记录我的学习过程和技术笔记，
            涵盖前端开发、后端技术、算法练习以及日常学习中的思考。
          </p>
          <p>
            我相信「教是最好的学」—— 把学到的东西写下来，
            不仅能加深理解，也能在日后快速回顾。
          </p>
        </div>

        <div className="mt-8 pt-6 border-t border-stone-200 dark:border-stone-700 flex gap-4">
          <a
            href={siteConfig.github}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary"
          >
            <Github className="w-4 h-4" />
            GitHub
          </a>
        </div>
      </div>
    </div>
  );
}
