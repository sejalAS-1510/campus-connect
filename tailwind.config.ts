import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: "#1B2430",
        slate: {
          950: "#0C1116",
        },
        parchment: "#F6F3EC",
        brass: "#C08A2E",
        moss: "#2F5D50",
        rust: "#A23E2C",
      },
      fontFamily: {
        display: ["Georgia", "Cambria", "Times New Roman", "serif"],
        body: [
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Helvetica",
          "Arial",
          "sans-serif",
        ],
      },
    },
  },
  plugins: [],
};
export default config;
