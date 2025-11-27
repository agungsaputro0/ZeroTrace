import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      height: {
        'h-mobile': "100dvh",
      },
      minHeight: {
        'screen-dvh': '100dvh', 
      },
      colors: {
        mainColor: "#26D6A8",
        secondColor: "#26C6DA",
        footerblue: "#002904",
        footeruplist: "#007D00",
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      backgroundImage: {
        'zeroTrace-gradient': 'linear-gradient(to right, #26C6DA, #26D6A8)',
      },
      animation: {
        wave: 'wave 1s infinite ease-in-out',
      },
      keyframes: {
        wave: {
          '0%, 100%': { transform: 'scaleY(0.3)' },
          '50%': { transform: 'scaleY(1)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
