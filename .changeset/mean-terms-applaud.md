---
"@heroicons-animated/svelte": patch
---

Fix package subpath export resolution for deep icon imports in Vite/SvelteKit by
adding `import` and `default` conditions to package `exports`.

This ensures imports like `@heroicons-animated/svelte/beaker` resolve
consistently across tooling.
