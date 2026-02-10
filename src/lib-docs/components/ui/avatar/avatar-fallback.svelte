<script lang="ts">
  import { Avatar as AvatarPrimitive } from "bits-ui";
  import { cn } from "$lib-docs/utils.js";

  let {
    ref = $bindable(null),
    class: className,
    ...restProps
  }: AvatarPrimitive.FallbackProps = $props();
</script>

<AvatarPrimitive.Fallback
  bind:ref
  data-slot="avatar-fallback"
  class={cn("bg-neutral-200 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-200 flex size-full items-center justify-center rounded-full", className)}
  {...restProps}
/>
