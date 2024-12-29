/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: ["selector", '[data-theme="dark"]'],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "primary-gradient": "linear-gradient(45deg, #00a86b, #f7b500)",
      },
      backgroundColor: {
        dark: "#0d1a26", // Dark blue-green
        "heavy-dark": "#081014", // Deep teal
        light: "#eaf4f4", // Soft greenish white
      },
      colors: {
        "semi-dark": "#334e68", // Muted teal
        dark: "#0d1a26",
        light: "#eaf4f4",
        gold: "#f7b500", // Gold accent
        green: "#00a86b", // Trustworthy green
        blue: "#0073e6", // Reliable blue
      },
      fontFamily: {
        "chakra-petch": ["Chakra Petch", "sans-serif"],
        "IBM-Plex": ["IBM Plex Mono", "monospace"],
      },
    },
  },
  plugins: [require("daisyui"), require("@tailwindcss/typography")],
};
