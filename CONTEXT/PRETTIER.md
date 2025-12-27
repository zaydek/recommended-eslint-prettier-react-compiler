# Prettier Setup

## Install

```bash
pnpm add -D prettier prettier-plugin-tailwindcss
```

Remove `prettier-plugin-tailwindcss` if not using Tailwind.

## Configure

Create `.prettierrc`:

```json
{
  "plugins": ["prettier-plugin-tailwindcss"]
}
```

Create `.prettierignore`:

```
node_modules/
dist/
pnpm-lock.yaml
```

## Scripts

```json
{
  "scripts": {
    "format": "prettier --write \"src/**/*.{ts,tsx,js,json,css}\"",
    "format:check": "prettier --check \"src/**/*.{ts,tsx,js,json,css}\""
  }
}
```

## VS Code

Create `.vscode/settings.json`:

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode"
}
```
