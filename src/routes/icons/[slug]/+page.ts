import { error } from "@sveltejs/kit";
import { ICON_MANIFEST } from "$lib/manifest";
import type { PageLoad } from "./$types";

export const prerender = true;

export const entries = () => {
  return ICON_MANIFEST.map((icon) => ({ slug: icon.name }));
};

export const load: PageLoad = ({ params }) => {
  const icon = ICON_MANIFEST.find((item) => item.name === params.slug);

  if (!icon) {
    throw error(404, "Icon not found");
  }

  return { icon };
};
