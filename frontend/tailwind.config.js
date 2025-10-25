/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './src/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        blush: '#F8BBD0',
        lavender: '#E1BEE7',
        sky: '#BBDEFB',
        midnight: '#263238',
        cream: '#FFF7FA'
      },
      fontFamily: {
        sans: ['"Open Sans"', 'sans-serif']
      }
    }
  },
  plugins: []
};
