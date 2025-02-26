/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'media',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      dropShadow: {
        glow: [
          "0 0px 5px rgba(255,255, 255, 0.35)",
          "0 0px 15px rgba(255, 255,255, 0.2)"
        ]
      }
    }
  },
  plugins: [],
  colors: {
    'gray': '#191919',
    'blue': '#2D4263',
    'orange': '#C84B31',
    'beige': '#ECDBBA'
  }
}