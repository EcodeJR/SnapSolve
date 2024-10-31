import tailwindScrollbar from 'tailwind-scrollbar';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      'blackMain': '#000000',
      'whiteMain': '#ffffff',
      'purpleMain': '#371b92',
      'blueMain': '#036fcd',
      'yellowMain': '#e7bb4c',
      'orangeMain': '#e27c3d',
      'seablueMain': '#03a8bc',
      'petchMain': '#dc5e47',
      'greenMain': '#57cc99',
      'redMain': '#f5014a',
      'transparent': 'transparent'
    },
    extend: {
      animation: {
        wiggle: 'wiggle 3s ease-in-out infinite',
      },
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-5deg)' },
          '50%': { transform: 'rotate(5deg)' },
        }
      }
    },
  },
  plugins: [
    tailwindScrollbar,
  ],
}