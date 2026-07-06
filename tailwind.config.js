/** @type {import('tailwindcss').Config} */

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: "#0a0a0f",
          soft: "#111118",
          card: "#151520",
          hover: "#1a1a28",
        },
        border: {
          DEFAULT: "#252535",
          soft: "#1e1e2e",
        },
        text: {
          primary: "#e8e8f0",
          secondary: "#a0a0b8",
          tertiary: "#686888",
        },
        accent: {
          DEFAULT: "#8b7cf0",
          hover: "#a899ff",
          soft: "#8b7cf020",
          glow: "#8b7cf040",
        },
        cyan: {
          DEFAULT: "#5ce1e6",
          soft: "#5ce1e620",
        },
      },
      fontFamily: {
        sans: ["Inter", "-apple-system", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "Fira Code", "monospace"],
      },
      animation: {
        "fade-in": "fadeIn 0.4s ease-out",
        "slide-up": "slideUp 0.4s ease-out",
        "glow": "glow 2s ease-in-out infinite alternate",
        "gradient": "gradient 8s ease infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        glow: {
          "0%": { boxShadow: "0 0 20px rgba(139, 124, 240, 0.3)" },
          "100%": { boxShadow: "0 0 40px rgba(139, 124, 240, 0.5)" },
        },
        gradient: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
      },
    },
  },
  plugins: [],
};
