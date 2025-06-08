import tailwindScrollbar from 'tailwind-scrollbar';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            maxWidth: 'none',
            color: '#333',
            a: {
              color: '#3182ce',
              '&:hover': {
                color: '#2c5282',
              },
            },
            pre: {
              backgroundColor: '#1a202c',
              color: '#e2e8f0',
              padding: '1rem',
              borderRadius: '0.5rem',
            },
            code: {
              color: '#805ad5',
              '&::before': {
                content: '""',
              },
              '&::after': {
                content: '""',
              },
            },
          },
        },
      },
      lineClamp: {
        2: '2',
      },
      transitionProperty: {
        'height': 'height',
        'spacing': 'margin, padding',
      },
      colors: {
      'blackMain': '#000000',
      'whiteMain': '#ffffff',
      'purpleMain': '#7C3AED',//#371b92
      'blueMain': '#036fcd',
      'yellowMain': '#e7bb4c',
      'orangeMain': '#e27c3d',
      'seablueMain': '#03a8bc',
      'petchMain': '#dc5e47',
      'greenMain': '#57cc99',
      'redMain': '#f5014a',
      'transparent': 'transparent'
    },
      animation: {
        'bounce-slow': 'bounce-slow 3s ease-in-out infinite',
        'fade-in': 'fade-in 0.5s ease-out forwards',
        'slow-spin': 'spin 20s linear infinite',
        'pulse': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        blob: "blob 7s infinite",
        float: "float 3s ease-in-out infinite",
        wiggle: 'wiggle 3s ease-in-out infinite',
      },
      backgroundImage: {
        'gradient-conic': 'conic-gradient(var(--tw-gradient-stops))',
      },
      keyframes: {
         'bounce-slow': {
          '0%, 100%': { transform: 'translateY(-5%)' },
          '50%': { transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        blob: {
          "0%": {
            transform: "translate(0px, 0px) scale(1)",
          },
          "33%": {
            transform: "translate(30px, -50px) scale(1.1)",
          },
          "66%": {
            transform: "translate(-20px, 20px) scale(0.9)",
          },
          "100%": {
            transform: "translate(0px, 0px) scale(1)",
          },
        },
        float: {
          "0%, 100%": {
            transform: "translateY(0) rotate(12deg)",
          },
          "50%": {
            transform: "translateY(-10px) rotate(12deg)",
          },
        },
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