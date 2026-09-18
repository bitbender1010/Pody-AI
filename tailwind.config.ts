import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./data/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#20242C",
        cloud: "#FCFCFB",
        line: "#EAEAE8",
        undp: "#006EB5",
        leaf: "#3B9D7A",
      },
      boxShadow: {
        soft: "0 8px 30px rgba(32, 36, 44, 0.045)",
      },
    },
  },
  plugins: [],
};

export default config;
