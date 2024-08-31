/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'dark-primary' : '#344765',
        'orange-primary': '#344765',
        'green-primary': '#344765',
        'red-primary': '#f02722',
        'red-secondary': '#c10e65',
        'blue-primary' : '#014D81',
      },
    },
  },
  plugins: [
    require('tailwindcss-primeui')
  ],
}

