import { siteConfig } from "@/data/profile";
import { MapPin, Mail, Github, Code, Briefcase, GraduationCap } from "lucide-react";

export default function About() {
  const skillCategories = [
    {
      title: "前端开发",
      skills: ["React", "Vue", "TypeScript", "Tailwind CSS", "Vite", "Next.js"],
    },
    {
      title: "后端开发",
      skills: ["Node.js", "Python", "Express", "NestJS", "MySQL", "MongoDB"],
    },
    {
      title: "工具 & 其他",
      skills: ["Git", "Docker", "Linux", "VS Code", "Figma", "CI/CD"],
    },
  ];

  return (
    <div className="animate-fade-in max-w-3xl mx-auto">
      <section className="mb-16">
        <div className="glass-card p-8 md:p-10 glow-border">
          <div className="flex flex-col md:flex-row items-start gap-6">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-accent to-cyan
                          flex items-center justify-center text-white text-3xl font-bold
                          shadow-lg shadow-accent/20 flex-shrink-0">
              {siteConfig.author.charAt(0)}
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-text-primary mb-2">
                {siteConfig.author}
              </h1>
              <p className="text-accent font-medium mb-3">{siteConfig.role}</p>
              <p className="text-text-secondary leading-relaxed">
                你好！我是{siteConfig.author}，一名热爱技术的全栈开发者。
                对我来说，编程不仅是工作，更是一种创造和探索的方式。
                我喜欢学习新技术，记录学习过程，分享知识和经验。
              </p>
              <div className="flex flex-wrap gap-4 mt-4 text-sm text-text-tertiary">
                <span className="flex items-center gap-1.5">
                  <MapPin size={14} />
                  {siteConfig.location}
                </span>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="flex items-center gap-1.5 hover:text-accent transition-colors"
                >
                  <Mail size={14} />
                  {siteConfig.email}
                </a>
                <a
                  href={siteConfig.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 hover:text-accent transition-colors"
                >
                  <Github size={14} />
                  GitHub
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-xl font-semibold text-text-primary mb-6 flex items-center gap-2">
          <Code size={20} className="text-accent" />
          技术栈
        </h2>
        <div className="space-y-4">
          {skillCategories.map((category) => (
            <div key={category.title} className="glass-card p-5">
              <h3 className="font-medium text-text-primary mb-3">{category.title}</h3>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 rounded-lg bg-background-soft border border-border
                             text-sm text-text-secondary hover:border-accent/30 hover:text-text-primary
                             transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-xl font-semibold text-text-primary mb-6 flex items-center gap-2">
          <Briefcase size={20} className="text-accent" />
          关于这个知识库
        </h2>
        <div className="glass-card p-6">
          <p className="text-text-secondary leading-relaxed mb-4">
            这个知识库是我记录学习和思考的地方。在这里你可以找到：
          </p>
          <ul className="space-y-2 text-text-secondary">
            <li className="flex items-start gap-2">
              <span className="text-accent mt-1">•</span>
              <span>技术学习笔记 —— 各种编程语言、框架、工具的学习记录</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-accent mt-1">•</span>
              <span>项目实践 —— 做过的项目和踩过的坑</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-accent mt-1">•</span>
              <span>读书思考 —— 读书笔记和个人感悟</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-accent mt-1">•</span>
              <span>算法题解 —— LeetCode 等算法练习记录</span>
            </li>
          </ul>
          <p className="text-text-tertiary text-sm mt-4">
            内容会持续更新，如果你觉得有帮助，欢迎 Star 我的 GitHub ~
          </p>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-text-primary mb-6 flex items-center gap-2">
          <GraduationCap size={20} className="text-accent" />
          座右铭
        </h2>
        <div className="glass-card p-6 border-l-2 border-l-accent">
          <p className="text-lg text-text-primary italic">
            "保持好奇，持续学习，用代码创造价值。"
          </p>
        </div>
      </section>
    </div>
  );
}
