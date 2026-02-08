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
    }, 500);
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
  aria-label="power"
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
    <path
      d="M5.636 5.636a9 9 0 1 0 12.728 0"
      class="power-circle"
      class:power-circle-animate={animate}
    />
    <path d="M12 3v9" class="power-line" class:power-line-animate={animate} />
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

  .power-circle {
    transform-box: fill-box;
    transform-origin: center center;
  }

  .power-circle.power-circle-animate {
    animation: power-circle-pulse 0.5s ease-in-out forwards;
  }

  @keyframes power-circle-pulse {
    0% {
      opacity: 0.5;
      transform: scale(1);
    }
    33% {
      opacity: 1;
      transform: scale(1.05);
    }
    66% {
      opacity: 0.5;
      transform: scale(1);
    }
    100% {
      opacity: 1;
      transform: scale(1);
    }
  }

  .power-line {
    transform-box: fill-box;
    transform-origin: center;
  }

  .power-line.power-line-animate {
    animation: power-line-bounce 0.3s ease-in-out forwards;
  }

  @keyframes power-line-bounce {
    0%,
    100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-2px);
    }
  }
</style>
