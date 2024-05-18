/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#00A9FF",
        secondary: "#0C0C0C",
        tertiary: "#FEFBF6",
        alt: "#FEFAF6",
      },
    },
  },
  plugins: [require("daisyui")],
};
