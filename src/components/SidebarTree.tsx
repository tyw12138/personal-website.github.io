import { useState } from "react";
import { ChevronRight, ChevronDown, FileText, Folder, FolderOpen } from "lucide-react";
import type { TreeNode } from "@/types/article";
import { useNavigate, useLocation } from "react-router-dom";

interface SidebarTreeProps {
  nodes: TreeNode[];
  level?: number;
}

export default function SidebarTree({ nodes, level = 0 }: SidebarTreeProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const [openFolders, setOpenFolders] = useState<Set<string>>(new Set(["前端开发", "后端开发", "算法", "笔记"]));

  const toggleFolder = (path: string) => {
    setOpenFolders((prev) => {
      const next = new Set(prev);
      if (next.has(path)) {
        next.delete(path);
      } else {
        next.add(path);
      }
      return next;
    });
  };

  const isActive = (slug: string) => {
    return location.pathname === `/article/${slug}`;
  };

  const renderNode = (node: TreeNode, currentLevel: number) => {
    const isOpen = openFolders.has(node.path);
    const paddingLeft = currentLevel * 12 + 12;

    if (node.type === "folder") {
      return (
        <div key={node.path}>
          <div
            className="sidebar-group-title"
            style={{ paddingLeft }}
            onClick={() => toggleFolder(node.path)}
          >
            {isOpen ? (
              <FolderOpen size={14} className="text-accent" />
            ) : (
              <Folder size={14} className="text-text-tertiary" />
            )}
            <span className="flex-1">{node.name}</span>
            {isOpen ? (
              <ChevronDown size={12} className="text-text-tertiary" />
            ) : (
              <ChevronRight size={12} className="text-text-tertiary" />
            )}
          </div>
          {isOpen && node.children && (
            <div className="animate-fade-in">
              {node.children.map((child) => renderNode(child, currentLevel + 1))}
            </div>
          )}
        </div>
      );
    }

    return (
      <div
        key={node.path}
        className={`sidebar-item ${isActive(node.path) ? "active" : ""}`}
        style={{ paddingLeft: paddingLeft + 8 }}
        onClick={() => navigate(`/article/${node.path}`)}
      >
        <FileText size={14} className={isActive(node.path) ? "text-accent" : "text-text-tertiary"} />
        <span className="truncate text-sm">{node.name}</span>
      </div>
    );
  };

  return (
    <div className="space-y-0.5">
      {nodes.map((node) => renderNode(node, level))}
    </div>
  );
}
