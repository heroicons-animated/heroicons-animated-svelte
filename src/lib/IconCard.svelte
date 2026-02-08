<script lang="ts">
  import { ICON_COMPONENTS } from "$lib/icon-components";

  const props = $props<{ name: string }>();
  const Component = $derived(ICON_COMPONENTS[props.name]);
</script>

<article class="icon-card">
  <div class="icon-frame">
    {#if Component}
      <Component size={36} />
    {/if}
  </div>
  <div class="icon-name">{props.name}</div>
</article>
