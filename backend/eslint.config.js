import globals from "globals";
import pluginJs from "@eslint/js";

export default [
  {
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
    },
  },
  pluginJs.configs.recommended,
  {
    extends: [
      "airbnb", // Using Airbnb's base style guide
      "plugin:react/recommended", // Add React specific linting rules
    ],
    settings: {
      react: {
        version: "detect", // Automatically detect the React version
      },
    },
    rules: {
      // Custom overrides can be added here
      // Example:
      // "no-console": "off",
    },
  },
];
