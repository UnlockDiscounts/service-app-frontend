/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-45%)" },
        },
        slideIn: {
          "0%": {
            opacity: "0",
            transform: "scale(0.8) translateY(20px)",
          },
          "100%": {
            opacity: "1",
            transform: "scale(1) translateY(0)",
          },
        },
        collageSlide: {
          "0%": {
            opacity: "0",
            transform: "scale(0.85) translateY(30px)",
          },
          "100%": {
            opacity: "1",
            transform: "scale(1) translateY(0)",
          },
        },
        loginSlide: {
          "0%": {
            opacity: "0",
            transform: "scale(0.7) translateX(-50px)",
          },
          "100%": {
            opacity: "1",
            transform: "scale(1) translateX(0)",
          },
        },
      },
      animation: {
        marquee: "marquee 12s linear infinite",
        "slide-in-0": "slideIn 300ms linear 0ms forwards",
        "slide-in-1": "slideIn 300ms linear 300ms forwards",
        "slide-in-2": "slideIn 300ms linear 600ms forwards",
        "collage-slide-0": "collageSlide 300ms ease-in-out 800ms forwards",
        "collage-slide-1": "collageSlide 300ms ease-in-out 1100ms forwards",
        "collage-slide-2": "collageSlide 300ms ease-in-out 1400ms forwards",
        "login-slide-0": "loginSlide 300ms cubic-bezier(0.7, -0.4, 0.4, 1.4) 800ms forwards",
        "login-slide-1": "loginSlide 300ms cubic-bezier(0.7, -0.4, 0.4, 1.4) 1100ms forwards",
        "login-slide-2": "loginSlide 300ms cubic-bezier(0.7, -0.4, 0.4, 1.4) 1400ms forwards",
        "login-slide-3": "loginSlide 300ms cubic-bezier(0.7, -0.4, 0.4, 1.4) 1700ms forwards",

      },
    },
  },
  plugins: [],
};