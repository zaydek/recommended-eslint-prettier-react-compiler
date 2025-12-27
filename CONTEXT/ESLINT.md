# ESLint Setup

## Install

```bash
pnpm add -D @eslint/js eslint eslint-config-prettier eslint-plugin-prettier \
  eslint-plugin-react-hooks eslint-plugin-react-refresh \
  eslint-plugin-require-explicit-generics globals typescript-eslint
```

## Configure

Copy `eslint.config.js` from this repository. It uses flat config with composable layers:

- `baseConfig` — Core rules (JS, TypeScript, React Hooks, React Refresh)
- `prettierLayer` — Prettier integration
- `explicitReturnTypesLayer` — Return types on function declarations
- `requireExplicitGenericsLayer` — Explicit generics on hooks
- `noDefaultExportsLayer` — Named exports only

Comment out any layer to disable it.

## Scripts

```json
{
  "scripts": {
    "lint": "eslint .",
    "lint:fix": "eslint . --fix"
  }
}
```

## Monorepo

Place config in monorepo root. Update `globalIgnores` to exclude non-frontend directories.
