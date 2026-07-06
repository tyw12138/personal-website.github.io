import { Sun, Moon } from "lucide-react";
import { useThemeStore } from "@/stores/theme-store";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useThemeStore();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg text-stone-500 hover:text-stone-700 hover:bg-stone-100
                 dark:text-stone-400 dark:hover:text-stone-200 dark:hover:bg-stone-800
                 transition-colors"
      aria-label={theme === "light" ? "切换暗色模式" : "切换亮色模式"}
    >
      {theme === "light" ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
    </button>
  );
}
