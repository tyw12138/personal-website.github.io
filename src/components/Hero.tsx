import { useEffect, useState } from "react";
import {
  Github,
  Twitter,
  Linkedin,
  Dribbble,
  ArrowDown,
  Mail,
} from "lucide-react";
import { profile } from "@/data/profile";

const iconMap: Record<string, typeof Github> = {
  github: Github,
  twitter: Twitter,
  linkedin: Linkedin,
  dribbble: Dribbble,
};

export default function Hero() {
  const [displayText, setDisplayText] = useState("");
  const [taglineIndex, setTaglineIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentTagline = profile.taglines[taglineIndex];
    const typeSpeed = isDeleting ? 50 : 100;
    const pauseTime = isDeleting ? 500 : 2000;

    if (!isDeleting && displayText === currentTagline) {
      const timeout = setTimeout(() => setIsDeleting(true), pauseTime);
      return () => clearTimeout(timeout);
    }

    if (isDeleting && displayText === "") {
      setIsDeleting(false);
      setTaglineIndex((prev) => (prev + 1) % profile.taglines.length);
      return;
    }

    const timeout = setTimeout(() => {
      setDisplayText((prev) =>
        isDeleting
          ? currentTagline.substring(0, prev.length - 1)
          : currentTagline.substring(0, prev.length + 1)
      );
    }, typeSpeed);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, taglineIndex]);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden noise-overlay"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-ink-900/50 via-ink-950 to-ink-950" />

      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-gold-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-lavender-500/10 rounded-full blur-3xl" />

      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[600px] h-[600px] border border-ink-800/30 rounded-full" />
        <div className="absolute w-[500px] h-[500px] border border-ink-800/20 rounded-full" />
        <div className="absolute w-[400px] h-[400px] border border-ink-800/10 rounded-full" />
      </div>

      <div className="container relative z-10 text-center px-4">
        <div className="opacity-0-init animate-fade-in-down delay-100">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold-400/30 bg-gold-400/5 mb-8">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-sm text-gold-200/80">
              {profile.available ? "开放合作机会" : "暂时忙碌中"}
            </span>
          </div>
        </div>

        <div className="opacity-0-init animate-fade-in delay-200 mb-8">
          <div className="relative inline-block">
            <div className="absolute inset-0 bg-gradient-to-r from-gold-400 to-lavender-400 rounded-full blur-xl opacity-30 animate-pulse" />
            <img
              src={profile.avatar}
              alt={profile.name}
              className="relative w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-2 border-gold-400/50 animate-float"
            />
          </div>
        </div>

        <div className="opacity-0-init animate-fade-in-up delay-300">
          <p className="text-ink-400 text-lg mb-4 font-light">
            你好，我是
          </p>
        </div>

        <div className="opacity-0-init animate-fade-in-up delay-400">
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold mb-6 tracking-tight">
            <span className="text-ink-100">{profile.name}</span>
          </h1>
        </div>

        <div className="opacity-0-init animate-fade-in-up delay-500">
          <p className="text-xl md:text-2xl text-ink-300 mb-3 font-light">
            {profile.title}
          </p>
        </div>

        <div className="opacity-0-init animate-fade-in-up delay-600 mb-10 h-8">
          <span className="text-gold-400 text-lg font-medium">
            {displayText}
            <span className="inline-block w-0.5 h-5 bg-gold-400 ml-1 animate-pulse align-middle" />
          </span>
        </div>

        <div className="opacity-0-init animate-fade-in-up delay-700 flex flex-wrap justify-center gap-4 mb-12">
          <a href="#contact" className="btn-primary">
            <Mail className="w-5 h-5" />
            联系我
          </a>
          <a href="#projects" className="btn-secondary">
            查看作品
            <ArrowDown className="w-4 h-4" />
          </a>
        </div>

        <div className="opacity-0-init animate-fade-in-up delay-800 flex justify-center gap-4">
          {profile.social.map((item) => {
            const IconComponent = iconMap[item.icon] || Github;
            return (
              <a
                key={item.platform}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-full border border-ink-700 flex items-center justify-center text-ink-400
                           transition-all duration-300 hover:border-gold-400/50 hover:text-gold-300 hover:-translate-y-1"
                aria-label={item.platform}
              >
                <IconComponent className="w-5 h-5" />
              </a>
            );
          })}
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 opacity-0-init animate-fade-in delay-800">
        <a
          href="#about"
          className="flex flex-col items-center gap-2 text-ink-500 hover:text-gold-400 transition-colors"
        >
          <span className="text-sm">向下滚动</span>
          <ArrowDown className="w-5 h-5 animate-bounce" />
        </a>
      </div>
    </section>
  );
}
