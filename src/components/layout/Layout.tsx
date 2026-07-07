import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Home, User, Search, Menu, X, Github, Mail } from "lucide-react";
import { useState } from "react";
import SidebarTree from "@/components/SidebarTree";
import SearchDialog from "@/components/blog/SearchDialog";
import { buildTree } from "@/lib/markdown";
import { siteConfig } from "@/data/profile";

export default function Layout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchOpen, setSearchOpen] = useState(false);
  const tree = buildTree();

  const navItems = [
    { path: "/", label: "首页", icon: Home },
    { path: "/about", label: "关于", icon: User },
  ];

  const isNavActive = (path: string) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-cyan/5 rounded-full blur-3xl" />
      </div>

      <header className="relative z-20 border-b border-border/50 bg-background/80 backdrop-blur-xl">
        <div className="flex items-center justify-between px-4 h-14">
          <div className="flex items-center gap-4">
            <button
              className="p-2 rounded-lg hover:bg-background-hover transition-colors text-text-secondary hover:text-text-primary"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              {sidebarOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
            <div
              className="flex items-center gap-2.5 cursor-pointer group"
              onClick={() => navigate("/")}
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent to-cyan flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-accent/20">
                {siteConfig.author.charAt(0)}
              </div>
              <div className="hidden sm:block">
                <div className="text-sm font-semibold text-text-primary group-hover:text-gradient transition-all">
                  {siteConfig.title}
                </div>
              </div>
            </div>
          </div>

          <nav className="flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm transition-all duration-200 ${
                  isNavActive(item.path)
                    ? "bg-accent/10 text-accent"
                    : "text-text-secondary hover:text-text-primary hover:bg-background-hover"
                }`}
              >
                <item.icon size={16} />
                <span className="hidden sm:inline">{item.label}</span>
              </button>
            ))}
            <button
              className="ml-2 p-2 rounded-lg text-text-secondary hover:text-text-primary hover:bg-background-hover transition-colors"
              onClick={() => setSearchOpen(true)}
            >
              <Search size={18} />
            </button>
          </nav>
        </div>
      </header>

      <div className="flex-1 flex relative z-10">
        <aside
          className={`${
            sidebarOpen ? "w-64" : "w-0"
          } transition-all duration-300 border-r border-border/50 bg-background-soft/50 overflow-hidden flex-shrink-0`}
        >
          <div className="w-64 h-full overflow-y-auto py-4 px-2">
            <div className="px-3 mb-4">
              <div className="text-xs font-medium text-text-tertiary uppercase tracking-wider mb-2">
                知识库
              </div>
            </div>
            <SidebarTree nodes={tree} />

            <div className="mt-8 px-3 pt-4 border-t border-border/50">
              <div className="text-xs font-medium text-text-tertiary uppercase tracking-wider mb-3">
                链接
              </div>
              <a
                href={siteConfig.github}
                target="_blank"
                rel="noopener noreferrer"
                className="sidebar-item"
              >
                <Github size={16} className="text-text-tertiary" />
                <span className="text-sm">GitHub</span>
              </a>
              <a
                href={`mailto:${siteConfig.email}`}
                className="sidebar-item"
              >
                <Mail size={16} className="text-text-tertiary" />
                <span className="text-sm">联系我</span>
              </a>
            </div>
          </div>
        </aside>

        <main className="flex-1 overflow-y-auto">
          <div className="max-w-4xl mx-auto px-6 py-8">
            <Outlet />
          </div>
        </main>
      </div>

      <SearchDialog open={searchOpen} onClose={() => setSearchOpen(false)} />
    </div>
  );
}
