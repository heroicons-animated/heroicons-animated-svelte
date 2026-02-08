<script lang="ts">
  import type { IconProps } from "./types.js";
  let {
    color = "currentColor",
    size = 28,
    strokeWidth = 1.5,
    animate = false,
    class: className = "",
  }: IconProps = $props();

  let isInternal = $state(false);

  const clipId = `battery-clip-${Math.random().toString(36).substr(2, 9)}`;

  let clipRect: SVGRectElement;
  let clipAnimation: Animation | null = null;

  function startAnimation(controlled = false) {
    if (!controlled) {
      if (animate) {
        return;
      }
      isInternal = true;
      animate = true;
    }

    if (clipRect) {
      clipAnimation = clipRect.animate([{ width: 0 }, { width: 13.5 }], {
        duration: 500,
        easing: "ease-out",
        fill: "forwards",
      });
    }

    setTimeout(() => {
      if (!controlled) {
        isInternal = true;
        animate = false;
      }
    }, 500);
  }

  function stopAnimation(controlled = false) {
    if (!controlled) {
      isInternal = true;
      animate = false;
    }

    if (clipAnimation) {
      clipAnimation.cancel();
      clipAnimation = null;
    }

    if (clipRect) {
      clipRect.setAttribute("width", "0");
    }
  }
  $effect(() => {
    if (isInternal) {
      isInternal = false;
      return;
    }

    if (animate) {
      startAnimation(true);
    } else {
      stopAnimation(true);
    }
  });

  function handleMouseEnter() {
    startAnimation();
  }

  function handleMouseLeave() {
    stopAnimation();
  }
</script>

<div
  class={className}
  onmouseenter={handleMouseEnter}
  onmouseleave={handleMouseLeave}
  aria-label="battery-100"
  role="img"
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    stroke-width={strokeWidth}
    stroke-linecap="round"
    stroke-linejoin="round"
    class="icon-svg"
  >
    <defs>
      <clipPath id={clipId}>
        <rect bind:this={clipRect} height="4.5" x="4.5" y="10.5" width="0" />
      </clipPath>
    </defs>
    <path
      d="M21 10.5h.375c.621 0 1.125.504 1.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125H21"
    />
    <path
      d="M3.75 18h15A2.25 2.25 0 0 0 21 15.75v-6a2.25 2.25 0 0 0-2.25-2.25h-15A2.25 2.25 0 0 0 1.5 9.75v6A2.25 2.25 0 0 0 3.75 18Z"
    />
    <path d="M4.5 10.5H18V15H4.5v-4.5Z" />
    <path
      clip-path={`url(#${clipId})`}
      d="M4.5 10.5H18V15H4.5v-4.5Z"
      fill={color}
      stroke="none"
    />
  </svg>
</div>

<style>
  div {
    display: inline-block;
  }

  .icon-svg {
    transform-box: fill-box;
    transform-origin: center;
  }
</style>
