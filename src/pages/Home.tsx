import { useNavigate } from "react-router-dom";
import { ArrowRight, Clock, FileText, Folder, Sparkles, Github, Mail } from "lucide-react";
import { siteConfig } from "@/data/profile";
import { getRecentArticles, buildTree, getFolderStats } from "@/lib/markdown";

export default function Home() {
  const navigate = useNavigate();
  const recentArticles = getRecentArticles(5);
  const tree = buildTree();
  const stats = getFolderStats();

  return (
    <div className="animate-fade-in">
      <section className="mb-16">
        <div className="glass-card p-8 md:p-12 glow-border overflow-hidden relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-accent/10 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-medium">
                <Sparkles size={12} />
                欢迎来到我的知识库
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-text-primary">你好，我是</span>
              <br />
              <span className="text-gradient">{siteConfig.author}</span>
            </h1>

            <p className="text-lg text-text-secondary mb-6 max-w-2xl leading-relaxed">
              {siteConfig.role}。{siteConfig.subtitle}。
              这里记录了我学习路上的笔记、思考和实践。
            </p>

            <div className="flex flex-wrap gap-3 mb-8">
              {siteConfig.skills.slice(0, 6).map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1.5 rounded-lg bg-background-soft border border-border text-sm text-text-secondary"
                >
                  {skill}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap gap-4">
              <a
                href={siteConfig.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-accent text-white font-medium
                         hover:bg-accent-hover transition-all duration-200 hover:shadow-lg hover:shadow-accent/20
                         active:scale-[0.98]"
              >
                <Github size={18} />
                GitHub
              </a>
              <a
                href={`mailto:${siteConfig.email}`}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-border
                         text-text-secondary hover:text-text-primary hover:border-accent/50
                         transition-all duration-200 active:scale-[0.98]"
              >
                <Mail size={18} />
                联系我
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-xl font-semibold text-text-primary mb-6 flex items-center gap-2">
          <Folder size={20} className="text-accent" />
          知识库概览
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="glass-card p-5 hover:border-accent/30 transition-colors">
            <div className="text-3xl font-bold text-gradient mb-1">{stats.total}</div>
            <div className="text-sm text-text-secondary">笔记文章</div>
          </div>
          <div className="glass-card p-5 hover:border-accent/30 transition-colors">
            <div className="text-3xl font-bold text-gradient mb-1">{stats.folders}</div>
            <div className="text-sm text-text-secondary">分类目录</div>
          </div>
          <div className="glass-card p-5 hover:border-accent/30 transition-colors">
            <div className="text-3xl font-bold text-gradient mb-1">{siteConfig.skills.length}</div>
            <div className="text-sm text-text-secondary">技能栈</div>
          </div>
          <div className="glass-card p-5 hover:border-accent/30 transition-colors">
            <div className="text-3xl font-bold text-gradient mb-1">∞</div>
            <div className="text-sm text-text-secondary">学习中</div>
          </div>
        </div>
      </section>

      <section className="mb-16">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-text-primary flex items-center gap-2">
            <Clock size={20} className="text-accent" />
            最近更新
          </h2>
        </div>
        <div className="space-y-3">
          {recentArticles.map((article, index) => (
            <div
              key={article.slug}
              className="glass-card p-5 cursor-pointer hover:border-accent/30 transition-all duration-200
                       group animate-slide-up"
              style={{ animationDelay: `${index * 50}ms` }}
              onClick={() => navigate(`/article/${article.slug}`)}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2">
                    <FileText size={16} className="text-accent flex-shrink-0" />
                    <h3 className="font-medium text-text-primary group-hover:text-accent transition-colors truncate">
                      {article.title}
                    </h3>
                  </div>
                  {article.summary && (
                    <p className="text-sm text-text-tertiary line-clamp-1 ml-7">
                      {article.summary}
                    </p>
                  )}
                </div>
                <div className="flex items-center gap-4 flex-shrink-0">
                  <span className="text-xs text-text-tertiary">
                    {article.date}
                  </span>
                  <ArrowRight
                    size={16}
                    className="text-text-tertiary group-hover:text-accent group-hover:translate-x-1 transition-all"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-text-primary mb-6 flex items-center gap-2">
          <Folder size={20} className="text-accent" />
          快速进入
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {tree.slice(0, 4).map((folder) => (
            <div
              key={folder.path}
              className="glass-card p-6 cursor-pointer hover:border-accent/30 transition-all duration-200
                       group glow-border"
              onClick={() => {
                const firstFile = folder.children?.find((c) => c.type === "file");
                if (firstFile) {
                  navigate(`/article/${firstFile.path}`);
                }
              }}
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent/20 to-cyan/20
                              flex items-center justify-center group-hover:from-accent/30 group-hover:to-cyan/30
                              transition-all">
                  <Folder size={24} className="text-accent" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-text-primary group-hover:text-accent transition-colors">
                    {folder.name}
                  </h3>
                  <p className="text-sm text-text-tertiary">
                    {folder.children?.filter((c) => c.type === "file").length || 0} 篇文章
                  </p>
                </div>
                <ArrowRight
                  size={18}
                  className="text-text-tertiary group-hover:text-accent group-hover:translate-x-1 transition-all"
                />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
