/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
        colors: {
        primary: "var(--color-primary)",
        secondary: "var(--color-secondary)",
        background: "var(--color-background)",
        flou: "var(--color-flou)",
        text: "var(--color-text)",
        section: "var(--color-section)",
      },
    },
  },
  plugins: [require('tailwind-scrollbar')],
}