/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        teal: {
          50: '#f0fdfa',
          100: '#ccfbf1',
          500: '#14b8a6',
          700: '#0f6e5e',
          800: '#0f584c',
          900: '#134e44',
        },
        saffron: {
          500: '#e08a2a',
          600: '#c7741d',
        },
        trust: {
          500: '#1d4ed8',
          600: '#1e40af',
          50: '#eff6ff',
        },
        amber: {
          50: '#fef3c7',
          700: '#b45309',
        }
      },
    },
  },
  plugins: [],
};
