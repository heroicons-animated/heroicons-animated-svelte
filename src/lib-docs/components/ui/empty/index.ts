export { default as Root, default as EmptyRoot } from "./empty-root.svelte";
export {
  default as Header,
  default as EmptyHeader,
} from "./empty-header.svelte";
export { default as Media, default as EmptyMedia } from "./empty-media.svelte";
export { default as Title, default as EmptyTitle } from "./empty-title.svelte";
export {
  default as Description,
  default as EmptyDescription,
} from "./empty-description.svelte";
export {
  default as Content,
  default as EmptyContent,
} from "./empty-content.svelte";

export const goHomeButtonClass =
  "supports-[corner-shape:squircle]:corner-squircle inline-flex w-fit cursor-pointer items-center justify-center gap-1 rounded-[8px] bg-primary px-[12px] py-[4px] font-sans text-sm text-white transition-[background-color] duration-100 hover:bg-primary/90 focus-visible:outline-1 focus-visible:outline-primary focus-visible:outline-offset-1 supports-[corner-shape:squircle]:rounded-[12px]";
