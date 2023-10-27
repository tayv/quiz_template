const colors = require("tailwindcss/colors")
// import colors from 'tailwindcss/colors'

module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./designSystem/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: colors.stone,
        cta: colors.indigo, // cta buttons
        link: colors.violet, // links
        accent: colors.lime, // focus rings, etc.
      },

      borderRadius: {
        "4xl": "50px",
        "5xl": "65px",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
}
