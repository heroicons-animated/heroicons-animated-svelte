<script lang="ts">
  import ArrowTopRightOnSquare from "$lib/icons/arrow-top-right-on-square.svelte";
  import {
    Avatar,
    AvatarFallback,
    AvatarImage,
  } from "$lib/components/ui/avatar";
  let arrowRef: any;
</script>

<div
  class="relative my-[40px] flex w-full max-w-[610px] flex-col items-center justify-center pl-4 after:absolute after:left-0 after:h-full after:w-[4px] after:bg-neutral-400/50 max-[655px]:px-4 max-[655px]:after:left-4"
>
  <blockquote
    class="font-sans text-neutral-700 text-sm/[150%] tracking-[0.01em] before:content-[open-quote] after:content-[close-quote] max-[655px]:pl-4 dark:text-neutral-200"
  >
    these icons were heavily inspired from the work of
    <a
      class="inline-block underline underline-offset-3 transition-[decoration-color,color] duration-100 focus-within:outline-offset-0 hover:text-primary hover:decoration-primary focus-visible:text-primary focus-visible:outline-1 focus-visible:outline-primary"
      href="https://lucide-animated.com/"
      rel="noopener external"
      tabindex="0"
      target="_blank"
    >
      lucide-animated by dmytro
    </a>
    and what i learned from the
    <a
      class="inline-block underline underline-offset-3 transition-[decoration-color,color] duration-100 focus-within:outline-offset-0 hover:text-primary hover:decoration-primary focus-visible:text-primary focus-visible:outline-1 focus-visible:outline-primary"
      href="https://animations.dev/"
      rel="noopener external"
      tabindex="0"
      target="_blank"
    >
      animations.dev
    </a>
    course.
  </blockquote>
  <div
    class="mt-4 flex w-full flex-wrap items-center justify-between gap-4 border-neutral-200 border-t pt-4 max-[655px]:pl-4 dark:border-neutral-800"
  >
    <div class="flex items-center gap-2">
      <Avatar class="size-8">
        <AvatarImage
          alt="Aniket Pawar, the author of the heroicons-animated"
          class="select-none object-cover"
          src="/aniket.jpg"
        />
        <AvatarFallback
          class="bg-neutral-200 font-sans text-neutral-700 dark:bg-neutral-800 dark:text-neutral-200"
        >
          AP
        </AvatarFallback>
      </Avatar>
      <p
        class="text-[13px] text-neutral-600 tracking-[0.01em] dark:text-neutral-400"
      >
        <a
          class="inline-block underline underline-offset-3 transition-[decoration-color,color] duration-100 focus-within:outline-offset-0 hover:text-primary hover:decoration-primary focus-visible:text-primary focus-visible:outline-1 focus-visible:outline-primary"
          href="https://aniketpawar.com/"
          rel="noopener external"
          tabindex="0"
          target="_blank"
        >
          aniket
        </a>
        , creator of heroicons-animated
      </p>
    </div>
    <a
      href="https://animations.dev/"
      rel="noopener external"
      tabindex="0"
      target="_blank"
      class="supports-[corner-shape:squircle]:corner-squircle flex w-fit cursor-pointer items-center justify-center gap-1 rounded-[8px] bg-primary px-[12px] py-[4px] font-sans text-sm text-white transition-[background-color] duration-100 hover:bg-[color-mix(in_oklab,var(--color-primary),black_10%)] focus-visible:outline-1 focus-visible:outline-primary focus-visible:outline-offset-1 supports-[corner-shape:squircle]:rounded-[12px] max-[445px]:w-full"
      onmouseenter={() => arrowRef?.startAnimation?.()}
      onmouseleave={() => arrowRef?.stopAnimation?.()}
    >
      Take the course
      <ArrowTopRightOnSquare bind:this={arrowRef} size={14} />
    </a>
  </div>
</div>
