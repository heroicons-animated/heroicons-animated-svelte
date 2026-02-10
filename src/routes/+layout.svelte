<script lang="ts">
  import "../app.css";
  import Header from "$lib-docs/components/header.svelte";
  import { Toaster } from "$lib-docs/components/ui/sonner";
  import { ModeWatcher } from "mode-watcher";
  import { NuqsAdapter } from "nuqs-svelte/adapters/svelte-kit";
  import { GeistSans } from "geist-svelte/font/sans";
  import { GeistMono } from "geist-svelte/font/mono";
  import { GeistPixelSquare } from "geist-svelte/font/pixel";

  let { children } = $props();
</script>

<ModeWatcher />

<Toaster position="top-center" />

<NuqsAdapter>
  <div class="root relative bg-background antialiased">
    <Header />
    {@render children()}
  </div>
</NuqsAdapter>
