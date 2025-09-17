/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        jost: ["Jost", "sans-serif"],
      },
      colors: {
        bisque: "#FFEABF",
        cornsilk: "#fff5d9",
        earthyBrown: "#943a2c",
        crimson: "#c24319",
        floralWhite: "#fffcf5",
        paleYellow: "#fffceb",
        gilled: "#de5418",
        lightOrange: "#ffe08c",
      },
      fontWeight: {
        normal: 500,
        bold: 600,
        bolder: 700,
      },
    },
  },
  plugins: [],
};
