/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily:{
      sans: 'Open Sans',
    },
    extend: {
      colors: {
        primary: "#9147ff",
        'primary-light-contrast': '#b689fa',
        'primary-dark-contrast': '#6826c9',
        secondary: "#FEC260",
        feedback: {
          error: "#cc0000",
          warning: "#ff8800",
          success: "#007e33",
          info: "#0d47a1",
        },
      }
    },
  },
  plugins: [],
}
