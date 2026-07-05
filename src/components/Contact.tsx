import { useEffect, useRef, useState } from "react";
import { Mail, MapPin, ArrowRight } from "lucide-react";
import { profile } from "@/data/profile";

export default function Contact() {
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

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="section-padding relative bg-ink-900/30"
    >
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-ink-700 to-transparent" />

      <div className="container">
        <div className="max-w-4xl mx-auto">
          <div
            className={`text-center mb-16 transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-12 h-px bg-gradient-to-r from-transparent to-gold-400" />
              <span className="text-gold-400 text-sm font-medium tracking-widest uppercase">
                联系我
              </span>
              <div className="w-12 h-px bg-gradient-to-l from-transparent to-gold-400" />
            </div>

            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              让我们<span className="text-gradient">一起合作</span>
            </h2>
            <p className="text-ink-400 text-lg max-w-2xl mx-auto">
              有项目想法或合作意向？随时与我联系，我很乐意听听你的想法
            </p>
          </div>

          <div
            className={`relative transition-all duration-1000 delay-200 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <div className="absolute -inset-4 bg-gradient-to-br from-gold-500/5 via-lavender-500/5 to-gold-500/5 rounded-3xl blur-xl" />

            <div className="relative bg-ink-900/70 backdrop-blur-sm border border-ink-800 rounded-3xl p-8 md:p-12">
              <div className="grid md:grid-cols-2 gap-10">
                <div>
                  <h3 className="font-display text-2xl font-semibold mb-6">
                    联系方式
                  </h3>

                  <div className="space-y-6">
                    <a
                      href={`mailto:${profile.email}`}
                      className="flex items-center gap-4 group"
                    >
                      <div className="w-12 h-12 rounded-xl bg-gold-400/10 flex items-center justify-center text-gold-400 group-hover:bg-gold-400/20 transition-colors">
                        <Mail className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-sm text-ink-400 mb-1">邮箱</p>
                        <p className="text-ink-100 group-hover:text-gold-300 transition-colors">
                          {profile.email}
                        </p>
                      </div>
                    </a>

                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-lavender-400/10 flex items-center justify-center text-lavender-400">
                        <MapPin className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-sm text-ink-400 mb-1">位置</p>
                        <p className="text-ink-100">{profile.location}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-green-400/10 flex items-center justify-center">
                        <span
                          className={`w-3 h-3 rounded-full ${
                            profile.available
                              ? "bg-green-400 animate-pulse"
                              : "bg-ink-500"
                          }`}
                        />
                      </div>
                      <div>
                        <p className="text-sm text-ink-400 mb-1">状态</p>
                        <p className="text-ink-100">
                          {profile.available ? "可接受新项目" : "暂时不接单"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col justify-center">
                  <div className="text-center md:text-left">
                    <p className="text-ink-400 mb-6">
                      无论是网站开发、UI 设计还是技术咨询，
                      都欢迎与我交流。我会在 24 小时内回复你的邮件。
                    </p>

                    <a
                      href={`mailto:${profile.email}`}
                      className="btn-primary w-full md:w-auto justify-center group"
                    >
                      发送邮件
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
