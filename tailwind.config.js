/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        bgPage: "#fdf6f0",
        bgWhite: "#ffffff",
        heroSaumon: "#fde8d8",
        heroBleupast: "#c8e8f0",

        cardBranding: "#fff5f3",
        cardWebD: "#f3f1ff",
        cardSEO: "#fffbec",

        portVert: "#4ecb8d",
        portViolet: "#a78bfa",
        portAmbre: "#fbbf24",

        textDark: "#1a1a2e",
        textBody: "#6b7280",
        textLight: "#374151",

        cta: "#f5c842",
        ctaText: "#1a1a2e",

        blobRose: "#f9a8d4",
        blobViolet: "#c4b5fd",
        blobJaune: "#fcd34d",
        sphereBleu: "#60a5fa",
      },
    },
  },
  plugins: [],
};
