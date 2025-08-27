import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#0a0a0a",
        card: "#1a1a1a", 
        accent: "#3b82f6",
      },
    },
  },
  plugins: [],
};

export default config;
