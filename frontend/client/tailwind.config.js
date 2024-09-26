import twElementsReactPlugin from "tw-elements-react/dist/plugin";

export default {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}",
    "./node_modules/tw-elements-react/dist/js/**/*.js",
  ],
  theme: {
    extend: {
      screens: {
        ssm: "320px", // Super small devices
        sm: "640px", // Mobile
        md: "768px", // Tablet
        lg: "1024px", // Laptop/Desktop
      },
    },
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
  plugins: [twElementsReactPlugin],
};
