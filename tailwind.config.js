/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}', './lib/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      animation: {
        'gradient-rotate': 'gradient-rotate 3s linear infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'pulse-soft': 'pulse-soft 1.2s ease-in-out infinite',
        'twinkle': 'twinkle 2s ease-in-out infinite',
        'sparkle-fade': 'sparkle-fade 3s ease-in-out infinite',
        'sparkle-zoom': 'sparkle-zoom 2.5s cubic-bezier(0.4, 0, 0.2, 1) infinite',
      },
      keyframes: {
        'gradient-rotate': {
          '0%': { '--angle': '0deg' },
          '100%': { '--angle': '360deg' },
        },
        'shimmer': {
          '0%': { backgroundPosition: '200% 0' },
          '100%': { backgroundPosition: '-200% 0' },
        },
        'pulse-soft': {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.85', transform: 'scale(0.98)' },
        },
        'twinkle': {
          '0%, 100%': { opacity: '0.2', transform: 'scale(0.8)' },
          '50%': { opacity: '1', transform: 'scale(1.1)' },
        },
        'sparkle-fade': {
          '0%, 100%': { opacity: '0', transform: 'scale(0)' },
          '50%': { opacity: '1', transform: 'scale(1)' },
        },
        'sparkle-zoom': {
          '0%': { opacity: '0.3', transform: 'scale(0.6)' },
          '25%': { opacity: '1', transform: 'scale(1.15)' },
          '50%': { opacity: '0.7', transform: 'scale(0.85)' },
          '75%': { opacity: '1', transform: 'scale(1.05)' },
          '100%': { opacity: '0.3', transform: 'scale(0.6)' },
        },
      },
    },
  },
  plugins: [],
};
