/** @type {import('tailwindcss').Config} */

module.exports = {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      sans: "Open Sans",
    },
    extend: {
      colors: {
        primary: "#9147ff",
        "primary-light-contrast": "#b689fa",
        "primary-dark-contrast": "#6826c9",
        secondary: "#FEC260",
        feedback: {
          error: "#cc0000",
          warning: "#ff8800",
          success: "#007e33",
          info: "#0d47a1",
        },
      },
      keyframes: {
        blurIn: {
          "0%, 100%": { backdropFilter: "blur(1px)" },
          "100%": { backdropFilter: "blur(5px)" },
        },
        fadeIn: {
          "0%, 100%": {
            transform: "translateY(50px)",
            opacity: 0,
          },
          "100%": {
            transform: "translateY(0px)",
            opacity: 1,
          },
        },
      },
      animation: {
        blurIn: "blurIn 0.45s ease-in-out forwards",
        fadeIn: "fadeIn 0.4s  ease forwards",
      },
    },
  },
  plugins: [],
};
