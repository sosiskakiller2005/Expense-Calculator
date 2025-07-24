import { heroui } from '@heroui/theme';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.{js,ts}",
  ],
  darkMode: "class",
  theme: {
    extend: {},
  },
  plugins: [
    heroui({
      themes: {
        light: {
          colors: {
            primary: "#A71D31",
            secondary: '#9C9990',
            foreground: "#292F36",
            background: "#f9fafb",
            border: "#e5e7eb",
            card: "#f9fafb",
            muted: "#9ca3af",
          },
        },
        dark: {
          colors: {
            primary: "#A71D31",
            secondary: '#9C9990',
            foreground: "#ffffff",
            background: "#292F36",
            border: "#4f46e5",
            card: "#4f46e5",
            muted: "#6b7280",
          },
        },
      },
    }),
  ],
};
