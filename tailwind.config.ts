import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "deep-navy": "#071A2E",
        navy: {
          800: "#0D2942",
          900: "#071A2E",
          950: "#04101D",
        },
        brand: {
          blue: "#0878D1",
          "blue-hover": "#0666B4",
          bright: "#25A8E8",
          soft: "#EAF6FD",
          orange: "#F5A623",
          "orange-dark": "#D98205",
        },
        surface: {
          offwhite: "#F6F9FC",
          card: "#FFFFFF",
          muted: "#EEF4F9",
        },
        text: {
          main: "#12263A",
          muted: "#607286",
          light: "#8B9BB0",
        },
      },
      fontFamily: {
        sans: [
          "var(--font-plus-jakarta)",
          "Plus Jakarta Sans",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
        ],
        display: [
          "var(--font-space-grotesk)",
          "Space Grotesk",
          "var(--font-plus-jakarta)",
          "Plus Jakarta Sans",
          "sans-serif",
        ],
      },
      borderRadius: {
        btn: "12px",
        card: "18px",
        container: "24px",
      },
      boxShadow: {
        subtle: "0 8px 30px rgba(7, 26, 46, 0.06)",
        card: "0 12px 36px rgba(7, 26, 46, 0.08)",
        floating: "0 20px 40px rgba(7, 26, 46, 0.12)",
      },
      maxWidth: {
        "7xl": "1350px",
      },
      spacing: {
        "4.5": "1.125rem",
        "6.5": "1.625rem",
        "7.5": "1.875rem",
      },
    },
  },
  plugins: [],
};

export default config;
