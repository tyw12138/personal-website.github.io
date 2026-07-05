import { useEffect, useRef, useState } from "react";
import { Code2, Palette, Wrench, Server } from "lucide-react";
import { profile } from "@/data/profile";

const categoryConfig = {
  frontend: {
    label: "前端开发",
    icon: Code2,
    color: "gold",
  },
  backend: {
    label: "后端开发",
    icon: Server,
    color: "lavender",
  },
  design: {
    label: "设计",
    icon: Palette,
    color: "gold",
  },
  tools: {
    label: "工具",
    icon: Wrench,
    color: "lavender",
  },
};

type CategoryKey = keyof typeof categoryConfig;

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const skillsByCategory = profile.skills.reduce(
    (acc, skill) => {
      if (!acc[skill.category]) {
        acc[skill.category] = [];
      }
      acc[skill.category].push(skill);
      return acc;
    },
    {} as Record<CategoryKey, typeof profile.skills>
  );

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="section-padding relative bg-ink-900/30"
    >
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-ink-700 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-ink-700 to-transparent" />

      <div className="container">
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-12 h-px bg-gradient-to-r from-transparent to-gold-400" />
            <span className="text-gold-400 text-sm font-medium tracking-widest uppercase">
              技能专长
            </span>
            <div className="w-12 h-px bg-gradient-to-l from-transparent to-gold-400" />
          </div>

          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            我的<span className="text-gradient">技术栈</span>
          </h2>
          <p className="text-ink-400 text-lg max-w-2xl mx-auto">
            多年的项目经验让我掌握了全栈开发的各项技能，
            能够独立完成从设计到部署的完整产品开发流程
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {(Object.keys(skillsByCategory) as CategoryKey[]).map(
            (category, catIndex) => {
              const config = categoryConfig[category];
              const Icon = config.icon;
              const skills = skillsByCategory[category];

              return (
                <div
                  key={category}
                  className={`transition-all duration-700 ${
                    isVisible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-10"
                  }`}
                  style={{ transitionDelay: `${catIndex * 150}ms` }}
                >
                  <div className="bg-ink-900/50 backdrop-blur-sm border border-ink-800 rounded-2xl p-8 h-full hover:border-ink-700 transition-colors">
                    <div className="flex items-center gap-4 mb-6">
                      <div
                        className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                          config.color === "gold"
                            ? "bg-gold-400/10 text-gold-400"
                            : "bg-lavender-400/10 text-lavender-400"
                        }`}
                      >
                        <Icon className="w-6 h-6" />
                      </div>
                      <h3 className="font-display text-2xl font-semibold">
                        {config.label}
                      </h3>
                    </div>

                    <div className="flex flex-wrap gap-3">
                      {skills.map((skill, index) => (
                        <span
                          key={skill.name}
                          className={`px-4 py-2 rounded-full text-sm font-medium
                            border transition-all duration-300 cursor-default
                            hover:-translate-y-0.5 ${
                              config.color === "gold"
                                ? "bg-gold-400/5 border-gold-400/20 text-gold-200 hover:bg-gold-400/10 hover:border-gold-400/40 hover:shadow-lg hover:shadow-gold-400/10"
                                : "bg-lavender-400/5 border-lavender-400/20 text-lavender-200 hover:bg-lavender-400/10 hover:border-lavender-400/40 hover:shadow-lg hover:shadow-lavender-400/10"
                            }`}
                          style={{ transitionDelay: `${index * 30}ms` }}
                        >
                          {skill.name}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            }
          )}
        </div>
      </div>
    </section>
  );
}
