# React Compiler Setup

> ⚠️ Experimental — React 19+ only

## Install

```bash
pnpm add -D babel-plugin-react-compiler
```

## Configure

Update `vite.config.ts`:

```ts
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react({ babel: { plugins: ["babel-plugin-react-compiler"] } })],
});
```

> **Note:** Requires `@vitejs/plugin-react` (Babel). If using `@vitejs/plugin-react-swc`, replace it.

## Validate

Run `pnpm build` and check for compiler output. Components that can't be optimized will show warnings.

## Opt Out

Per-component:

```tsx
function MyComponent() {
  "use no memo";
  return <div>...</div>;
}
```
