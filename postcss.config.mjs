// @ts-check
/** @type {import('tailwindcss').Config} */
const config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['Orbitron', 'monospace'],
        mono:    ['Share Tech Mono', 'monospace'],
        body:    ['Rajdhani', 'sans-serif'],
      },
      colors: {
        cyan:   { DEFAULT: '#00d4ff' },
        purple: { DEFAULT: '#7c3aed' },
      },
    },
  },
  plugins: [],
};

export default config;