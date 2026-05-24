/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: {
          950: '#07111f',
          900: '#0b1729',
          800: '#12213b',
          700: '#1a2c4d',
        },
        surface: {
          900: 'rgba(8, 15, 28, 0.9)',
          800: 'rgba(12, 23, 41, 0.86)',
          700: 'rgba(19, 30, 52, 0.78)',
        },
        border: 'rgba(148, 163, 184, 0.16)',
        accent: {
          50: '#ecfeff',
          100: '#cffafe',
          200: '#a5f3fc',
          300: '#67e8f9',
          400: '#22d3ee',
          500: '#06b6d4',
          600: '#0891b2',
          700: '#0e7490',
        },
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(34, 211, 238, 0.15), 0 24px 60px rgba(3, 7, 18, 0.45)',
        panel: '0 24px 80px rgba(2, 6, 23, 0.55)',
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        sans: ['"Space Grotesk"', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'monospace'],
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-120% 0' },
          '100%': { backgroundPosition: '120% 0' },
        },
      },
      animation: {
        float: 'float 8s ease-in-out infinite',
        shimmer: 'shimmer 1.8s linear infinite',
      },
    },
  },
  plugins: [],
}
