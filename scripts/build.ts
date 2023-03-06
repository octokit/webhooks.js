#!/usr/bin/env ts-node-transpile-only

import esbuild, { type BuildOptions } from "esbuild";
import { copyFileSync, readFileSync, writeFileSync, rmdirSync } from "fs";
import { globSync as glob } from "glob";

const sharedOptions: BuildOptions = {
  sourcemap: true,
  minify: false,
  allowOverwrite: true,
}

async function main() {
  // Start with a clean slate
  rmdirSync("pkg", { recursive: true });
  // Build the source code for a neutral platform as ESM
  await esbuild.build({
    entryPoints: [...glob("./src/*.ts"), ...glob("./src/**/*.ts")],
    outdir: "pkg/dist-src",
    bundle: false,
    platform: "neutral",
    format: "esm",
    ...sharedOptions,
  });

  const entryPoints = [
    ...glob("./pkg/dist-src/*.js"),
    ...glob("./pkg/dist-src/**/*.js"),
  ];

  // Build the source code as a bundle for Node.js as CJS
  await esbuild.build({
    entryPoints,
    outdir: "pkg/dist-node",
    bundle: true,
    platform: "node",
    packages: "external",
    target: "node14",
    format: "cjs",
    ...sharedOptions,
  });
  // Build the source code as a bundle for the browser as ESM
  await esbuild.build({
    entryPoints,
    outdir: "pkg/dist-web",
    bundle: true,
    platform: "browser",
    format: "esm",
    ...sharedOptions,
  });

  // Copy the README, LICENSE and package.json to the pkg folder
  copyFileSync("LICENSE.md", "pkg/LICENSE");
  copyFileSync("README.md", "pkg/README.md");
  let pkg = JSON.parse(readFileSync("package.json", "utf8").toString());
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
