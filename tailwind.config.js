module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}", "./constants/**/*.{js,ts}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: {
          '50': '#eeffef',
          '100': '#d8ffdc',
          '200': '#b3ffbb',
          '300': '#57fc6a',
          '400': '#37f14d',
          '500': '#0dda25',
          '600': '#04b519',
          '700': '#078e19',
          '800': '#0c6f1a',
          '900': '#0c5b18',
          '950': '#003308',
        }
      }
    },
  },
  plugins: [],
}