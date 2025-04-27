/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FF6B98', // Pink color for primary brand
        secondary: '#8A4FFF', // Purple for secondary elements
        accent: '#FFD166', // Gold accent color
        light: '#FFF9F9', // Light background
        dark: '#2E294E', // Dark text color
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'],
        display: ['var(--font-playfair-display)', 'serif'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-slow': 'bounce 3s infinite',
      },
      transitionDelay: {
        '700': '700ms',
      }
    },
  },
  plugins: [],
} 