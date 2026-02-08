<script lang="ts">
  import "../app.css";
  import Header from "$lib/components/header.svelte";
  import { NuqsAdapter } from "nuqs-svelte/adapters/svelte-kit";
  import { SvelteTheme } from "svelte-themes";

  let { data, children } = $props();
</script>

<svelte:head>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="">
  <link
    rel="stylesheet"
    href="https://fonts.googleapis.com/css2?family=Geist:wght@100..900&family=Geist+Mono:wght@100..900&display=swap"
  >
</svelte:head>

<SvelteTheme attribute="class">
  <NuqsAdapter>
    <div class="root relative bg-background antialiased">
      <Header stars={data.githubStars} />
      {@render children()}
    </div>
  </NuqsAdapter>
</SvelteTheme>
