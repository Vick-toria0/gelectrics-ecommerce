/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2563eb',
          dark: '#1e40af',
        },
        dark: {
          bg: '#1a202c',
          surface: '#2d3748',
          text: '#e2e8f0',
          muted: '#a0aec0',
        },
      },
    },
  },
  plugins: [],
}
