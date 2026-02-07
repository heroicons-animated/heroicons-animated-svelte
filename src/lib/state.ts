import { writable } from "svelte/store";
import { PACKAGE_MANAGER } from "./constants";

type PackageManager = (typeof PACKAGE_MANAGER)[keyof typeof PACKAGE_MANAGER];

export const packageManager = writable<PackageManager>(PACKAGE_MANAGER.PNPM);
