import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/shared/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/entities/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/features/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/widgets/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {

        white: "#FFFFFF",
        black: "#000000",

        primary: {
          DEFAULT: "#1369D9",
          50: "#E8EBF0",
          100: "#E0E8F2",
          500: "#1369D9",
          600: "#327AD9",
          700: "#121D2C",
        },

        gray: {
          50: "#F5F7FA",
          100: "#E8EBF0",
          200: "#E0E8F2",
          300: "#D8E1EA",
          400: "#848A93",
          500: "#848A93",
          600: "#121D2C",
          700: "#121D2C",
          800: "#121D2C",
          900: "#000000",
        },


        neutral: {
          50: "#F5F7FA",
          100: "#E8EBF0",
          200: "#E0E8F2",
          300: "#D8E1EA",
          400: "#848A93",
          500: "#848A93",
          600: "#121D2C",
          700: "#121D2C",
          800: "#121D2C",
          900: "#000000",
        },

        success: {
          50: "#f0fdf4",
          100: "#dcfce7",
          500: "#22c55e",
          600: "#16a34a",
        },
        warning: {
          50: "#fffbeb",
          100: "#fef3c7",
          500: "#f59e0b",
          600: "#d97706",
        },
        error: {
          50: "#fef2f2",
          100: "#fee2e2",
          500: "#ef4444",
          600: "#dc2626",
        },
      },
      fontFamily: {
        sans: [
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
      },
      fontSize: {
        xs: ["12px", { lineHeight: "16px" }],
        sm: ["14px", { lineHeight: "20px" }],
        base: ["16px", { lineHeight: "24px" }],
        lg: ["18px", { lineHeight: "28px" }],
        xl: ["20px", { lineHeight: "28px" }],
        "2xl": ["24px", { lineHeight: "32px" }],
        "3xl": ["30px", { lineHeight: "36px" }],
      },
      spacing: {
        "18": "4.5rem",
        "88": "22rem",
      },
      borderRadius: {
        lg: "8px",
        xl: "12px",
      },
      boxShadow: {
        sm: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
        md: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
        lg: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
        popover: "0 10px 25px rgb(0 0 0 / 0.12), 0 4px 15px rgb(0 0 0 / 0.08)",
      },
      animation: {
        "slide-down": "slideDown 150ms cubic-bezier(0.16, 1, 0.3, 1)",
        "slide-up": "slideUp 150ms cubic-bezier(0.16, 1, 0.3, 1)",
        "fade-in": "fadeIn 150ms ease-out",
        "fade-out": "fadeOut 150ms ease-in",
      },
      keyframes: {
        slideDown: {
          from: { opacity: "0", transform: "translateY(-10px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        slideUp: {
          from: { opacity: "1", transform: "translateY(0)" },
          to: { opacity: "0", transform: "translateY(-10px)" },
        },
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        fadeOut: {
          from: { opacity: "1" },
          to: { opacity: "0" },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
