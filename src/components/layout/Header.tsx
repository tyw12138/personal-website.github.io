import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Search, Menu, X } from "lucide-react";
import { siteConfig } from "@/data/profile";
import ThemeToggle from "@/components/common/ThemeToggle";

interface HeaderProps {
  onSearchOpen: () => void;
}

const navLinks = [
  { to: "/", label: "首页" },
  { to: "/about", label: "关于" },
];

export default function Header({ onSearchOpen }: HeaderProps) {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-stone-200 dark:bg-stone-950/80 dark:border-stone-800">
      <div className="container flex items-center justify-between h-14">
        <Link
          to="/"
          className="text-lg font-semibold text-stone-900 hover:text-indigo-600 dark:text-stone-100 dark:hover:text-indigo-400 transition-colors"
        >
          {siteConfig.title}
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`text-sm font-medium transition-colors ${
                location.pathname === link.to
                  ? "text-indigo-600 dark:text-indigo-400"
                  : "text-stone-500 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-100"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1">
          <button
            onClick={onSearchOpen}
            className="p-2 rounded-lg text-stone-500 hover:text-stone-700 hover:bg-stone-100
                       dark:text-stone-400 dark:hover:text-stone-200 dark:hover:bg-stone-800
                       transition-colors"
            aria-label="搜索"
          >
            <Search className="w-5 h-5" />
          </button>
          <ThemeToggle />
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-stone-500 hover:text-stone-700 hover:bg-stone-100
                       dark:text-stone-400 dark:hover:text-stone-200 dark:hover:bg-stone-800
                       transition-colors"
            aria-label="菜单"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden border-t border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-950">
          <nav className="container py-3 flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileMenuOpen(false)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  location.pathname === link.to
                    ? "bg-indigo-50 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-400"
                    : "text-stone-600 hover:bg-stone-100 dark:text-stone-400 dark:hover:bg-stone-800"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
