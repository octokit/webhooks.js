#!/usr/bin/env ts-node-transpile-only

import esbuild, { type BuildOptions } from "esbuild";
import { copyFileSync, readFileSync, writeFileSync, rmSync } from "fs";
import { globSync as glob } from "glob";

const sharedOptions: BuildOptions = {
  sourcemap: true,
  minify: false,
  allowOverwrite: true,
  packages: "external",
};

async function main() {
  // Start with a clean slate
  rmSync("pkg", { recursive: true });
  // Build the source code for a neutral platform as ESM
  await esbuild.build({
    entryPoints: glob(["./src/*.ts", "./src/**/*.ts"]),
    outdir: "pkg/dist-src",
    bundle: false,
    platform: "neutral",
    format: "esm",
    ...sharedOptions,
  });

  // Remove the types file from the dist-src folder
  const typeFiles = glob([
    "./pkg/dist-src/types.js",
    "./pkg/dist-src/types.js.map",
    "./pkg/dist-src/**/types.js.map",
    "./pkg/dist-src/**/types.js",
  ]);
  for (const typeFile of typeFiles) {
    rmSync(typeFile);
  }

  const entryPoints = ["./pkg/dist-src/index.js"];

  await Promise.all([
    // Build the a CJS Node.js bundle
    esbuild.build({
      entryPoints,
      outdir: "pkg/dist-node",
      bundle: true,
      platform: "node",
      target: "node14",
      format: "cjs",
      ...sharedOptions,
    }),
    // Build an ESM browser bundle
    esbuild.build({
      entryPoints,
      outdir: "pkg/dist-web",
      bundle: true,
      platform: "browser",
      format: "esm",
      ...sharedOptions,
    }),
  ]);

  // Copy the README, LICENSE to the pkg folder
  copyFileSync("LICENSE.md", "pkg/LICENSE.md");
  copyFileSync("README.md", "pkg/README.md");

  // Handle the package.json
  let pkg = JSON.parse(readFileSync("package.json", "utf8").toString());
  // Remove unnecessary fields from the package.json
  delete pkg.scripts;
  delete pkg.prettier;
  delete pkg.release;
  writeFileSync(
    "pkg/package.json",
    JSON.stringify(
      {
        ...pkg,
        files: ["dist-*/**", "bin/**"],
        main: "./dist-node/index.js",
        module: "./dist-web/index.js",
        types: "./dist-src/index.d.ts",
        source: "./dist-src/index.js",
      },
      null,
      2
    )
  );
}
main();
