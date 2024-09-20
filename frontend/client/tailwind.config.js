import twElementsReactPlugin from "tw-elements-react/dist/plugin";

export default {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}", // Ensure all JS and JSX files are included
    "./node_modules/tw-elements-react/dist/js/**/*.js", // Add tw-elements
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
  },
  plugins: [twElementsReactPlugin],
};
