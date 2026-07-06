export default function Empty({ message = "暂无内容" }: { message?: string }) {
  return (
    <div className="py-16 text-center text-stone-400 dark:text-stone-500">
      {message}
    </div>
  );
}
