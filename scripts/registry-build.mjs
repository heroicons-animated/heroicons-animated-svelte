import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const iconsDir = path.resolve(__dirname, "../src/lib/icons");
const registryPath = path.resolve(__dirname, "../static/r");
const registryIndexPath = path.join(registryPath, "registry.json");

const schemaUrl = "https://shadcn-svelte.com/schema/registry-item.json";
const registrySchemaUrl = "https://shadcn-svelte.com/schema/registry.json";
const registryItemType = "registry:component";
const sourcePathPrefix = "src/lib/icons";
const targetPathPrefix = "~/src/lib/components/heroicons-animated";

const stripContent = (schema) => {
  const { files, $schema: _itemSchema, ...rest } = schema;
  return {
    ...rest,
    files: files.map(({ content: _content, ...file }) => file),
  };
};

const writeSchemaFile = (name, schema) => {
  fs.writeFileSync(
    path.join(registryPath, `${name}.json`),
    JSON.stringify(schema, null, 2)
  );
};

const buildRegistryItems = () => {
  if (!fs.existsSync(iconsDir)) {
    console.warn(`Icons directory not found: ${iconsDir}`);
    return [];
  }

  const iconFiles = fs
    .readdirSync(iconsDir)
    .filter((file) => file.endsWith(".svelte"))
    .sort((left, right) => left.localeCompare(right));

  const registryItems = [];

  for (const file of iconFiles) {
    const name = file.replace(".svelte", "");
    const content = fs.readFileSync(path.join(iconsDir, file), "utf8");
    const sourcePath = `${sourcePathPrefix}/${name}.svelte`;
    const targetPath = `${targetPathPrefix}/${name}.svelte`;

    const schema = {
      $schema: schemaUrl,
      name,
      type: registryItemType,
      title: name,
      description: `Animated ${name} icon for Svelte`,
      author: "Aniket Pawar <pawaraniket508@gmail.com>",
      registryDependencies: [],
      dependencies: [],
      files: [
        {
          path: sourcePath,
          type: registryItemType,
          target: targetPath,
          content,
        },
      ],
    };

    writeSchemaFile(name, schema);
    registryItems.push(stripContent(schema));
  }

  return registryItems;
};

const buildRegistry = () => {
  if (!fs.existsSync(registryPath)) {
    fs.mkdirSync(registryPath, { recursive: true });
  }

  const registryItems = buildRegistryItems();
  const registryIndex = {
    $schema: registrySchemaUrl,
    name: "heroicons-animated-svelte",
    homepage: "https://svelte.heroicons-animated.com",
    items: registryItems,
  };

  fs.writeFileSync(registryIndexPath, JSON.stringify(registryIndex, null, 2));

  console.log(`Built ${registryItems.length} Svelte registry components`);
};

buildRegistry();
