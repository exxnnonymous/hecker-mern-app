module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: "class", // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        raleway: ["raleway", "sans-serif"],
      },
      backgroundColor: {
        primary: "#f0f2f5",
        icon: "#e4e6eb",
        darkNav: "#242526",
        darkBody: "#18191a",
        darkPost: "#242526",
        darkInputBg: "#3a3b3c",
        darkModalBg: "#0d0d0d",
        darkModal: "#242526",
        iconBg: "rgba(255, 255, 255, .11)",
        darkListBg: "rgba(255,255,255,.10)",
        lightListBg: "rgba(0,0,0,.05)",
      },
      borderColor: {
        darkPost: "#3a3b3c",
        darkNav: "#393a3b",
      },
      colors: {
        darkFont: "#b0b3b8",
        likeComment: "#a2a5b3",
        darkModalFont: "#e4e6eb",
      },
    },
  },
  variants: {
    extend: {
      opacity: ["disabled"],
      cursor: ["disabled"],
      borderRadius: ["active"],
    },
  },
  plugins: [],
};
