<script lang="ts">
  import { ICON_COMPONENTS } from "$lib/icon-components";

  const props = $props<{ name: string }>();
  const component = $derived(() => ICON_COMPONENTS[props.name]);
</script>

<article class="icon-card">
  <div class="icon-frame">
    {#if component}
      <svelte:component this={component} size={36} />
    {/if}
  </div>
  <div class="icon-name">{props.name}</div>
</article>
