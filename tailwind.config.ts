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
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "#5e69ff",
        primaryDark: "#5864ff",
        primaryLight: "#7d86ff",
      },

      width: {
        // 576px sm
        "144": "36rem",
        // 768px md
        "192": "48rem",
        // 992px lg
        "248": "62rem",
        // 1200px xl
        "300": "75rem",
        // 1400px xxl
        "352": "88rem",
      },
    },
  },
  plugins: [],
};
export default config;
