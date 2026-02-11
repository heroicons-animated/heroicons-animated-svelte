<script lang="ts">
  import type { HTMLAttributes } from "svelte/elements";
  import { cn, type WithElementRef } from "$lib-docs/utils.js";

  let {
    ref = $bindable(null),
    class: className,
    children,
    ...restProps
  }: WithElementRef<HTMLAttributes<HTMLParagraphElement>> = $props();
</script>

<p
  bind:this={ref}
  data-slot="empty-description"
  class={cn(
    "text-sm text-balance text-[#3F3F47] leading-relaxed dark:text-neutral-400 [&>a:hover]:text-primary [&>a]:underline [&>a]:underline-offset-4",
    className,
  )}
  {...restProps}
>
  {@render children?.()}
</p>
