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

| Feature            | Config             | Details                                                  |
| :----------------- | :----------------- | :------------------------------------------------------- |
| **ESLint (Flat)**  | `eslint.config.js` | [CONTEXT/ESLINT.md](./CONTEXT/ESLINT.md)                 |
| **Prettier**       | `.prettierrc`      | [CONTEXT/PRETTIER.md](./CONTEXT/PRETTIER.md)             |
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

| Layer                          | Purpose                                                                    |
| :----------------------------- | :------------------------------------------------------------------------- |
| `baseConfig`                   | Core TypeScript + React Hooks/Refresh rules for type-safe React apps       |
| `prettierLayer`                | Disables ESLint formatting rules to prevent Prettier conflicts             |
| `explicitReturnTypesLayer`     | Requires return types on function declarations for self-documenting APIs   |
| `requireExplicitGenericsLayer` | Requires explicit generics on React hooks to prevent type inference issues |
| `noDefaultExportsLayer`        | Enforces named exports in `src/` for better refactoring and auto-imports   |

<details>
<summary><strong>Layer details</strong></summary>

### `explicitReturnTypesLayer`

Requires return types on function declarations only (arrow functions are exempt).

```ts
// ✓ Required
function getData(): string { ... }

// ✓ Arrow functions exempt
const getData = () => { ... }
```

_Why:_ Explicit types catch errors early and prevent accidental API changes.

### `requireExplicitGenericsLayer`

Applies to: `useState`, `useRef`, `useReducer`, `createContext`, etc.

```ts
// ✗ Avoid
const [count, setCount] = useState(0);

// ✓ Preferred
const [count, setCount] = useState<number>(0);
```

_Why:_ Prevents inference pitfalls—`useState()` implies `undefined`, explicit generics force you to define the full type.

### `noDefaultExportsLayer`

Applies only to `**/src/**/*.{ts,tsx}`. Config files and tests are unaffected.

_Why:_ Named exports ensure import names match component names, making global refactoring safer and auto-imports more reliable.

</details>

## Notes

- **Prettier** includes `prettier-plugin-tailwindcss` for automatic class sorting
- **React Compiler** requires `@vitejs/plugin-react` (Babel), not SWC
- **React Compiler** is experimental and requires React 19+

---

Questions? Check the `CONTEXT/` docs.
