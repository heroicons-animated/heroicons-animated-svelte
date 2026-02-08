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

  let line1: SVGLineElement;
  let line2: SVGLineElement;
  let circle1: SVGCircleElement;
  let line3: SVGLineElement;
  let line4: SVGLineElement;
  let circle2: SVGCircleElement;
  let line5: SVGLineElement;
  let line6: SVGLineElement;
  let circle3: SVGCircleElement;

  const defaultOptions = {
    duration: 300,
    easing: "cubic-bezier(0.68, -0.55, 0.265, 1.55)", // Approximate spring
  };

  function startAnimation(controlled = false) {
    if (!controlled) {
      if (animate) {
        return;
      }
      isInternal = true;
      animate = true;
    }

    // Column 1
    line1?.animate([{ y2: 13.5 }, { y2: 10.5 }], defaultOptions);
    line2?.animate([{ y1: 16.5 }, { y1: 13.5 }], defaultOptions);
    circle1?.animate([{ cy: 15 }, { cy: 12 }], defaultOptions);

    // Column 2
    line3?.animate([{ y2: 7.5 }, { y2: 10.5 }], defaultOptions);
    line4?.animate([{ y1: 10.5 }, { y1: 13.5 }], defaultOptions);
    circle2?.animate([{ cy: 9 }, { cy: 12 }], defaultOptions);

    // Column 3
    line5?.animate([{ y2: 13.5 }, { y2: 10.5 }], defaultOptions);
    line6?.animate([{ y1: 16.5 }, { y1: 13.5 }], defaultOptions);
    circle3?.animate([{ cy: 15 }, { cy: 12 }], defaultOptions);

    setTimeout(() => {
      if (!controlled) {
        isInternal = true;
        animate = false;
      }
    }, 300);
  }

  function stopAnimation(controlled = false) {
    if (!controlled) {
      isInternal = true;
      animate = false;
    }

    // Column 1
    line1?.animate([{ y2: 10.5 }, { y2: 13.5 }], defaultOptions);
    line2?.animate([{ y1: 13.5 }, { y1: 16.5 }], defaultOptions);
    circle1?.animate([{ cy: 12 }, { cy: 15 }], defaultOptions);

    // Column 2
    line3?.animate([{ y2: 10.5 }, { y2: 7.5 }], defaultOptions);
    line4?.animate([{ y1: 13.5 }, { y1: 10.5 }], defaultOptions);
    circle2?.animate([{ cy: 12 }, { cy: 9 }], defaultOptions);

    // Column 3
    line5?.animate([{ y2: 10.5 }, { y2: 13.5 }], defaultOptions);
    line6?.animate([{ y1: 13.5 }, { y1: 16.5 }], defaultOptions);
    circle3?.animate([{ cy: 12 }, { cy: 15 }], defaultOptions);
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
  aria-label="adjustments-vertical"
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
    <line bind:this={line1} x1="6" x2="6" y1="3.75" y2="13.5" />
    <line bind:this={line2} x1="6" x2="6" y1="16.5" y2="20.25" />
    <circle bind:this={circle1} cx="6" cy="15" fill="none" r="1.5" />

    <line bind:this={line3} x1="12" x2="12" y1="3.75" y2="7.5" />
    <line bind:this={line4} x1="12" x2="12" y1="10.5" y2="20.25" />
    <circle bind:this={circle2} cx="12" cy="9" fill="none" r="1.5" />

    <line bind:this={line5} x1="18" x2="18" y1="3.75" y2="13.5" />
    <line bind:this={line6} x1="18" x2="18" y1="16.5" y2="20.25" />
    <circle bind:this={circle3} cx="18" cy="15" fill="none" r="1.5" />
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
