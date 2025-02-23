/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",         // Главная HTML-страница
    "./components/**/*.vue", // Все Vue-компоненты в папке components
    "./*.{vue,js,ts}"       // Главные файлы проекта (если есть)
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
