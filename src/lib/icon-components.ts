import type { ComponentType } from "svelte";

const modules = import.meta.glob("./icons/*.svelte", {
  eager: true,
});

const components: Record<string, ComponentType> = {};

for (const [path, mod] of Object.entries(modules)) {
  const name = path.split("/").pop()?.replace(".svelte", "");
  if (name && (mod as { default?: ComponentType }).default) {
    components[name] = (mod as { default: ComponentType }).default;
  }
}

export const ICON_COMPONENTS = components;
