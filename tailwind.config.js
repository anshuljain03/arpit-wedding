/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Deep olive-green (like the poster's main panel)
        primary: {
          DEFAULT: "#7A9A7E",
          50: "#f2f5f2",
          100: "#e0e8e1",
          200: "#c2d1c4",
          300: "#9bb5a0",
          400: "#7A9A7E",
          500: "#6B8B6F",
          600: "#567056",
          700: "#455A46",
          800: "#364538",
          900: "#28332A",
          950: "#1A221B",
        },
        // Warm gold/amber accent
        accent: {
          DEFAULT: "#D4993D",
          light: "#E8C84A",
          dark: "#9B6E1F",
          muted: "#FDF6E8",
        },
        // Bold orange for borders (poster's thick frame)
        orange: {
          DEFAULT: "#E87A4A",
          light: "#F09B73",
          dark: "#C45E30",
        },
        // Vivid floral colors
        floral: {
          pink: "#E8508A",
          coral: "#E84545",
          blush: "#F5A0B8",
          blue: "#4A7EC8",
          darkblue: "#3B5E94",
        },
        // Background tones
        batik: {
          cream: "#FFF5E6",
          maroon: "#7A2E3B",
          teal: "#2A7B6F",
        },
        cream: "#FFF5E6",
        sand: "#FCECD0",
        stone: "#F5E4CC",
      },
      fontFamily: {
        sans: ["Poppins", "system-ui", "-apple-system", "sans-serif"],
        serif: ["Playfair Display", "Georgia", "serif"],
        display: ["Cormorant Infant", "Georgia", "serif"],
        script: ["Cormorant SC", "Georgia", "serif"],
      },
      fontSize: {
        "10xl": "10rem",
        "11xl": "12rem",
        "12xl": "14rem",
      },
      letterSpacing: {
        tightest: "-.075em",
        widest: ".25em",
      },
      animation: {
        "fade-in": "fadeIn 1s ease-out",
        "fade-up": "fadeUp 1s ease-out",
        "slide-in": "slideIn 0.5s ease-out",
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        shimmer: "shimmer 3s ease-in-out infinite",
        glow: "glow 2s ease-in-out infinite alternate",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideIn: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(0)" },
        },
        shimmer: {
          "0%, 100%": { opacity: "0.7" },
          "50%": { opacity: "1" },
        },
        glow: {
          "0%": { boxShadow: "0 0 5px rgba(232, 122, 74, 0.3)" },
          "100%": { boxShadow: "0 0 25px rgba(232, 122, 74, 0.6)" },
        },
      },
      spacing: {
        18: "4.5rem",
        88: "22rem",
        120: "30rem",
        128: "32rem",
        144: "36rem",
      },
      screens: {
        xs: "475px",
        "3xl": "1920px",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
