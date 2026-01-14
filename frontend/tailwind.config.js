/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Lexend', 'sans-serif'],
      },
      colors: {
        'psu-blue': '#0047AB',
        'psu-gold': '#FFD700',
      },
    },
  },
  plugins: [],
}