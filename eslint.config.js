import js from "@eslint/js";
import prettier from "eslint-plugin-prettier";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import requireExplicitGenerics from "eslint-plugin-require-explicit-generics";
import { defineConfig, globalIgnores } from "eslint/config";
import globals from "globals";
import tseslint from "typescript-eslint";

// Base configuration (Vite React TypeScript template)
const baseConfig = {
  files: ["**/*.{ts,tsx}"],
  extends: [
    js.configs.recommended,
    tseslint.configs.recommended,
    reactHooks.configs.flat.recommended,
    reactRefresh.configs.vite,
  ],
  languageOptions: { ecmaVersion: 2020, globals: globals.browser },
};

// Prettier integration
// Enforces consistent code formatting via ESLint
const prettierLayer = {
  files: ["**/*.{ts,tsx}"],
  plugins: { prettier },
  rules: {
    "prettier/prettier": "warn",
  },
};

// Explicit function return types
// Requires return types on function declarations (not arrow functions)
//   function getData(): string { ... }  ← required
//   const getData = () => { ... }       ← allowed
const explicitReturnTypesLayer = {
  files: ["**/*.{ts,tsx}"],
  rules: {
    "@typescript-eslint/explicit-function-return-type": [
      "warn",
      {
        allowExpressions: true,
        allowTypedFunctionExpressions: true,
        allowHigherOrderFunctions: true,
        allowDirectConstAssertionInArrowFunctions: true,
        allowConciseArrowFunctionExpressionsStartingWithVoid: true,
        allowIIFEs: true,
      },
    ],
  },
};

// Require explicit generics (Ahmed)
// Enforces explicit type parameters on common React hooks
//   useState<number>(0)      ← required
//   useRef<HTMLDivElement>() ← required
const requireExplicitGenericsLayer = {
  files: ["**/*.{ts,tsx}"],
  plugins: { "require-explicit-generics": requireExplicitGenerics },
  rules: {
    "require-explicit-generics/require-explicit-generics": [
      "warn",
      ["createContext", "useReducer", "useRef", "useState"],
    ],
  },
};

// No default exports (Andrew)
// Enforces named exports for better refactoring and auto-imports
//   export default App    ← disallowed
//   export { App }        ← preferred
const noDefaultExportsLayer = {
  files: ["**/src/**/*.{ts,tsx}"],
  rules: {
    "no-restricted-syntax": [
      "warn",
      {
        selector: "ExportDefaultDeclaration",
        message: "Prefer named exports over default exports.",
      },
    ],
  },
};

export default defineConfig([
  globalIgnores([
    "frontend/dist/",
    "infra/", // CDK infrastructure code
    "frontend/src/components/ui/", // Third-party components (shadcn, etc.)
  ]),

  // Layers (comment out to disable)
  baseConfig,
  prettierLayer,
  explicitReturnTypesLayer,
  requireExplicitGenericsLayer,
  noDefaultExportsLayer,
]);
