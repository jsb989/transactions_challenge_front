const typography = require('@tailwindcss/typography')
const aspectratio = require('@tailwindcss/aspect-ratio')
const forms = require('@tailwindcss/forms')

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        azul: '#002c5f',
      }
    }
  },
  plugins: [forms, typography, aspectratio],
}