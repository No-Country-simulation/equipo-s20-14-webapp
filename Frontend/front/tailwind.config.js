/** @type {import('tailwindcss').Config} */
const { fontFamily } = require("tailwindcss/defaultTheme");
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      exo2: ['Exo 2', ...fontFamily.sans],
    },
    extend: {
      colors: {
        background_grey: "#f6f6f6",
        text_black: "#151515",
        acent_yellow: "#fab915",
        dark_blue: "#30333b",
        medium_blue: "#2C2F38",
        light_blue: "#373b46",
        mask_blue: "#1d2c3f",
        border_grey: "#d7d7d7"
      }
    },
  },
  plugins: [],
}
