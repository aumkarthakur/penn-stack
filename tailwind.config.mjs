/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "#000000",
        "primary-hover": "#333333",
      },
      fontFamily: {
        bricolage: ['var(--font-bricolage)', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
