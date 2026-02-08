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
    }, 800);
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
  aria-label="face-frown"
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
    class="icon-svg facefrown-svg"
    class:facefrown-svg-animate={animate}
  >
    <circle cx="12" cy="12" r="9" />
    <path
      d="M15.1823 16.3179C14.3075 15.4432 13.1623 15.0038 12.0158 14.9999C10.859 14.996 9.70095 15.4353 8.81834 16.3179"
      class="facefrown-mouth"
      class:facefrown-mouth-animate={animate}
    />
    <path
      d="M9.75 9.75C9.75 10.1642 9.58211 10.5 9.375 10.5C9.16789 10.5 9 10.1642 9 9.75C9 9.33579 9.16789 9 9.375 9C9.58211 9 9.75 9.33579 9.75 9.75Z"
      class="facefrown-eye facefrown-eye-left"
      class:facefrown-eye-animate={animate}
    />
    <path
      d="M15 9.75C15 10.1642 14.8321 10.5 14.625 10.5C14.4179 10.5 14.25 10.1642 14.25 9.75C14.25 9.33579 14.4179 9 14.625 9C14.8321 9 15 9.33579 15 9.75Z"
      class="facefrown-eye facefrown-eye-right"
      class:facefrown-eye-animate={animate}
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

  /* Match React: svg scale [1,1.15,1.05,1.08] rotate [0,-2,2,0] 0.8s times 0/0.3/0.6/1 */
  .facefrown-svg.facefrown-svg-animate {
    animation: facefrown-svg-bounce 0.8s ease-in-out forwards;
  }
  @keyframes facefrown-svg-bounce {
    0% {
      transform: scale(1) rotate(0deg);
    }
    30% {
      transform: scale(1.15) rotate(-2deg);
    }
    60% {
      transform: scale(1.05) rotate(2deg);
    }
    100% {
      transform: scale(1.08) rotate(0deg);
    }
  }

  /* Mouth: pathLength [0.3,1,1] 0.5s delay 0.1 (d morph not in CSS, pathLength only) */
  .facefrown-mouth {
    stroke-dasharray: 1;
  }
  .facefrown-mouth.facefrown-mouth-animate {
    animation: facefrown-mouth-draw 0.5s ease-in-out 0.1s forwards;
  }
  @keyframes facefrown-mouth-draw {
    0% {
      stroke-dashoffset: 0.7;
    }
    50% {
      stroke-dashoffset: 0;
    }
    100% {
      stroke-dashoffset: 0;
    }
  }

  /* Left eye: scale [1,1.3,0.9,1.1] y [0,-0.5,0.3,0] 0.6s */
  .facefrown-eye-left.facefrown-eye-animate {
    animation: facefrown-eye-left-bounce 0.6s ease-in-out forwards;
  }
  @keyframes facefrown-eye-left-bounce {
    0% {
      transform: scale(1) translateY(0);
    }
    30% {
      transform: scale(1.3) translateY(-0.5px);
    }
    60% {
      transform: scale(0.9) translateY(0.3px);
    }
    100% {
      transform: scale(1.1) translateY(0);
    }
  }
  /* Right eye: scale [1,0.9,1.3,1.1] y [0,-0.5,0.3,0] 0.6s */
  .facefrown-eye-right.facefrown-eye-animate {
    animation: facefrown-eye-right-bounce 0.6s ease-in-out forwards;
  }
  @keyframes facefrown-eye-right-bounce {
    0% {
      transform: scale(1) translateY(0);
    }
    30% {
      transform: scale(0.9) translateY(-0.5px);
    }
    60% {
      transform: scale(1.3) translateY(0.3px);
    }
    100% {
      transform: scale(1.1) translateY(0);
    }
  }
</style>
