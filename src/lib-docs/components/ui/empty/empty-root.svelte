<script lang="ts">
  import type { HTMLAttributes } from "svelte/elements";
  import { cn, type WithElementRef } from "$lib-docs/utils.js";

  type Variant = "default" | "minimal";

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
  data-slot="empty-root"
  data-variant={variant}
  class={cn(
    "flex min-w-0 flex-1 flex-col items-center justify-center gap-6 rounded-lg border-dashed p-6 text-center text-balance md:p-12",
    variant === "default" &&
      "border-neutral-200 dark:border-neutral-800 max-w-sm w-full",
    variant === "minimal" && "border-0 p-0",
    className,
  )}
  {...restProps}
>
  {@render children?.()}
</div>
