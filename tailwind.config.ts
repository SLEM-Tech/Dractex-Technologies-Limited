import type { Config } from "tailwindcss";
import { heroui } from "@heroui/react";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    // Updated to heroui path
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["var(--font-poppins)", "sans-serif"],
      },
      colors: {
        transparent: "transparent",
        current: "currentColor",

        /* ========== Brand Foundation ========== */
        brand: {
          navy: "#002D5B",
          blue: "#004B93",
          light: "#E6F0F9",
        },

        background: "#FFFFFF",
        surface: "#FFFFFF",
        panel: "#FDFBFA",

        /* ========== Primary – Hot Pink (dominant landing-page accent) ========== */
        primary: {
          DEFAULT: "#E91E8C",
          hover: "#d4177f",
          light: "#FDF7FD",
        },

        /* ========== Secondary – Purples ========== */
        secondary: {
          DEFAULT: "#4834D4", // Sale section purple
          light: "#6C5CE7", // Trust badges purple
        },

        /* ========== Dark – Navy / Deep backgrounds ========== */
        dark: {
          DEFAULT: "#1A1A2E", // Dark navy cards/banners
          deep: "#002B5B", // Deep navy (maintenance banner)
          text: "#0A0A0A", // High-contrast text
        },

        /* ========== Neutral – Grays, borders, surfaces ========== */
        neutral: {
          DEFAULT: "#F5F5F5", // Light gray backgrounds
          border: "#E9E9E9", // Borders and dividers
          bg: "#F9FAFB", // Alternating row backgrounds
          surface: "#FAFAFA", // Section header backgrounds
          slider: "#E9E9E9", // Slider track
          card: "#F8F9FA", // Card image backgrounds
        },

        /* ========== Status – Feedback colors ========== */
        status: {
          pending: "#FFBD00",
          pendingBg: "#FFBD001F",
          success: "#32A071",
          successBg: "#D1FAE5",
          successBgAlt: "#32A0711F",
          successIcon: "#0596691F",
          error: "#E01020",
          errorBg: "#E010201F",
        },

        /* ========== Misc ========== */
        link: "#CB287F",
        accent: "#004B93",
        price: "#002D5B",
        whatsapp: "#25D366",

        // Tech-focused Grays
        gray: {
          50: "#F9FAFB",
          100: "#F3F4F6",
          200: "#E5E7EB",
          300: "#D1D5DB",
          400: "#9CA3AF",
          500: "#6B7280",
          600: "#4B5563",
          700: "#374151",
          800: "#1F2937",
          900: "#111827",
        },

        // Standard E-commerce feedback colors
        success: {
          light: "#E6F9F0",
          DEFAULT: "#10B981",
          dark: "#059669",
        },
        danger: {
          light: "#FEF2F2",
          DEFAULT: "#EF4444",
          dark: "#DC2626",
        },
      },

      animation: {
        "spin-slow": "spin 8s linear infinite",
        "fade-in": "fadeIn 0.5s ease-in-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
    },
    screens: {
      xs: "400px",
      xmd: "800px",
      slg: "999px",
      ...require("tailwindcss/defaultTheme").screens,
    },
  },
  darkMode: "class",
  plugins: [
    heroui({
      themes: {
        light: {
          colors: {
            primary: {
              DEFAULT: "#E91E8C",
              foreground: "#FFFFFF",
            },
            focus: "#d4177f",
          },
        },
      },
    }),
  ],
};
export default config;
