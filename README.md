# recommended-eslint-prettier-react-compiler

**Standard `create-vite` scaffolding, production-ready with modular ESLint (flat config), Prettier, and React Compiler.**

This is the familiar Vite + React + TypeScript starter you already know, but with the hard configuration decisions already made. It's a **reference implementation**—copy what you need into your own projects.

## Why This Exists

Vite's default template is great for prototyping, but leaves tooling decisions to you:

- **Modern linting** — ESLint 9 flat config, no legacy `.eslintrc`
- **Composable architecture** — ESLint "layers" you can toggle on/off
- **Formatting** — Prettier integrated without conflicts
- **Optimization** — React Compiler for automatic memoization (React 19+)

## Documentation

| Feature            | Config             | Details                                      |
| :----------------- | :----------------- | :------------------------------------------- |
| **ESLint (Flat)**  | `eslint.config.js` | [CONTEXT/ESLINT.md](./CONTEXT/ESLINT.md)     |
| **Prettier**       | `.prettierrc`      | [CONTEXT/PRETTIER.md](./CONTEXT/PRETTIER.md) |
| **React Compiler** | `vite.config.ts`   | [CONTEXT/REACT_COMPILER.md](./CONTEXT/REACT_COMPILER.md) |

## Applying to Your Project

1. **Copy config files:**

   ```bash
   cp eslint.config.js .prettierrc vite.config.ts your-project/
   ```

2. **Install dependencies:**

   ```bash
   pnpm add -D eslint @eslint/js typescript-eslint eslint-config-prettier \
     eslint-plugin-prettier eslint-plugin-react-hooks eslint-plugin-react-refresh \
     eslint-plugin-require-explicit-generics globals \
     prettier prettier-plugin-tailwindcss babel-plugin-react-compiler
   ```

3. **Verify:**

   ```bash
   pnpm lint && pnpm prettier --check "src/**/*.{ts,tsx}"
   ```

## ESLint Layers (Composable)

The ESLint config is modular—enable or disable layers in `eslint.config.js`:

```js
export default defineConfig([
  globalIgnores([...]),
  baseConfig,                    // Core TypeScript, React Hooks
  prettierLayer,                 // Prettier integration
  // explicitReturnTypesLayer,   // Uncomment to enable
  // requireExplicitGenericsLayer,
  // noDefaultExportsLayer,
]);
```

| Layer                          | Purpose                                   |
| :----------------------------- | :---------------------------------------- |
| `baseConfig`                   | Core TypeScript, React Hooks, React Refresh |
| `prettierLayer`                | Prettier integration via ESLint           |
| `explicitReturnTypesLayer`     | Enforces return types on functions        |
| `requireExplicitGenericsLayer` | Enforces generics on `useState`, `useRef` |
| `noDefaultExportsLayer`        | Enforces named exports only               |

## Notes

- **Prettier** includes `prettier-plugin-tailwindcss` for automatic class sorting
- **React Compiler** requires `@vitejs/plugin-react` (Babel), not SWC
- **React Compiler** is experimental and requires React 19+

---

Questions? Check the `CONTEXT/` docs or [open an issue](https://github.com/zaydek/recommended-eslint-prettier-react-compiler/issues).
