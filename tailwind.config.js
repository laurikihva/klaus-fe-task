/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    colors: {
      white: "#fff",
      blue: {
        100: "#edf2f7",
        200: "#c8e7f9",
        300: "#2c5282",
        400: "#475de5",
        500: "#3432bf",
      },
      gray: {
        100: "#a0aec0",
        200: "#cbd5e0",
        400: "#e2e8f0",
        500: "#4a5568",
        600: "#2d3748",
        700: "#1a202c",
      },
      pink: {
        100: "#fedde6",
        200: "#922b6c",
      },
      purple: {
        100: "#efe2fe",
        200: "#574195",
      },
      yellow: {
        100: "#feebc8",
        200: "#91472c",
      },
    },
    fontFamily: {
      sans: ["Inter", "system-ui", "Avenir", "Helvetica", "Arial", "sans-serif"],
    },
    lineHeight: {
      normal: 1.5,
    },
    fontSize: {
      "4xl": ["2.25rem", "1.2"], // 36px
      "3xl": ["1.75rem", "1.2"], // 28px
      "2xl": ["1.5rem", "1.2"], // 24px
      xl: ["1.25rem", "1.2"], // 20px
      lg: ["1.125rem", "1.2"], // 18px
      base: ["1rem", "1.2"], // 16px
      sm: ["0.875rem", "1.5"], // 14px
    },
    extend: {},
  },
  plugins: [],
};
