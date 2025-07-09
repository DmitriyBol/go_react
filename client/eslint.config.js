import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import { globalIgnores } from "eslint/config";
import eslint from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier/flat";

export default tseslint.config([
  globalIgnores(["dist"]),
  eslintConfigPrettier,
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      eslint.configs.recommended,
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs["recommended-latest"],
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    rules: {
      indent: ["error", 4],
      "linebreak-style": ["error", "unix"],
      quotes: ["error", "single"],
      semi: ["error", "always"],
    },
  },
]);
