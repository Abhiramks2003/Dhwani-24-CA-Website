/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        "odibee-sans": ["Odibee Sans", "cursive"],
        "inter": ["Inter", "sans"]
      },
    },
  },
  plugins: [],
};
