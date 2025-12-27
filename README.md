# Vite React TypeScript — Reference Configuration

Reference implementation for ESLint flat config, Prettier, and React Compiler in Vite + React + TypeScript projects.

## Contents

| Feature            | Config File        | Documentation                                            |
| :----------------- | :----------------- | :------------------------------------------------------- |
| **ESLint (Flat)**  | `eslint.config.js` | [CONTEXT/ESLINT.md](./CONTEXT/ESLINT.md)                 |
| **Prettier**       | `.prettierrc`      | [CONTEXT/PRETTIER.md](./CONTEXT/PRETTIER.md)             |
| **React Compiler** | `vite.config.ts`   | [CONTEXT/REACT_COMPILER.md](./CONTEXT/REACT_COMPILER.md) |

## Applying to Your Project

1. **Copy config files** to your project root:

   ```bash
   cp eslint.config.js .prettierrc vite.config.ts your-project/
   ```

2. **Install dependencies** (see each `CONTEXT/*.md` for details):

   ```bash
   pnpm add -D eslint @eslint/js typescript-eslint eslint-config-prettier \
     eslint-plugin-prettier eslint-plugin-react-hooks eslint-plugin-react-refresh \
     eslint-plugin-require-explicit-generics globals \
     prettier prettier-plugin-tailwindcss babel-plugin-react-compiler
   ```

3. **Verify setup**:

   ```bash
   pnpm lint && pnpm prettier --check "src/**/*.{ts,tsx}"
   ```

## ESLint Composable Layers

| Layer                          | Purpose                                      |
| :----------------------------- | :------------------------------------------- |
| `baseConfig`                   | Core TypeScript, React Hooks, standard rules |
| `prettierLayer`                | Prettier integration via ESLint              |
| `explicitReturnTypesLayer`     | Enforces return types on functions           |
| `requireExplicitGenericsLayer` | Enforces generics on `useState`, `useRef`    |
| `noDefaultExportsLayer`        | Enforces named exports only (src/ files)     |

Enable/disable layers in `eslint.config.js`:

```js
export default defineConfig([
  globalIgnores([...]),
  baseConfig,
  prettierLayer,
  // explicitReturnTypesLayer,      // Uncomment to enable
  // requireExplicitGenericsLayer,
  // noDefaultExportsLayer,
]);
```

## Notes

- **Prettier** includes `prettier-plugin-tailwindcss` for automatic class sorting
- **React Compiler** requires `@vitejs/plugin-react` (Babel), not SWC
- **Monorepo**: Place configs at root, update `globalIgnores` as needed

---

Questions? Check the `CONTEXT/` docs.
