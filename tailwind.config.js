module.exports = {
  purge: {
    content: [
      "./src/**/*.html",
      "./src/components/TheDialog.vue",
      "./src/components/Cell.vue",
      "./src/App.vue",
    ],
    safelist: [
      "bg-board",
      "bg-0",
      "bg-2",
      "bg-4",
      "bg-8",
      "bg-16",
      "bg-32",
      "bg-64",
      "bg-128",
      "bg-256",
      "bg-512",
      "bg-1024",
      "bg-2048",
      "lg:text-2xl",
      "lg:text-3xl",
    ],
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      height: {
        "screen-w": "100vw",
        "screen-w-1/3": "33vw",
      },
      width: {
        "screen-1/3": "33vw",
      },
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
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
