// tailwind.config.js
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
      extend: {
        colors: {
          primary: "#B9375D",
          accent:  "#D25D5D",
          soft:    "#E7D3D3",
          pagebg:  "#EEEEEE",
          muted:   "#EEEEEE",
          gray:    "#737373", 
        },
      },
    },
    plugins: [],
  };