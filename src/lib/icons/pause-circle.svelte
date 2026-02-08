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
  {...restProps}
  class={className}
  onmouseenter={handleMouseEnter}
  onmouseleave={handleMouseLeave}
  aria-label="pause-circle"
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
      d="M9.75 9v6"
      class="pausecircle-left"
      class:pausecircle-left-animate={animate}
    />
    <path
      d="M14.25 9v6"
      class="pausecircle-right"
      class:pausecircle-right-animate={animate}
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

  .pausecircle-left,
  .pausecircle-right {
    transform-box: fill-box;
    transform-origin: center;
  }

  .pausecircle-left.pausecircle-left-animate {
    animation: pausecircle-left-bounce 0.5s ease-in-out forwards;
  }

  .pausecircle-right.pausecircle-right-animate {
    animation: pausecircle-right-bounce 0.5s ease-in-out forwards;
  }

  @keyframes pausecircle-left-bounce {
    0% {
      transform: translateY(0);
    }
    20% {
      transform: translateY(2px);
    }
    50%,
    100% {
      transform: translateY(0);
    }
  }

  @keyframes pausecircle-right-bounce {
    0%,
    20% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(2px);
    }
    100% {
      transform: translateY(0);
    }
  }
</style>
