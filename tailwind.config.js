/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Adicione esta linha
  ],
  theme: {
    extend: {
      colors: {
        primary: "#EE7D46",
      },
    },
  },
  plugins: [],
};
