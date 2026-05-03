import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#102a43',
        mist: '#eef6f5',
        moss: '#5b7c5b',
        clay: '#b66c3a',
        sand: '#f3ede1',
        lake: '#1e6f8f',
      },
      fontFamily: {
        sans: ['"Manrope"', '"Segoe UI"', 'sans-serif'],
        display: ['"DM Serif Display"', 'Georgia', 'serif'],
      },
      boxShadow: {
        soft: '0 20px 60px rgba(16, 42, 67, 0.12)',
      },
      backgroundImage: {
        'hero-radial': 'radial-gradient(circle at top left, rgba(30, 111, 143, 0.22), transparent 45%), radial-gradient(circle at 80% 20%, rgba(182, 108, 58, 0.18), transparent 30%)',
      },
      keyframes: {
        rise: {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        rise: 'rise 500ms ease-out both',
      },
    },
  },
  plugins: [],
} satisfies Config;
