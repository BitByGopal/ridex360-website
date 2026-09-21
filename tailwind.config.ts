import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // "linen" now serves as the site's light background token (was pale linen, now near-white / soft green)
        linen: "#F7FBF9",
        // "apricot" now serves as the primary brand accent (was terracotta, now RideX360 emerald green)
        apricot: {
          DEFAULT: "#087F5B",
          dark: "#07543F",
        },
        // "charcoal" now serves as the primary dark text/background token
        charcoal: "#102027",
        // "taupe" now serves as the subtle border/secondary-surface token
        taupe: "#DDEBE4",
        // New tokens matching the brand brief directly, for anything that wants them explicitly
        brand: {
          light: "#3FAF70",
          accent: "#9BE44D",
          soft: "#F0F9F4",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        sans: ["var(--font-inter)", "sans-serif"],
      },
      maxWidth: {
        prose: "72ch",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(14px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "route-line": {
          "0%": { strokeDashoffset: "240" },
          "100%": { strokeDashoffset: "0" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.7s ease-out forwards",
        "route-line": "route-line 2.4s ease-in-out forwards",
      },
    },
  },
  plugins: [],
};
export default config;