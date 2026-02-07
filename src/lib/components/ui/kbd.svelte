<script lang="ts">
  import type { HTMLAttributes } from "svelte/elements";
  import type { Snippet } from "svelte";
  import { cn } from "$lib/utils.js";

  let {
    class: className,
    children,
    ...restProps
  }: HTMLAttributes<HTMLElement> & { children?: Snippet } = $props();
</script>

<kbd
  data-slot="kbd"
  class={cn(
    "pointer-events-none inline-flex h-5 w-fit min-w-5 select-none items-center justify-center gap-1 rounded-sm bg-muted px-1 font-medium font-sans text-neutral-400 text-xs dark:text-neutral-500",
    className
  )}
  {...restProps}
>
  {@render children?.()}
</kbd>
