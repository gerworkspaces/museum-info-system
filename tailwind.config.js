/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.{vue,js,ts}",
    "./pages/**/*.{vue,js,ts}",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    extend: {
      colors: {
        primary: "var(--text-color-primary)",
        secondary: "var(--text-color-secondary)",
        thirdary: "var(--text-color-thirdary)",
        background: "var(--main-bg-color)",
      },
      fontFamily: {
        primary: ["var(--font-family-primary)"],
      },
    },
  },
  plugins: [],
};
