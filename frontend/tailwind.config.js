/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        primary: ['primary', 'cursive'],
      },
      colors: {
        accent: {
          main: '#1B3F99',
        },
        navlink: {
          active: '#f1f5f9',
          hover: '#f8fafc'
        }
      },
      keyframes: {
        spin: {
          '0%': { transform: 'rotate(0)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
      animation: {
        spin: 'spin 2.5s linear infinite',
      },
    },
  },
  plugins: [],
}

