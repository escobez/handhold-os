import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#080A0F",
        foreground: "#F3F4F6",
        card: {
          DEFAULT: "#10141F",
          foreground: "#F3F4F6",
          border: "rgba(255, 255, 255, 0.08)",
        },
        muted: {
          DEFAULT: "#151A29",
          foreground: "#9CA3AF",
        },
        border: "rgba(255, 255, 255, 0.08)",
        brand: {
          50: "#f5f7ff",
          100: "#ebedff",
          200: "#d6dbff",
          300: "#b3bdff",
          400: "#8593ff",
          500: "#5b66ff",
          600: "#4446f5",
          700: "#3633dc",
          800: "#2c2bb2",
          900: "#27288d",
          glow: "#6366f1",
        },
        gold: {
          400: "#fbbf24",
          500: "#f59e0b",
        }
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Playfair Display", "Georgia", "serif"],
        sans: ["var(--font-sans)", "Inter", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      animation: {
        marquee: "marquee 35s linear infinite",
        "marquee-reverse": "marquee-reverse 35s linear infinite",
        "pulse-glow": "pulse-glow 4s ease-in-out infinite",
        float: "float 6s ease-in-out infinite",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "marquee-reverse": {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0%)" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "0.4", transform: "scale(1)" },
          "50%": { opacity: "0.8", transform: "scale(1.05)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
