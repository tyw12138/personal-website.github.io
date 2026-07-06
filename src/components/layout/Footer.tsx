import { Github } from "lucide-react";
import { siteConfig } from "@/data/profile";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-stone-200 dark:border-stone-800 py-8 mt-16">
      <div className="container flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-stone-500 dark:text-stone-400">
        <p>&copy; {year} {siteConfig.author}. All rights reserved.</p>
        <div className="flex items-center gap-4">
          <span>Powered by React & Tailwind</span>
          <a
            href={siteConfig.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors"
            aria-label="GitHub"
          >
            <Github className="w-4 h-4" />
          </a>
        </div>
      </div>
    </footer>
  );
}
