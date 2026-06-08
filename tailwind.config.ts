import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary": "#C5A059",
        "luxury-green": "#006680",
        "luxury-gold": "#C5A059",
        "background-light": "#FAF9F7",
        "dark-deep": "#080F1F",
      },
      fontFamily: {
        display: ["var(--font-manrope)", "sans-serif"],
        serif: ["var(--font-playfair)", "serif"],
      },
    },
  },
  plugins: [],
};
export default config;
