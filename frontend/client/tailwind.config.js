import twElementsReactPlugin from "tw-elements-react/dist/plugin";

export default {
  content: [
    "./src/**/*.{html,js,jsx}", // Make sure this includes the paths to your JS files
    "./node_modules/tw-elements-react/dist/js/**/*.js", // Add tw-elements
  ],
  theme: {
    extend: {},
  },
  plugins: [twElementsReactPlugin],
};
