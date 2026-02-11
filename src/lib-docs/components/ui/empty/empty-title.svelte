<script lang="ts">
  import type { HTMLAttributes } from "svelte/elements";
  import { cn, type WithElementRef } from "$lib-docs/utils.js";

  let {
    ref = $bindable(null),
    class: className,
    children,
    ...restProps
  }: WithElementRef<HTMLAttributes<HTMLHeadingElement>> = $props();
</script>

<h3
  bind:this={ref}
  data-slot="empty-title"
  class={cn("font-medium text-lg tracking-tight text-foreground", className)}
  {...restProps}
>
  {@render children?.()}
</h3>
