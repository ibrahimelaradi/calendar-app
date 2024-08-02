/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {},
    colors: {
      white: "#ffffff",
      "gray-lightest": "#f8f9f9",
      "gray-lighter": "#e5e5e5",
      "gray-light": "#d1d1d2",
      gray: "#bebebf",
      "gray-dark": "#979797",
      "gray-darker": "#6f6f70",
      "gray-darkest": "#484949",
      black: "#212121",

      "brand-light": "#d7dfe9",
      brand: "#6283a8",
      "brand-dark": "#334151",

      "cta-light": "#ebd7d5",
      cta: "#a86462",
      "cta-dark": "#523332",

      "info-light": "#daf2fb",
      info: "#47cbed",
      "info-dark": "#2d606f",

      "warning-light": "#fdf1d2",
      warning: "#e6ca47",
      "warning-dark": "#6d6028",

      "success-light": "#d9f7d7",
      success: "#51d860",
      "success-dark": "#2f6632",

      "danger-light": "#ffd5d2",
      danger: "#e85058",
      "danger-dark": "#6f2c2d",
    },
  },
  plugins: [],
};
