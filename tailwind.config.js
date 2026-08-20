/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          lime: '#8DC63F',
          green: '#3DB34A',
          DEFAULT: '#2E9E46',
          dark: '#1B7A3E',
          forest: '#0F5A2E',
        },
        gold: {
          light: '#E0B458',
          DEFAULT: '#C8912F',
          dark: '#8A6520',
        },
        ink: '#14261A',
        cream: '#F7FAF3',
      },
      fontFamily: {
        heading: ['Gilroy', 'system-ui', 'sans-serif'],
        body: ['"Myriad Pro"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 10px 40px -12px rgba(15, 90, 46, 0.25)',
        card: '0 8px 30px -10px rgba(20, 38, 26, 0.18)',
      },
      backgroundImage: {
        'brand-gradient': 'linear-gradient(135deg, #8DC63F 0%, #2E9E46 45%, #0F5A2E 100%)',
        'gold-gradient': 'linear-gradient(135deg, #E0B458 0%, #C8912F 50%, #8A6520 100%)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.6s ease-out both',
      },
    },
  },
  plugins: [],
}
