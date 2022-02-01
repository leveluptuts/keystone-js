module.exports = {
  mode: 'jit',
  purge: ['./src/pages/**/*.{js,ts,jsx,tsx}', './src/components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      backgroundImage: {
        'page-background-mobile': "url('/img/bg.jpg')",
        'checkbox-checked': "url('/img/checkbox--checked.svg')",
        'checkbox-unchecked': "url('/img/checkbox--unchecked.svg')",
      },
      borderWidth: {
        '1': '1px'
      },
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
