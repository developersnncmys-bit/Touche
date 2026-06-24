import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#0B0B0B",
        ivory: "#F5EFE6",
        champagne: "#C8A45D",
        taupe: "#A89582",
        bone: "#EDE5D8",
        // Warm espresso variants — used sparingly for soft dark sections
        // (sits alongside ink, not replacing it). Inspired by deep coffee
        // tones common in luxury Indian interior studios.
        espresso: "#1F1815",
        cocoa: "#2B221E",
        sand: "#E8DFD1",
      },
      fontFamily: {
        // Display prefers classic grotesque (Helvetica on Mac, Arial on Windows)
        // for that timeless luxury-studio feel; Inter Tight is the webfont fallback.
        display: [
          "Helvetica Neue",
          "Helvetica",
          "Arial",
          "var(--font-display)",
          "system-ui",
          "sans-serif",
        ],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        script: ["var(--font-script)", "Georgia", "serif"],
      },
      letterSpacing: {
        luxe: "0.22em",
        wider: "0.12em",
      },
      animation: {
        marquee: "marquee 40s linear infinite",
        shimmer: "shimmer 3s ease-in-out infinite",
        "fade-up": "fadeUp 1s ease-out forwards",
        "scale-in": "scaleIn 1.2s ease-out forwards",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        shimmer: {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "1" },
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(40px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        scaleIn: {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
      },
      transitionTimingFunction: {
        "luxe": "cubic-bezier(0.65, 0, 0.35, 1)",
        "smooth": "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
