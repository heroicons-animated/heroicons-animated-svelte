<script lang="ts">
  import type { HTMLAttributes } from "svelte/elements";
  import { cn, type WithElementRef } from "$lib-docs/utils.js";

  type Variant = "icon" | "default";

  let {
    ref = $bindable(null),
    variant = "default",
    class: className,
    children,
    ...restProps
  }: WithElementRef<
    HTMLAttributes<HTMLDivElement> & { variant?: Variant }
  > = $props();
</script>

<div
  bind:this={ref}
  data-slot="empty-media"
  class={cn(
    "flex shrink-0 items-center justify-center",
    variant === "icon" &&
      "size-12 rounded-full text-neutral-500 dark:text-neutral-400",
    className,
  )}
  {...restProps}
>
  {@render children?.()}
</div>
