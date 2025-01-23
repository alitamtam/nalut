import twElementsReactPlugin from "tw-elements-react/dist/plugin";

export default {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}",
    "./node_modules/tw-elements-react/dist/js/**/*.js",
  ],
  theme: {
    extend: {
      // Breakpoints for responsiveness
      screens: {
        ssm: "320px", // Super small devices
        sm: "640px", // Mobile
        md: "768px", // Tablet
        lg: "1024px", // Laptop/Desktop
        xl: "1280px", // Large Desktop
        xxl: "1536px", // Extra Large Desktop
      },
      // Fonts configuration
      fontFamily: {
        sans: ["Almarai-Regular", "sans-serif"], // Default font
        arabic: ["Almaghreb-Regular", "sans-serif"],
        ubuntu: ["Ubuntu-Bold", "sans-serif"],
        button: ["Almarai-Light", "sans-serif"],
        body: ["Ubuntu-Medium", "sans-serif"],
      },
      // Colors configuration
      colors: {
        primary: "#ca8a04", // yellow-600
        secondary: "#000000", // black
        neutral: "#E8E8E8", // neutral gray
      },
    },
    // Container settings
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "1rem",
        md: "2rem",
        lg: "4rem",
      },
    },
  },
  // Plugins configuration
  plugins: [
    twElementsReactPlugin,
    // Custom utilities plugin
    function ({ addUtilities }) {
      const newUtilities = {
        ".text-start": {
          textAlign: "start",
        },
        ".text-end": {
          textAlign: "end",
        },
        ".direction-rtl": {
          direction: "rtl",
        },
        ".direction-ltr": {
          direction: "ltr",
        },
      };
      addUtilities(newUtilities, ["responsive", "hover"]);
    },
  ],
};
