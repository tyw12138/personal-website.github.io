import { useEffect, useRef, useState } from "react";
import { MapPin, Briefcase, Code, Palette } from "lucide-react";
import { profile, type Stat } from "@/data/profile";

function AnimatedNumber({ value, suffix = "" }: { value: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;

    const duration = 2000;
    const steps = 60;
    const stepValue = value / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += stepValue;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [isVisible, value]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

export default function About() {
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
      id="about"
      className="section-padding relative overflow-hidden"
    >
      <div className="container">
        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16 items-start">
          <div
            className={`lg:col-span-3 transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
            }`}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-px bg-gradient-to-r from-gold-400 to-transparent" />
              <span className="text-gold-400 text-sm font-medium tracking-widest uppercase">
                关于我
              </span>
            </div>

            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-8 leading-tight">
              热爱创造，
              <br />
              <span className="text-gradient">追求卓越</span>
            </h2>

            <div className="space-y-6 text-lg text-ink-300 leading-relaxed">
              <p>{profile.bio}</p>
              <p className="text-ink-400">
                我相信技术的价值在于解决真实的问题，而好的设计能让技术变得有温度。
                每一个项目我都力求在功能性和美学之间找到最佳平衡点，打造令人愉悦的用户体验。
              </p>
            </div>

            <div className="flex flex-wrap gap-6 mt-10">
              <div className="flex items-center gap-3 text-ink-400">
                <MapPin className="w-5 h-5 text-gold-400" />
                <span>{profile.location}</span>
              </div>
              <div className="flex items-center gap-3 text-ink-400">
                <Briefcase className="w-5 h-5 text-gold-400" />
                <span>自由职业 / 可远程</span>
              </div>
            </div>
          </div>

          <div
            className={`lg:col-span-2 transition-all duration-1000 delay-300 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
            }`}
          >
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-br from-gold-500/10 to-lavender-500/10 rounded-3xl blur-xl" />

              <div className="relative bg-ink-900/50 backdrop-blur-sm border border-ink-800 rounded-2xl p-8">
                <div className="grid grid-cols-2 gap-8">
                  {profile.stats.map((stat: Stat, index: number) => (
                    <div key={index} className="text-center">
                      <div className="font-display text-4xl md:text-5xl font-bold text-gold-400 mb-2">
                        <AnimatedNumber value={stat.value} suffix={stat.suffix} />
                      </div>
                      <p className="text-ink-400 text-sm">{stat.label}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-8 pt-8 border-t border-ink-800">
                  <div className="flex items-center gap-2 mb-4">
                    <Code className="w-4 h-4 text-gold-400" />
                    <span className="text-sm text-ink-300 font-medium">
                      开发技能
                    </span>
                  </div>
                  <div className="h-2 bg-ink-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-gold-400 to-gold-500 rounded-full transition-all duration-1000"
                      style={{ width: isVisible ? "90%" : "0%" }}
                    />
                  </div>

                  <div className="flex items-center gap-2 mt-6 mb-4">
                    <Palette className="w-4 h-4 text-lavender-400" />
                    <span className="text-sm text-ink-300 font-medium">
                      设计能力
                    </span>
                  </div>
                  <div className="h-2 bg-ink-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-lavender-400 to-lavender-500 rounded-full transition-all duration-1000 delay-200"
                      style={{ width: isVisible ? "80%" : "0%" }}
                    />
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
