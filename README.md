# @heroicons-animated/svelte

Beautifully animated [Heroicons](https://heroicons.com) for Svelte, built with CSS animations.

## Installation

```bash
npm install @heroicons-animated/svelte
# or
pnpm add @heroicons-animated/svelte
```

## Usage

```svelte
<script>
  import { Beaker } from '@heroicons-animated/svelte'
</script>

<Beaker size={28} color="currentColor" strokeWidth={1.5} class="size-6" />
```

### Props

| Prop          | Type    | Default        | Description                     |
| ------------- | ------- | -------------- | ------------------------------- |
| `size`        | number  | 28             | Icon size in pixels             |
| `color`       | string  | 'currentColor' | Stroke color (CSS color value)  |
| `strokeWidth` | number  | 1.5            | SVG stroke width                |
| `class`       | string  | —              | Optional additional CSS classes |
| `animate`     | boolean | false          | Controls icon animation state   |

### Tree-shakable Imports

Import individual icons to reduce bundle size:

```svelte
<script>
  import Beaker from '@heroicons-animated/svelte/beaker'
</script>
```

## Requirements

- Svelte 5.0+

## Documentation

Visit [heroicons-animated.com](https://www.heroicons-animated.com) for the full documentation and icon gallery.

## License

MIT
