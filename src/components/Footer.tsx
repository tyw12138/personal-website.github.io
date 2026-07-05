import { Github, Twitter, Linkedin, Dribbble, Heart } from "lucide-react";
import { profile } from "@/data/profile";

const iconMap: Record<string, typeof Github> = {
  github: Github,
  twitter: Twitter,
  linkedin: Linkedin,
  dribbble: Dribbble,
};

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t border-ink-800 py-12">
      <div className="container">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <a
              href="#hero"
              className="font-display text-2xl font-bold text-ink-100 hover:text-gold-300 transition-colors"
            >
              {profile.name}
            </a>
            <p className="text-ink-500 text-sm mt-2">{profile.title}</p>
          </div>

          <div className="flex items-center gap-4">
            {profile.social.map((item) => {
              const IconComponent = iconMap[item.icon] || Github;
              return (
                <a
                  key={item.platform}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-ink-700 flex items-center justify-center text-ink-400
                           transition-all duration-300 hover:border-gold-400/50 hover:text-gold-300 hover:-translate-y-1"
                  aria-label={item.platform}
                >
                  <IconComponent className="w-4 h-4" />
                </a>
              );
            })}
          </div>
        </div>

        <div className="mt-10 pt-8 border-t border-ink-800/50 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-ink-500 text-sm">
            © {currentYear} {profile.name}. All rights reserved.
          </p>
          <p className="text-ink-500 text-sm flex items-center gap-2">
            Made with
            <Heart className="w-4 h-4 text-red-400 fill-red-400" />
            using React & Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
}
