import { categories } from "@/data/categories";

interface CategoryFilterProps {
  selected: string;
  onChange: (key: string) => void;
}

export default function CategoryFilter({ selected, onChange }: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => onChange("")}
        className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${
          selected === ""
            ? "bg-indigo-500 text-white dark:bg-indigo-600"
            : "bg-stone-100 text-stone-600 hover:bg-stone-200 dark:bg-stone-800 dark:text-stone-400 dark:hover:bg-stone-700"
        }`}
      >
        全部
      </button>
      {categories.map((cat) => (
        <button
          key={cat.key}
          onClick={() => onChange(cat.key)}
          className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${
            selected === cat.key
              ? "bg-indigo-500 text-white dark:bg-indigo-600"
              : "bg-stone-100 text-stone-600 hover:bg-stone-200 dark:bg-stone-800 dark:text-stone-400 dark:hover:bg-stone-700"
          }`}
        >
          {cat.label}
        </button>
      ))}
    </div>
  );
}
