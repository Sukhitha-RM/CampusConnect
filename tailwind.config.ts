import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";

export default {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        navy: {
          DEFAULT: "#112E81",
          50: "#eef3ff",
          100: "#d9e4ff",
          200: "#bcceff",
          300: "#8eaeff",
          400: "#5982ff",
          500: "#3154ff",
          600: "#112E81",
          700: "#0e2468",
          800: "#0f1f53",
          900: "#111c46",
          950: "#070b1e",
        },
        aqua: {
          DEFAULT: "#00D2FF",
          50: "#edfcff",
          100: "#d6f7ff",
          200: "#b5f1ff",
          300: "#7ee7ff",
          400: "#3ad4ff",
          500: "#00D2FF",
          600: "#00a7cc",
          700: "#0083a3",
          800: "#056a87",
          900: "#0a5770",
          950: "#03384c",
        },
        primary: {
          DEFAULT: "#112E81",
          foreground: "#ffffff",
        },
        secondary: {
          DEFAULT: "#00D2FF",
          foreground: "#070b1e",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "#eef3ff",
          foreground: "#112E81",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT: "#070b1e",
          foreground: "#f8fafc",
          primary: "#112E81",
          "primary-foreground": "#ffffff",
          accent: "#112E81",
          "accent-foreground": "#00D2FF",
          border: "#1e293b",
          ring: "#00D2FF",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "slide-in-right": {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(0)" },
        },
        shimmer: {
          "100%": { transform: "translateX(100%)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "pulse-slow": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.6" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.4s ease-out",
        "slide-in-right": "slide-in-right 0.3s ease-out",
        shimmer: "shimmer 2s linear infinite",
        float: "float 3s ease-in-out infinite",
        "pulse-slow": "pulse-slow 2s ease-in-out infinite",
      },
    },
  },
  plugins: [animate],
} satisfies Config;
