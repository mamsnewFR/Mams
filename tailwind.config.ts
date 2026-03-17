import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: 'class',
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
        primary: {
          50: '#f0f4ff',
          100: '#e0eaff',
          200: '#c7d8fd',
          300: '#a5bdfb',
          400: '#8099f8',
          500: '#6172f3',
          600: '#4c51e8',
          700: '#3f3fce',
          800: '#3535a5',
          900: '#303083',
          950: '#1c1c4d',
        },
        accent: {
          50: '#fdf4ff',
          100: '#fae8ff',
          200: '#f4d0fe',
          300: '#eaadfb',
          400: '#dd79f6',
          500: '#cc52ec',
          600: '#b133cf',
          700: '#9428aa',
          800: '#7a2489',
          900: '#652070',
          950: '#430549',
        },
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'system-ui', 'sans-serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
