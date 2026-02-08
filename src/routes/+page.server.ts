import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = ({ url }) => {
  return {
    initialSearch: url.searchParams.get("search") ?? "",
  };
};
