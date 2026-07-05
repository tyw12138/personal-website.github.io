/** @type {import('tailwindcss').Config} */

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "2rem",
        lg: "4rem",
        xl: "5rem",
        "2xl": "6rem",
      },
    },
    extend: {
      colors: {
        ink: {
          50: "#f5f5f7",
          100: "#e8e8ec",
          200: "#d1d1d9",
          300: "#a9a9b8",
          400: "#7a7a8c",
          500: "#5c5c6e",
          600: "#494958",
          700: "#3a3a46",
          800: "#23232c",
          900: "#14141a",
          950: "#0a0a0f",
        },
        gold: {
          50: "#fef9ed",
          100: "#fcf1d4",
          200: "#f8e0a6",
          300: "#f5c86d",
          400: "#f1af3d",
          500: "#e8961c",
          600: "#cc7612",
          700: "#a95512",
          800: "#894316",
          900: "#713816",
        },
        lavender: {
          50: "#f6f5fb",
          100: "#ece9f6",
          200: "#d8d3ed",
          300: "#b9b0de",
          400: "#9789cb",
          500: "#7b6bb8",
          600: "#6754a0",
          700: "#554484",
          800: "#483b6c",
          900: "#3d3359",
        },
      },
      fontFamily: {
        display: ["'Playfair Display'", "serif"],
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      animation: {
        "fade-in": "fadeIn 0.8s ease-out forwards",
        "fade-in-up": "fadeInUp 0.8s ease-out forwards",
        "fade-in-down": "fadeInDown 0.8s ease-out forwards",
        "float": "float 6s ease-in-out infinite",
        "glow": "glow 3s ease-in-out infinite alternate",
        "shimmer": "shimmer 2s linear infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeInDown: {
          "0%": { opacity: "0", transform: "translateY(-30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-15px)" },
        },
        glow: {
          "0%": { boxShadow: "0 0 20px rgba(245, 200, 109, 0.3)" },
          "100%": { boxShadow: "0 0 40px rgba(245, 200, 109, 0.6)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
    },
  },
  plugins: [],
};
