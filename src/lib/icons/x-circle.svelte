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

  function startAnimation(controlled = false) {
    if (!controlled) {
      if (animate) {
        return;
      }
      isInternal = true;
      animate = true;
    }

    setTimeout(() => {
      if (!controlled) {
        isInternal = true;
        animate = false;
      }
    }, 600);
  }

  function stopAnimation(controlled = false) {
    if (!controlled) {
      isInternal = true;
      animate = false;
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
  aria-label="x-circle"
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
    <path d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
    <path
      d="m9.75 9.75 4.5 4.5"
      class="xcircle-line"
      class:xcircle-draw={animate}
    />
    <path
      d="m14.25 9.75-4.5 4.5"
      class="xcircle-line xcircle-line-2"
      class:xcircle-draw={animate}
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

  .xcircle-line {
    stroke-dasharray: 1;
    stroke-dashoffset: 0;
    opacity: 1;
  }

  .xcircle-line.xcircle-draw {
    animation: xcircle-draw 0.4s ease-out forwards;
  }

  .xcircle-line-2.xcircle-draw {
    animation-delay: 0.2s;
  }

  @keyframes xcircle-draw {
    0% {
      stroke-dashoffset: 1;
      opacity: 0;
    }
    100% {
      stroke-dashoffset: 0;
      opacity: 1;
    }
  }
</style>
