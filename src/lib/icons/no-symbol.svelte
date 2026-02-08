<script lang="ts">
  import type { IconProps } from "./types.js";
  let {
    color = "currentColor",
    size = 28,
    strokeWidth = 1.5,
    animate = false,
    class: className = "",
    ...restProps
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
    }, 400);
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
  {...restProps}
  class={className}
  onmouseenter={handleMouseEnter}
  onmouseleave={handleMouseLeave}
  aria-label="no-symbol"
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
    <g class="nosymbol-circle" class:nosymbol-circle-animate={animate}>
      <path
        d="M18.364 18.364A9 9 0 0 0 5.636 5.636m12.728 12.728A9 9 0 0 1 5.636 5.636"
      />
    </g>
    <path
      d="M18.364 18.364L5.636 5.636"
      class="nosymbol-line"
      class:nosymbol-line-animate={animate}
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

  .nosymbol-circle {
    transform-box: fill-box;
    transform-origin: center;
  }

  .nosymbol-circle.nosymbol-circle-animate {
    animation: nosymbol-circle-pulse 0.4s ease-in-out forwards;
  }

  @keyframes nosymbol-circle-pulse {
    0%,
    100% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.1);
    }
  }

  .nosymbol-line {
    stroke-dasharray: 1;
    stroke-dashoffset: 0;
    opacity: 1;
  }

  .nosymbol-line.nosymbol-line-animate {
    animation: nosymbol-line-draw 0.3s ease-out forwards;
  }

  @keyframes nosymbol-line-draw {
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
