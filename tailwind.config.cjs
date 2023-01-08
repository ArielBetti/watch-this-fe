/** @type {import('tailwindcss').Config} */

module.exports = {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      sans: ["Open Sans"],
    },
    extend: {
      colors: {
        primary: "#9147ff",
        "primary-light-contrast": "#b689fa",
        "primary-dark-contrast": "#6826c9",
        secondary: "#b5179e",
        feedback: {
          error: "#cc0000",
          warning: "#ff8800",
          success: "#007e33",
          info: "#0d47a1",
        },
      },
      backgroundImage: {
        waves: "url('./assets/waves.svg')",
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
        downSlide: {
          "0%, 100%": {
            transform: "translateY(-20px)",
            opacity: 0,
          },
          "100%": {
            transform: "translateY(0px)",
            opacity: 1,
          },
        },
        leftSlide: {
          "0%, 100%": {
            transform: "translateX(20px)",
            opacity: 0,
          },
          "100%": {
            transform: "translateX(0px)",
            opacity: 1,
          },
        },
      },
      animation: {
        blurIn: "blurIn 0.45s ease-in-out forwards",
        fadeIn: "fadeIn 0.4s  ease forwards",
        downSlide: "downSlide 0.25s  ease forwards",
        leftSlide: "leftSlide 0.25s  ease forwards",
      },
    },
  },
  plugins: [
    require("tailwind-scrollbar-hide"),
    require("@tailwindcss/line-clamp"),
  ],
};
