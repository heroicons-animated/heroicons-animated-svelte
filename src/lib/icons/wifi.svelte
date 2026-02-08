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
    }, 1000);
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
  aria-label="wifi"
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
    <path d="M12.53 18.22l-.53.53-.53-.53a.75.75 0 0 1 1.06 0" />
    <path
      d="M8.288 15.038a5.25 5.25 0 0 1 7.424 0"
      class="wifi-arc"
      class:wifi-pulse={animate}
    />
    <path
      d="M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0"
      class="wifi-arc wifi-arc-2"
      class:wifi-pulse={animate}
    />
    <path
      d="M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0"
      class="wifi-arc wifi-arc-3"
      class:wifi-pulse={animate}
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

  .wifi-arc {
    opacity: 1;
    transform: scale(1);
  }

  .wifi-arc.wifi-pulse {
    animation: wifi-pulse 0.6s ease-in-out forwards;
  }

  .wifi-arc-2.wifi-pulse {
    animation-delay: 0.2s;
  }

  .wifi-arc-3.wifi-pulse {
    animation-delay: 0.4s;
  }

  @keyframes wifi-pulse {
    0% {
      opacity: 1;
      transform: scale(1);
    }
    33.3% {
      opacity: 0;
      transform: scale(0);
    }
    66.6% {
      opacity: 0;
      transform: scale(0);
    }
    100% {
      opacity: 1;
      transform: scale(1);
    }
  }
</style>
