<script lang="ts">
  import type { IconProps } from "./types.js";
  let {
    color = "currentColor",
    size = 28,
    strokeWidth = 1.5,
    animate = false,
    class: className = "",
  }: IconProps = $props();

  let isHovered = $state(false);
  let shouldAnimate = $derived(animate || isHovered);

  let headPath: SVGPathElement;
  let linePath: SVGPathElement;
  let lineAnimation: Animation | null = null;

  function startAnimation() {
    // Animate line path morphing using Web Animations API
    if (linePath) {
      lineAnimation = linePath.animate(
        [{ d: "M3 12h18" }, { d: "M6 12h15" }, { d: "M3 12h18" }],
        {
          duration: 400,
          easing: "ease-in-out",
          fill: "forwards",
        }
      );
    }
  }

  function stopAnimation() {
    if (lineAnimation) {
      lineAnimation.cancel();
      lineAnimation = null;
    }

    if (linePath) {
      linePath.setAttribute("d", "M3 12h18");
    }
  }
  $effect(() => {
    if (shouldAnimate) {
      startAnimation();
    } else {
      stopAnimation();
    }
  });

  function handleMouseEnter() {
    isHovered = true;
  }

  function handleMouseLeave() {
    isHovered = false;
  }
</script>

<div
  class={className}
  onmouseenter={handleMouseEnter}
  onmouseleave={handleMouseLeave}
  aria-label="arrow-long-left"
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
      class:animate={shouldAnimate}
      d="M6.75 15.75 3 12m0 0 3.75-3.75"
    />
    <path bind:this={linePath} d="M3 12h18" />
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
      transform: translateX(0);
    }
    50% {
      transform: translateX(3px);
    }
    100% {
      transform: translateX(0);
    }
  }
</style>
