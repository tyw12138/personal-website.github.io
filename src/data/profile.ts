export interface SiteConfig {
  author: string;
  title: string;
  description: string;
  subtitle: string;
  github: string;
  avatar: string;
  email: string;
  location: string;
  role: string;
  skills: string[];
  stats: {
    label: string;
    value: string;
  }[];
  socials: {
    name: string;
    url: string;
    icon: string;
  }[];
}

export const siteConfig: SiteConfig = {
  author: "tyw",
  title: "tyw's 知识库",
  description: "个人知识库与学习记录",
  subtitle: "记录学习路上的思考与实践",
  github: "https://github.com/tyw12138",
  avatar: "/favicon.svg",
  email: "contact@tianyouwu.com",
  location: "中国",
  role: "全栈开发者 / 终身学习者",
  skills: ["React", "TypeScript", "Node.js", "Python", "Vue", "数据库", "DevOps"],
  stats: [
    { label: "笔记数量", value: "10+" },
    { label: "学习天数", value: "365+" },
    { label: "项目作品", value: "5+" },
  ],
  socials: [
    { name: "GitHub", url: "https://github.com/tyw12138", icon: "github" },
    { name: "Email", url: "mailto:contact@tianyouwu.com", icon: "mail" },
  ],
};
