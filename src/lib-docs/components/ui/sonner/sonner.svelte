<script lang="ts">
  import { XMarkIcon, ExclamationTriangleIcon } from "$lib";

  import {
    Toaster as Sonner,
    type ToasterProps as SonnerProps,
  } from "svelte-sonner";
  import { mode } from "mode-watcher";

  let { ...restProps }: SonnerProps = $props();
</script>

<Sonner
  theme={mode.current}
  class="toaster group"
  toastOptions={{
    classes: {
      toast:
        "!bg-white !px-4 !py-4 !flex-wrap dark:!bg-black !gap-0 !border-neutral-900/5 dark:!border-neutral-100/10 supports-[corner-shape:squircle]:!corner-squircle supports-[corner-shape:squircle]:!rounded-[30px] !rounded-[14px]",
      title: "font-sans text-black dark:!text-white",
      icon: "translate-y-[-9.5px]",
      actionButton:
        "!mt-2 w-full flex items-center justify-center !font-sans !bg-primary focus-visible:outline-primary cursor-pointer !h-8 !text-[14px] transition-colors duration-100 hover:!bg-[color-mix(in_oklab,var(--color-primary),black_10%)] focus-visible:outline-1 focus-visible:outline-offset-1 supports-[corner-shape:squircle]:!corner-squircle supports-[corner-shape:squircle]:!rounded-[30px] !rounded-[14px]",
      description: "font-sans text-secondary dark:!text-secondary",
    },
  }}
  {...restProps}
>
  {#snippet errorIcon()}
    <XMarkIcon class="size-4 text-red-600 dark:text-red-400" />
  {/snippet}
  {#snippet warningIcon()}
    <ExclamationTriangleIcon
      class="size-4 text-yellow-500 dark:text-yellow-400"
    />
  {/snippet}
</Sonner>
