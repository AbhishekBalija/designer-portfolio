/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "brand-black": "#0a0a0a",
        "brand-white": "#fafafa",
        "brand-accent": "#333333",
      },
      fontFamily: {
        sans: ['"DM Sans"', "system-ui", "sans-serif"],
        display: ['"Cormorant Garamond"', "Georgia", "serif"],
        accent: ['"Syne"', "sans-serif"],
      },
      cursor: {
        DEFAULT: "default",
        none: "none",
      },
    },
  },
  plugins: [],
};
