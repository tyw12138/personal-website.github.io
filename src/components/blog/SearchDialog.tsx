import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Search as SearchIcon, X } from "lucide-react";
import { useSearch } from "@/hooks/useSearch";
import { categories } from "@/data/categories";

interface SearchDialogProps {
  open: boolean;
  onClose: () => void;
}

export default function SearchDialog({ open, onClose }: SearchDialogProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const { query, setQuery, results } = useSearch();

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open]);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50" onClick={onClose}>
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
      <div
        className="absolute top-[15%] left-1/2 -translate-x-1/2 w-full max-w-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mx-4 bg-white rounded-xl shadow-2xl border border-stone-200 overflow-hidden dark:bg-stone-900 dark:border-stone-700">
          <div className="flex items-center gap-3 px-4 py-3 border-b border-stone-200 dark:border-stone-700">
            <SearchIcon className="w-5 h-5 text-stone-400 shrink-0" />
            <input
              ref={inputRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="搜索文章..."
              className="flex-1 bg-transparent outline-none text-stone-900 placeholder:text-stone-400 dark:text-stone-100"
            />
            <button onClick={onClose} className="text-stone-400 hover:text-stone-600 dark:hover:text-stone-300">
              <X className="w-5 h-5" />
            </button>
          </div>

          {results.length > 0 ? (
            <ul className="max-h-80 overflow-y-auto py-2">
              {results.map((item) => {
                const cat = categories.find((c) => c.key === item.category);
                return (
                  <li key={item.slug}>
                    <Link
                      to={`/article/${item.slug}`}
                      onClick={onClose}
                      className="block px-4 py-3 hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors"
                    >
                      <div className="font-medium text-sm text-stone-900 dark:text-stone-100">
                        {item.title}
                      </div>
                      <div className="mt-1 flex items-center gap-2 text-xs text-stone-500 dark:text-stone-400">
                        {cat && <span>{cat.label}</span>}
                        <span>{item.summary}</span>
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>
          ) : query.trim() ? (
            <div className="py-8 text-center text-sm text-stone-400 dark:text-stone-500">
              未找到匹配的文章
            </div>
          ) : (
            <div className="py-8 text-center text-sm text-stone-400 dark:text-stone-500">
              输入关键词搜索文章...
            </div>
          )}

          <div className="px-4 py-2 border-t border-stone-200 dark:border-stone-700 flex items-center justify-between text-xs text-stone-400">
            <span>Ctrl + K</span>
            <span>ESC 关闭</span>
          </div>
        </div>
      </div>
    </div>
  );
}
