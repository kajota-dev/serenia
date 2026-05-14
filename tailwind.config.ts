import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}", // Sin el 'src/'
    "./components/**/*.{js,ts,jsx,tsx,mdx}", // Por si creás esta carpeta luego
  ],
  theme: {
    extend: {
    colors: {
        "primary": "#C5A059", 
        "luxury-green": "#006680",
        "luxury-gold": "#C5A059", 
        "background-light": "#f6f8f6",
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