// 📁 tailwind.config.js
// Add the 'require' line to this file.

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Make sure this path matches your project
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/typography'), // <-- ADD THIS LINE
  ],
}