module.exports = {
  purge: ["./src/App.vue", "./src/components/*.vue"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      black: "#000000",
      white: "#ffffff",
      "txt-primary": "#776e65",
      "txt-secondary": "#f9f6f2",
      board: "#bbada0",
      0: "#ccbcaf",
      2: "#eee4da",
      4: "#ede0c8",
      8: "#f2b179",
      16: "#f59563",
      32: "#f67c5f",
      64: "#f65e3b",
      128: "#edcf72",
      256: "#edcc61",
      512: "#edc850",
      1024: "#BAB62D",
      2048: "#69C726",
    },
    screens: {
      sm: "500px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    extend: {
      height: {
        "screen-w": "100vw",
        "screen-w-1/3": "33vw",
      },
      width: {
        "screen-1/3": "33vw",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
