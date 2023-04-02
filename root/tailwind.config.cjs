/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'fade': 'fadein 0.5s;',
      },
      colors: {
        'neutral': {
          800: '#141414',
          900: '#0c0c0c',
        },
      },
    },
    
  },
  plugins: [],
}
