import eslint from "@eslint/js";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import importPlugin from "eslint-plugin-import";
import jsxA11y from "eslint-plugin-jsx-a11y";
import reactPlugin from "eslint-plugin-react";
// import eslintPluginPrettierRecommended from "eslint-plugin-prettier";
import prettierPlugin from "eslint-plugin-prettier";

export default tseslint.config(
  eslint.configs.recommended,
  // importPlugin.flatConfigs.recommended,
  jsxA11y.flatConfigs.recommended,
  reactPlugin.configs.flat.recommended,
  reactPlugin.configs.flat["jsx-runtime"],
  tseslint.configs.recommendedTypeChecked,
  tseslint.configs.stylisticTypeChecked,
  // eslintPluginPrettierRecommended,

  {
    ignores: ["*.config.mjs", "eslint.config.js", "node_modules", "dist"],
  },
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    settings: {
      // pour éviter les erreurs de "react version not specified"
      react: {
        version: "detect",
      },
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      import: importPlugin, // remplacé par importPlugin.flatConfigs.recommended
      // "jsx-a11y": jsxA11y, // remplacé par jsxA11y.flatConfigs.recommended
      // react: reactPlugin, // remplacé par reactPlugin.configs.flat.recommended et reactPlugin.configs.flat["jsx-runtime"]
      prettier: prettierPlugin, // remplacé par eslintPluginPrettierRecommended
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
      "prettier/prettier": "error",
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_" },
      ],
      "@typescript-eslint/no-explicit-any": "warn",
      // mettre en error strict-boolean-expressions est mieux mais implique de changer les conditions de type "{error && " pour afficher un message d'erreur par exemple
      "@typescript-eslint/strict-boolean-expressions": "off",
      // no-misused-promises est issue des règles avancées recommended-type-checked
      "@typescript-eslint/no-misused-promises": "off",
      // désactiver no-floating-promises (issue des règles avancées recommended-type-checked) si besoin car on utilise déjà try/catch et gère déjà les états pending/fulfilled/rejected
      "react/self-closing-comp": "error",
      "react/prop-types": "off", // on utilise TypeScript
      "react/no-unused-state": "warn", // repérer les states non utilisées
      "react/no-deprecated": "warn", // repérer les méthodes React obsolètes
      "react/jsx-no-duplicate-props": "warn", // repérer les props dupliquées
      "jsx-a11y/alt-text": "warn",
      "jsx-a11y/anchor-is-valid": "warn",
      "no-unused-vars": "off", // eslint-plugin-import
      "import/no-dynamic-require": "warn", // eslint-plugin-import
      "import/no-nodejs-modules": "warn", // eslint-plugin-import
    },
  }
);
