/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");
const { createThemes } = require("tw-colors");

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "selector",
  theme: {
    fontFamily: {
      sans: [
        "Menlo",
        "Monaco",
        "Lucida Console",
        "Liberation Mono",
        "DejaVu Sans Mono",
        "Bitstream Vera Sans Mono",
        "Courier New",
        "monospace",
        "serif",
      ],
    },
    extend: {},
  },
  plugins: [
    require("tailwindcss-react-aria-components"),
    require("tailwindcss-animate"),
    createThemes(
      {
        amber: {
          primary: colors.amber,
          accent: colors.sky,
        },
        fuchsia: {
          primary: colors.fuchsia,
          accent: colors.emerald,
        },
        emerald: {
          primary: colors.emerald,
          accent: colors.fuchsia,
        },
      },
      {
        defaultTheme: "amber",
      }
    ),
  ],
};
