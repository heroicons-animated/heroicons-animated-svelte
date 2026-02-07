import { PACKAGE_MANAGER, SITE } from "./constants";
import { getPackageManagerPrefix } from "./package-manager";

type PackageManager = (typeof PACKAGE_MANAGER)[keyof typeof PACKAGE_MANAGER];

export const getFileExtension = () => "svelte";

export const getShadcnCLI = () => "shadcn-svelte";

export const getRegistryPathPrefix = () => "/";

export const getCLICommand = (
  packageManager: PackageManager,
  iconName: string
): string => {
  const prefix = getPackageManagerPrefix(packageManager);
  const cli = getShadcnCLI();
  return `${prefix} ${cli} add @${SITE.NAME}${getRegistryPathPrefix()}${iconName}`;
};
