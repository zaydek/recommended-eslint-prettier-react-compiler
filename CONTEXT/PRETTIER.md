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
  "objectWrap": "preserve",
  "plugins": ["prettier-plugin-tailwindcss"]
}
```

## About `objectWrap`

Prettier 3.5 introduced the [`objectWrap`](https://prettier.io/blog/2025/02/09/3.5.0) option, which controls how multi-line object literals are formatted.

- **`preserve`** (default) — Keeps objects multi-line if they were written that way, even if they could fit on one line. This is semi-manual formatting.
- **`collapse`** — Ignores existing whitespace and deterministically formats objects based purely on line length.

### Which should you use?

| Scenario | Recommendation |
| :------- | :------------- |
| **New codebase** | Use `"objectWrap": "collapse"` for fully deterministic formatting |
| **Existing codebase** | Use `"objectWrap": "preserve"` to avoid massive diffs |

**Why we default to `preserve`:** While `collapse` is ideal for deterministic formatting, it can be too destructive in existing codebases—reformatting every object literal across hundreds of files. Start with `preserve`, then consider switching to `collapse` once your team is ready for the churn.

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
