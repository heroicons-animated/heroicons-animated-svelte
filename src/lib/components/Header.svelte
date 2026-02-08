<script lang="ts">
  import Logo from "$lib/components/Logo.svelte";
  import ThemeToggle from "$lib/components/ThemeToggle.svelte";
  import GithubStarsButton from "$lib/components/GithubStarsButton.svelte";
  import { LINK } from "$lib/constants";

  let { stars = null } = $props<{ stars?: number | null }>();
</script>

<header
  class="h-(--header-height) border-neutral-200 xl:border-b dark:border-neutral-800"
>
  <div
    class="view-container flex h-full w-full justify-between gap-4 border-neutral-200 xl:border-x dark:border-neutral-800"
  >
    <a
      aria-label="Heroicons Animated - Home"
      class="mr-auto flex items-center gap-2 font-sans text-base focus-within:outline-offset-4 focus-visible:outline-1 focus-visible:outline-primary max-[524px]:translate-y-[-2px] min-[395px]:text-xl"
      href="/"
      tabindex="0"
    >
      <Logo class="w-6 text-primary min-[395px]:w-8" />
      <span class="relative inline-flex flex-col">
        <span>heroicons-animated</span>
        <span
          class="absolute -bottom-[14px] right-0 flex items-center gap-1 font-mono text-[10px] text-secondary"
        >
          - for
          <svg
            aria-hidden="true"
            class="h-3.5 w-3.5"
            preserveAspectRatio="xMidYMid"
            viewBox="0 0 256 308"
          >
            <path
              d="M239.682 40.707C211.113-.182 154.69-12.301 113.895 13.69L42.247 59.356a82.198 82.198 0 0 0-37.135 55.056 86.566 86.566 0 0 0 8.536 55.576 82.425 82.425 0 0 0-12.296 30.719 87.596 87.596 0 0 0 14.964 66.244c28.574 40.893 84.997 53.007 125.787 27.016l71.648-45.664a82.182 82.182 0 0 0 37.135-55.057 86.601 86.601 0 0 0-8.53-55.577 82.409 82.409 0 0 0 12.29-30.718 87.573 87.573 0 0 0-14.963-66.244"
              fill="#FF3E00"
            />
            <path
              d="M106.889 270.841c-23.102 6.007-47.497-3.036-61.103-22.648a52.685 52.685 0 0 1-9.003-39.85 49.978 49.978 0 0 1 1.713-6.693l1.35-4.115 3.671 2.697a92.447 92.447 0 0 0 28.036 14.007l2.663.808-.245 2.659a16.067 16.067 0 0 0 2.89 10.656 17.143 17.143 0 0 0 18.397 6.828 15.786 15.786 0 0 0 4.403-1.935l71.67-45.672a14.922 14.922 0 0 0 6.734-9.977 15.923 15.923 0 0 0-2.713-12.011 17.156 17.156 0 0 0-18.404-6.832 15.78 15.78 0 0 0-4.396 1.933l-27.35 17.434a52.298 52.298 0 0 1-14.553 6.391c-23.101 6.007-47.497-3.036-61.101-22.649a52.681 52.681 0 0 1-9.004-39.849 49.428 49.428 0 0 1 22.34-33.114l71.664-45.677a52.218 52.218 0 0 1 14.563-6.398c23.101-6.007 47.497 3.036 61.101 22.648a52.685 52.685 0 0 1 9.004 39.85 50.559 50.559 0 0 1-1.713 6.692l-1.35 4.116-3.67-2.693a92.373 92.373 0 0 0-28.037-14.013l-2.664-.809.246-2.658a16.099 16.099 0 0 0-2.89-10.656 17.143 17.143 0 0 0-18.398-6.828 15.786 15.786 0 0 0-4.402 1.935l-71.67 45.674a14.898 14.898 0 0 0-6.73 9.975 15.9 15.9 0 0 0 2.709 12.012 17.156 17.156 0 0 0 18.404 6.832 15.841 15.841 0 0 0 4.402-1.935l27.345-17.427a52.147 52.147 0 0 1 14.552-6.397c23.101-6.006 47.497 3.037 61.102 22.65a52.681 52.681 0 0 1 9.003 39.848 49.453 49.453 0 0 1-22.34 33.12l-71.664 45.673a52.218 52.218 0 0 1-14.563 6.398"
              fill="#FFF"
            />
          </svg>
        </span>
      </span>
    </a>
    <div
      class="ml-auto flex w-full flex-1 flex-wrap-reverse items-center justify-end gap-2"
    >
      <a
        aria-label="Sponsor Project"
        class="group supports-[corner-shape:squircle]:corner-squircle flex size-9 items-center justify-center gap-1 rounded-[14px] bg-white font-sans text-[#3F3F47] text-sm underline-offset-4 focus-within:outline-offset-2 hover:underline focus-visible:outline-1 focus-visible:outline-primary supports-[corner-shape:squircle]:rounded-[20px] sm:size-auto sm:bg-transparent sm:pr-1 dark:bg-white/10 dark:text-[#FAFAFA] sm:dark:bg-transparent"
        href={LINK.SPONSOR}
        tabindex="0"
        target="_blank"
        rel="noopener noreferrer"
      >
        <svg
          aria-hidden="true"
          class="text-primary transition-transform duration-300 group-hover:scale-110"
          fill="currentColor"
          height="16"
          viewBox="0 0 24 24"
          width="16"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z"
          />
        </svg>
        <span class="hidden sm:inline">Sponsor Project</span>
      </a>
      <ThemeToggle />
      <GithubStarsButton stars={stars} />
    </div>
  </div>
</header>
