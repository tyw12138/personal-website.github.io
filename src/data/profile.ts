export interface Stat {
  label: string;
  value: number;
  suffix?: string;
}

export interface Skill {
  name: string;
  category: "frontend" | "backend" | "design" | "tools";
}

export interface Project {
  title: string;
  description: string;
  image: string;
  tags: string[];
  link: string;
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}

export interface ProfileData {
  name: string;
  firstName: string;
  title: string;
  taglines: string[];
  avatar: string;
  bio: string;
  stats: Stat[];
  skills: Skill[];
  projects: Project[];
  email: string;
  social: SocialLink[];
  location: string;
  available: boolean;
}

export const profile: ProfileData = {
  name: "张明远",
  firstName: "明远",
  title: "全栈开发工程师 & UI 设计师",
  taglines: [
    "用代码构建美好体验",
    "热爱设计与技术的交汇点",
    "持续学习，永远好奇",
  ],
  avatar:
    "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20portrait%20of%20a%20young%20asian%20man%20in%20his%20late%2020s%2C%20warm%20lighting%2C%20minimalist%20style%2C%20soft%20focus%2C%20dark%20background%2C%20editorial%20photography&image_size=square_hd",
  bio: "你好，我是明远。一名热爱创造的全栈开发者，专注于构建优雅、高性能的 Web 应用。我相信好的产品源于对细节的执着追求和对用户体验的深度思考。工作之余，我喜欢摄影、阅读和探索新的技术领域。",
  stats: [
    { label: "年工作经验", value: 6, suffix: "+" },
    { label: "完成项目", value: 50, suffix: "+" },
    { label: "开源贡献", value: 200, suffix: "+" },
    { label: "满意客户", value: 30, suffix: "+" },
  ],
  skills: [
    { name: "React", category: "frontend" },
    { name: "TypeScript", category: "frontend" },
    { name: "Next.js", category: "frontend" },
    { name: "Vue.js", category: "frontend" },
    { name: "Tailwind CSS", category: "frontend" },
    { name: "Three.js", category: "frontend" },
    { name: "Node.js", category: "backend" },
    { name: "Python", category: "backend" },
    { name: "PostgreSQL", category: "backend" },
    { name: "Redis", category: "backend" },
    { name: "GraphQL", category: "backend" },
    { name: "Docker", category: "backend" },
    { name: "Figma", category: "design" },
    { name: "UI/UX Design", category: "design" },
    { name: "Motion Design", category: "design" },
    { name: "Branding", category: "design" },
    { name: "Git", category: "tools" },
    { name: "AWS", category: "tools" },
    { name: "Vercel", category: "tools" },
    { name: "Linear", category: "tools" },
  ],
  projects: [
    {
      title: "Nebula 设计系统",
      description:
        "一套完整的企业级设计系统，包含 200+ 组件、设计规范和开发文档，服务于多个产品线。",
      image:
        "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=modern%20design%20system%20dashboard%20UI%2C%20dark%20theme%2C%20gold%20accents%2C%20clean%20minimalist%20interface%2C%20components%20library%2C%20editorial%20style&image_size=landscape_16_9",
      tags: ["React", "TypeScript", "Storybook", "Design System"],
      link: "#",
    },
    {
      title: "Aurora 电商平台",
      description:
        "高端电商平台，支持多语言、多币种，集成 AI 推荐系统，月活用户超过 100 万。",
      image:
        "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=luxury%20ecommerce%20website%20interface%2C%20dark%20elegant%20theme%2C%20gold%20highlights%2C%20product%20showcase%2C%20premium%20aesthetic%2C%20editorial%20layout&image_size=landscape_16_9",
      tags: ["Next.js", "Node.js", "PostgreSQL", "AI"],
      link: "#",
    },
    {
      title: "Lumina 数据可视化",
      description:
        "交互式数据可视化平台，支持实时数据流、自定义仪表盘和智能洞察分析。",
      image:
        "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=data%20visualization%20dashboard%2C%20dark%20mode%2C%20charts%20and%20graphs%2C%20gold%20and%20purple%20accents%2C%20futuristic%20interface%2C%20clean%20design&image_size=landscape_16_9",
      tags: ["D3.js", "React", "WebSocket", "Python"],
      link: "#",
    },
    {
      title: "Echo 社交应用",
      description:
        "专注于深度内容分享的社交平台，支持长文、播客和视频多种内容形态。",
      image:
        "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=social%20media%20app%20interface%2C%20mobile%20first%20design%2C%20dark%20theme%2C%20warm%20accents%2C%20content%20feed%2C%20modern%20minimal&image_size=landscape_16_9",
      tags: ["React Native", "GraphQL", "AWS", "Redis"],
      link: "#",
    },
  ],
  email: "hello@example.com",
  location: "中国 · 上海",
  available: true,
  social: [
    { platform: "GitHub", url: "https://github.com", icon: "github" },
    { platform: "Twitter", url: "https://twitter.com", icon: "twitter" },
    { platform: "LinkedIn", url: "https://linkedin.com", icon: "linkedin" },
    { platform: "Dribbble", url: "https://dribbble.com", icon: "dribbble" },
  ],
};
