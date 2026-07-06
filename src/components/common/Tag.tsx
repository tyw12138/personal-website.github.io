export default function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block px-2 py-0.5 text-xs font-medium rounded-md
                     bg-indigo-50 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-400">
      {children}
    </span>
  );
}
