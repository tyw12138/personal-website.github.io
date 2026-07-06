import { useParams, useNavigate } from "react-router-dom";
import { getArticleBySlug } from "@/lib/markdown";
import { ArrowLeft, Clock, Calendar, Tag } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

export default function Article() {
  const { "*": slug = "" } = useParams();
  const navigate = useNavigate();
  const article = getArticleBySlug(slug);
  const [html, setHtml] = useState("");

  const headings = useMemo(() => {
    if (!article) return [];
    const regex = /^#{1,3}\s+(.+)$/gm;
    const matches: { text: string; level: number; id: string }[] = [];
    let match;
    while ((match = regex.exec(article.content)) !== null) {
      const level = match[0].indexOf(" ");
      const text = match[1].trim();
      const id = text.toLowerCase().replace(/[^\w\u4e00-\u9fa5]+/g, "-");
      matches.push({ text, level, id });
    }
    return matches;
  }, [article]);

  useEffect(() => {
    if (!article) return;

    let content = article.content;

    content = content.replace(/^### (.+)$/gm, (_, text) => {
      const id = text.toLowerCase().replace(/[^\w\u4e00-\u9fa5]+/g, "-");
      return `<h3 id="${id}">${text}</h3>`;
    });
    content = content.replace(/^## (.+)$/gm, (_, text) => {
      const id = text.toLowerCase().replace(/[^\w\u4e00-\u9fa5]+/g, "-");
      return `<h2 id="${id}">${text}</h2>`;
    });
    content = content.replace(/^# (.+)$/gm, (_, text) => {
      const id = text.toLowerCase().replace(/[^\w\u4e00-\u9fa5]+/g, "-");
      return `<h1 id="${id}">${text}</h1>`;
    });

    content = content.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
    content = content.replace(/\*(.+?)\*/g, "<em>$1</em>");

    content = content.replace(/^> (.+)$/gm, "<blockquote>$1</blockquote>");

    content = content.replace(/`{3}([\s\S]*?)`{3}/g, (_, code) => {
      return `<pre><code>${code.trim()}</code></pre>`;
    });
    content = content.replace(/`([^`]+)`/g, "<code>$1</code>");

    content = content.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>');

    content = content.replace(/^- (.+)$/gm, "<li>$1</li>");
    content = content.replace(/^(\d+)\. (.+)$/gm, "<li>$2</li>");

    const paragraphs = content.split(/\n\n+/).map((block) => {
      if (
        block.startsWith("<h") ||
        block.startsWith("<pre") ||
        block.startsWith("<blockquote") ||
        block.startsWith("<ul") ||
        block.startsWith("<ol") ||
        block.startsWith("<li") ||
        block.startsWith("<hr") ||
        block.startsWith("<table")
      ) {
        return block;
      }
      return `<p>${block.replace(/\n/g, "<br>")}</p>`;
    });

    setHtml(paragraphs.join("\n"));
    window.scrollTo(0, 0);
  }, [article]);

  if (!article) {
    return (
      <div className="text-center py-20">
        <p className="text-text-secondary mb-4">文章不存在</p>
        <button
          onClick={() => navigate("/")}
          className="text-accent hover:text-accent-hover transition-colors"
        >
          返回首页
        </button>
      </div>
    );
  }

  const breadcrumb = slug.split("/").slice(0, -1);

  return (
    <div className="animate-fade-in">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-text-tertiary hover:text-text-primary transition-colors mb-6"
      >
        <ArrowLeft size={16} />
        返回
      </button>

      <header className="mb-8">
        {breadcrumb.length > 0 && (
          <div className="flex items-center gap-2 text-sm text-text-tertiary mb-3">
            {breadcrumb.map((part, i) => (
              <span key={i} className="flex items-center gap-2">
                {i > 0 && <span>/</span>}
                <span>{part}</span>
              </span>
            ))}
          </div>
        )}
        <h1 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
          {article.title}
        </h1>
        <div className="flex flex-wrap items-center gap-4 text-sm text-text-tertiary">
          <span className="flex items-center gap-1.5">
            <Calendar size={14} />
            {article.date}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock size={14} />
            {article.readingTime} 分钟阅读
          </span>
          {article.tags.length > 0 && (
            <span className="flex items-center gap-1.5">
              <Tag size={14} />
              {article.tags.join(" · ")}
            </span>
          )}
        </div>
        {article.summary && (
          <p className="mt-4 text-text-secondary border-l-2 border-accent pl-4 py-1">
            {article.summary}
          </p>
        )}
      </header>

      <div className="flex gap-8">
        <article
          className="flex-1 prose-dark min-w-0"
          dangerouslySetInnerHTML={{ __html: html }}
        />

        {headings.length > 0 && (
          <aside className="hidden lg:block w-48 flex-shrink-0">
            <div className="sticky top-24">
              <div className="text-xs font-medium text-text-tertiary uppercase tracking-wider mb-3">
                目录
              </div>
              <nav className="space-y-1.5">
                {headings.map((heading, i) => (
                  <a
                    key={i}
                    href={`#${heading.id}`}
                    className="block text-sm text-text-tertiary hover:text-accent transition-colors truncate"
                    style={{ paddingLeft: (heading.level - 1) * 12 }}
                  >
                    {heading.text}
                  </a>
                ))}
              </nav>
            </div>
          </aside>
        )}
      </div>
    </div>
  );
}
