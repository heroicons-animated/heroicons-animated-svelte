import type { PACKAGE_MANAGER } from "./constants";

type PackageManager = (typeof PACKAGE_MANAGER)[keyof typeof PACKAGE_MANAGER];

const PREFIX_MAP: Record<PackageManager, string> = {
  pnpm: "pnpm",
  npm: "npx",
  yarn: "yarn",
  bun: "bunx --bun",
};

export const getPackageManagerPrefix = (pm: PackageManager) =>
  PREFIX_MAP[pm] ?? "npx";
