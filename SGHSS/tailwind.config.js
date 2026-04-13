/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#2D3250", // Deep Indigo
        accent: "#70FFB8",  // Mint Green
        background: "#F8FAFC", // Ultra-light gray
      },
    },
  },
  plugins: [],
}
