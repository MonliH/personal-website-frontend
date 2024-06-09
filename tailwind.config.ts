import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontFamily: {
      "serif": ["PP Fragment Serif", "Times New Roman", "Times", "serif"],
      "sans": ["PP Fragment Serif", "Times New Roman", "Times", "serif"],
      "body": ["PP Fragment Serif", "Times New Roman", "Times", "serif"]
    }
  },
  plugins: [],
};
export default config;
