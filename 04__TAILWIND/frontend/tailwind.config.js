module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: "#E9C376",
        secondary: "#DFB8AC"
      },
    },
    fontFamily: {
      display: ["Mirage"],
      sans: ["Nunito Sans"],
      handwriting: ["BrittanySignature"],
      serif: ["Roboto Slab"]
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
