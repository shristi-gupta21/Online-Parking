/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "blue-350": "#667EEA",
      },
      fontSize:{
        xxs: "10px",
      }
    },
  },
  plugins: [],
};
