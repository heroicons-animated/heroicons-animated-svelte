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

  let headPath: SVGPathElement;
  let linePath: SVGPathElement;
  let lineAnimation: Animation | null = null;

  function startAnimation(controlled = false) {
    if (!controlled) {
      if (animate) {
        return;
      }
      isInternal = true;
      animate = true;
    }

    // Animate line path morphing using Web Animations API
    if (linePath) {
      lineAnimation = linePath.animate(
        [{ d: "M12 21V3" }, { d: "M12 18V3" }, { d: "M12 21V3" }],
        {
          duration: 400,
          easing: "ease-in-out",
          fill: "forwards",
        }
      );
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

    if (lineAnimation) {
      lineAnimation.cancel();
      lineAnimation = null;
    }

    if (linePath) {
      linePath.setAttribute("d", "M12 21V3");
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
  aria-label="arrow-long-down"
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
      bind:this={headPath}
      class="head-path"
      class:animate={animate}
      d="M15.75 17.25 12 21m0 0-3.75-3.75"
    />
    <path bind:this={linePath} d="M12 21V3" />
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

  .head-path {
    transform-box: fill-box;
    transform-origin: center;
    transition: transform 0.4s ease-in-out;
  }

  .head-path.animate {
    animation: head-translate 0.4s ease-in-out forwards;
  }

  @keyframes head-translate {
    0% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-3px);
    }
    100% {
      transform: translateY(0);
    }
  }
</style>
