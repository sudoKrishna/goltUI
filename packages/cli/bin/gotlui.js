#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { execSync } from "node:child_process";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const registryDir = path.join(__dirname, "..", "registry");
const registry = JSON.parse(
  fs.readFileSync(path.join(registryDir, "registry.json"), "utf8")
);

function detectPackageManager(cwd) {
  if (fs.existsSync(path.join(cwd, "bun.lock")) || fs.existsSync(path.join(cwd, "bun.lockb"))) return "bun";
  if (fs.existsSync(path.join(cwd, "pnpm-lock.yaml"))) return "pnpm";
  if (fs.existsSync(path.join(cwd, "yarn.lock"))) return "yarn";
  return "npm";
}

function installCommand(pm, deps) {
  switch (pm) {
    case "bun":
      return `bun add ${deps.join(" ")}`;
    case "pnpm":
      return `pnpm add ${deps.join(" ")}`;
    case "yarn":
      return `yarn add ${deps.join(" ")}`;
    default:
      return `npm install ${deps.join(" ")}`;
  }
}

// Projects using a src/ layout get files under src/, otherwise the root.
function resolveBase(cwd) {
  return fs.existsSync(path.join(cwd, "src")) ? path.join(cwd, "src") : cwd;
}

function add(name) {
  const entry = registry[name];
  if (!entry) {
    console.error(`\nNo component named "${name}" in the registry.`);
    console.error(`Available: ${Object.keys(registry).join(", ")}\n`);
    process.exit(1);
  }

  if (!entry.files || entry.files.length === 0) {
    console.error(`\n"${name}" isn't implemented in the registry yet.\n`);
    process.exit(1);
  }

  const cwd = process.cwd();
  const base = resolveBase(cwd);

  for (const file of entry.files) {
    const sourcePath = path.join(registryDir, file.source);
    const targetPath = path.join(base, file.target);

    fs.mkdirSync(path.dirname(targetPath), { recursive: true });

    if (fs.existsSync(targetPath)) {
      console.log(`Skipped (already exists): ${path.relative(cwd, targetPath)}`);
      continue;
    }

    fs.copyFileSync(sourcePath, targetPath);
    console.log(`Added: ${path.relative(cwd, targetPath)}`);
  }

  // Assets (e.g. public/ images) always resolve from the project root,
  // never under src/, regardless of the project's layout.
  for (const asset of entry.assets ?? []) {
    const sourcePath = path.join(registryDir, asset.source);
    const targetPath = path.join(cwd, asset.target);

    if (fs.existsSync(targetPath)) {
      console.log(`Skipped (already exists): ${path.relative(cwd, targetPath)}`);
      continue;
    }

    fs.mkdirSync(path.dirname(targetPath), { recursive: true });
    fs.cpSync(sourcePath, targetPath, { recursive: true });
    console.log(`Added: ${path.relative(cwd, targetPath)}`);
  }

  if (entry.dependencies?.length) {
    const pm = detectPackageManager(cwd);
    const cmd = installCommand(pm, entry.dependencies);
    console.log(`\nInstalling dependencies with ${pm}: ${entry.dependencies.join(", ")}`);
    execSync(cmd, { cwd, stdio: "inherit" });
  }

  // Entries can override the printed import (needed when the export name
  // or file path doesn't match the plain slug->PascalCase guess, e.g.
  // nested folders or a differently-named main file).
  const componentName =
    entry.import?.name ??
    name
      .split("-")
      .map((part) => part[0].toUpperCase() + part.slice(1))
      .join("");
  const importPath =
    entry.import?.path ?? `@/components/gotlui/${name}`;

  console.log(`\nDone. Import it with:\n`);
  console.log(`  import ${componentName} from "${importPath}"\n`);
}

const [, , command, name] = process.argv;

if (command === "add" && name) {
  add(name);
} else {
  console.log(`
Usage:
  gotlui add <component>

Available components:
  ${Object.keys(registry).join("\n  ")}
`);
}
