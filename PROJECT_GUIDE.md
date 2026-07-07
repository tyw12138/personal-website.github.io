# 项目结构说明

```
personal-website.github.io/
├── content/                    ← 博客文章放这里
│   ├── frontend/               ← 前端分类
│   │   └── react-hooks-guide.md
│   ├── backend/                ← 后端分类
│   │   └── nodejs-stream.md
│   ├── algorithm/              ← 算法分类
│   │   └── binary-search.md
│   └── notes/                  ← 笔记分类
│       └── reading-notes-2025.md
│
├── src/
│   ├── App.tsx                 ← 路由入口（/ → 首页，/article/* → 文章，/about → 关于）
│   ├── main.tsx                ← 程序入口
│   ├── index.css               ← 全局样式（glass-card、prose-dark 等）
│   │
│   ├── components/
│   │   ├── SidebarTree.tsx     ← 侧边栏文件树（自动读取 content/ 生成）
│   │   ├── layout/
│   │   │   └── Layout.tsx      ← 主布局（顶栏 + 侧边栏 + 内容区 + 搜索弹窗）
│   │   └── blog/
│   │       └── SearchDialog.tsx← 搜索弹窗（基于 Fuse.js）
│   │
│   ├── pages/
│   │   ├── Home.tsx            ← 首页（欢迎区 + 概览 + 最近更新 + 快速进入）
│   │   ├── Article.tsx         ← 文章详情页（自写 Markdown 解析 + 目录）
│   │   ├── About.tsx           ← 关于页
│   │   └── NotFound.tsx        ← 404 页
│   │
│   ├── lib/
│   │   └── markdown.ts        ← 核心：读取所有 .md 文件、解析 frontmatter、构建文件树
│   │
│   ├── data/
│   │   ├── profile.ts         ← 站点配置（名字、简介、技能、社交链接等）
│   │   └── categories.ts      ← 分类定义
│   │
│   ├── hooks/
│   │   └── useSearch.ts       ← 搜索 hook
│   │
│   └── types/
│       └── article.ts          ← 类型定义
│
├── tailwind.config.js          ← 深色主题色板
├── vite.config.ts              ← 构建配置
└── package.json
```

---

## 添加/修改博客文章

在 `content/` 下新建 `.md` 文件，格式如下：

```markdown
---
title: 文章标题
date: 2026-07-07
summary: 一句话摘要
tags: [React, 前端]
category: frontend
draft: false
---

正文内容写在这里...

## 二级标题

正文段落...

- 列表项1
- 列表项2

**加粗**、*斜体*、`行内代码`

​```代码块​```
```

### 关键规则

- **文件路径决定分类**：如 `content/algorithm/xxx.md` 会出现在 algorithm 分类下
- **category 字段**对应 `src/data/categories.ts` 中定义的 key（frontend/backend/algorithm/notes）
- **draft: true** 的文章不会显示
- 侧边栏、首页最近更新都是自动生成的，不用改代码

### 新增分类

两步：

1. 在 `content/` 下建新文件夹
2. 在 `src/data/categories.ts` 加一行，比如：

```ts
{ key: "devops", label: "运维" },
```

### 改个人信息

只改 `src/data/profile.ts` 即可，所有页面都会自动读取。

---

## 技术栈

- React 18 + TypeScript + Vite
- Tailwind CSS 3（深色主题）
- React Router（HashRouter，适配 GitHub Pages）
- Zustand（状态管理）
- Fuse.js（搜索）
- 自写 Markdown 解析器（无第三方依赖）
