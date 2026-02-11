<script lang="ts">
  import { page } from "$app/stores";
  import { HomeIcon } from "$lib";
  import {
    Root as EmptyRoot,
    Header as EmptyHeader,
    Title as EmptyTitle,
    Description as EmptyDescription,
    Content as EmptyContent,
    goHomeButtonClass,
  } from "$lib-docs/components/ui/empty";

  let { status, error }: { status?: number; error?: { message: string } } =
    $props();

  const statusCode = $derived(Number(status ?? $page.status ?? 500));
  const errorObj = $derived(error ?? $page.error ?? null);
  const message = $derived(
    (typeof errorObj === "object" && errorObj?.message) ||
      String(errorObj ?? "Something went wrong")
  );
  const isNotFound = $derived(statusCode === 404);

  $effect(() => {
    if (typeof document !== "undefined" && statusCode >= 400) {
      document.title = isNotFound ? "Not found" : `Error ${statusCode}`;
    }
  });
</script>

{#if isNotFound}
  <main
    class="view-container flex min-h-[calc(100vh-var(--header-height))] flex-col items-center justify-center border-neutral-200 px-4 py-16 xl:border-x dark:border-neutral-800"
    aria-label="Page not found"
  >
    <EmptyRoot variant="minimal">
      <EmptyHeader>
        <EmptyTitle class="font-mono text-8xl">404</EmptyTitle>
        <EmptyDescription>
          The page you're looking for might have been moved or doesn't exist.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent><a class={goHomeButtonClass} href="/">
        <HomeIcon size={14} animate={true} />
        Go Home
      </a></EmptyContent>
    </EmptyRoot>
  </main>
{:else}
  <main
    class="view-container flex min-h-[calc(100vh-var(--header-height))] flex-col items-center justify-center gap-4 border-neutral-200 px-4 py-20 xl:border-x dark:border-neutral-800"
    aria-live="assertive"
    role="alert"
  >
    <EmptyRoot variant="minimal">
      <EmptyHeader>
        <EmptyTitle class="font-mono text-8xl">Error {statusCode}</EmptyTitle>
        <EmptyDescription>{message}</EmptyDescription>
      </EmptyHeader>
      <EmptyContent><a class={goHomeButtonClass} href="/">
        <HomeIcon size={14} animate={true} />
        Go Home
      </a></EmptyContent>
    </EmptyRoot>
  </main>
{/if}
