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
        navy: {
          DEFAULT: '#0A1F44',
          dark: '#051329',
        },
        techBlue: {
          DEFAULT: '#1E90FF',
          light: '#4DA8FF',
          dark: '#1565C0',
        },
        charcoal: {
          DEFAULT: '#2B2B2B',
          light: '#3A3A3A',
        },
        softGray: {
          DEFAULT: '#F2F4F7',
          dark: '#E5E7EB',
        },
      },
    },
  },
  plugins: [],
};
export default config;
