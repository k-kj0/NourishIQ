import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: "#fefcf7",
        leaf: "#84cc16",
        coral: "#f97316",
        grape: "#a855f7",
        ocean: "#0ea5e9",
        sweet: "#ec4899",
      },
    },
  },
  plugins: [],
};

export default config;
