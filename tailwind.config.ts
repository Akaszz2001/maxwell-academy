// tailwind.config.js
import colors from "tailwindcss/colors";

export default {
  theme: {
    extend: {
      colors: {
        // force Tailwind to use rgb/hsl instead of oklch
        blue: colors.blue,
        gray: colors.gray,
        green: colors.green,
        red: colors.red,
      },
    },
  },
  plugins: [],
};
