import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        footerblue: "#002904",
        footeruplist: "#007D00",
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      minHeight: {
        'screen-dvh': '100dvh', 
      },
    },
  },
  plugins: [],
};

export default config;
