import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Search as SearchIcon, X } from "lucide-react";
import { useSearch } from "@/hooks/useSearch";
import { categories } from "@/data/categories";

interface SearchDialogProps {
  open: boolean;
  onClose: () => void;
}

export default function SearchDialog({ open, onClose }: SearchDialogProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
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
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
      <div
        className="absolute top-[15%] left-1/2 -translate-x-1/2 w-full max-w-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mx-4 glass-card shadow-2xl overflow-hidden">
          <div className="flex items-center gap-3 px-4 py-3 border-b border-border">
            <SearchIcon className="w-5 h-5 text-text-tertiary shrink-0" />
            <input
              ref={inputRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="搜索文章..."
              className="flex-1 bg-transparent outline-none text-text-primary placeholder:text-text-tertiary"
            />
            <button onClick={onClose} className="text-text-tertiary hover:text-text-primary transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          {results.length > 0 ? (
            <ul className="max-h-80 overflow-y-auto py-2">
              {results.map((item) => {
                const cat = categories.find((c) => c.key === item.category);
                return (
                  <li key={item.slug}>
                    <div
                      onClick={() => { onClose(); navigate(`/article/${item.slug}`); }}
                      className="block px-4 py-3 hover:bg-background-hover transition-colors cursor-pointer"
                    >
                      <div className="font-medium text-sm text-text-primary">
                        {item.title}
                      </div>
                      <div className="mt-1 flex items-center gap-2 text-xs text-text-tertiary">
                        {cat && <span>{cat.label}</span>}
                        <span>{item.summary}</span>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          ) : query.trim() ? (
            <div className="py-8 text-center text-sm text-text-tertiary">
              未找到匹配的文章
            </div>
          ) : (
            <div className="py-8 text-center text-sm text-text-tertiary">
              输入关键词搜索文章...
            </div>
          )}

          <div className="px-4 py-2 border-t border-border flex items-center justify-between text-xs text-text-tertiary">
            <span>Ctrl + K</span>
            <span>ESC 关闭</span>
          </div>
        </div>
      </div>
    </div>
  );
}
