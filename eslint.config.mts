import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import { defineConfig } from "eslint/config";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";

export default defineConfig([
  {
    ignores: [
      "dist/",
      // Exclude Prisma generated files
      "prisma/src/generated/**",
      "**/generated/prisma/**",
      "**/.prisma/**",
    ],
  },
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts}"],
    plugins: { js },
    extends: ["js/recommended"],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },

  {
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],
    },
  },

  {
    files: ["**/*.js"],
    languageOptions: {
      sourceType: "commonjs",
    },
  },

  // Override rules for any remaining generated code that might not be caught by ignores
  {
    files: ["**/generated/**/*.{js,ts}", "**/*.generated.{js,ts}"],
    rules: {
      "@typescript-eslint/no-unused-expressions": "off",
      "@typescript-eslint/no-require-imports": "off",
      "@typescript-eslint/no-unused-vars": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-this-alias": "off",
      "no-undef": "off",
      "no-prototype-builtins": "off",
      "no-useless-escape": "off",
      "no-control-regex": "off",
      "no-empty": "off",
      "no-unsafe-finally": "off",
      "no-redeclare": "off",
      "no-cond-assign": "off",
      "no-constant-binary-expression": "off",
    },
  },

  tseslint.configs.recommended,
  eslintPluginPrettierRecommended,
]);
