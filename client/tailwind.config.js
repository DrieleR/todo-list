/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#1B1B1F',
        paper: '#FAF9F6',
        trabalho: '#2F5D8A',
        estudos: '#6C4F9C',
        pessoal: '#2E7D5B',
      },
      fontFamily: {
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
