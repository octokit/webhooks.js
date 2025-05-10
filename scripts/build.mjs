import esbuild from "esbuild";
import { dirname } from "node:path";
import { mkdirSync, writeFileSync } from "node:fs";
import { copyFile, readFile, writeFile, rm } from "node:fs/promises";
import { glob } from "glob";

/**
 * Internal function to rewrite relative import extensions.
 *
 * based on:
 * @onyx/esbuild-plugin-rewrite-relative-import-extensions
 *
 * MIT License
 *
 * Copyright (c) 2025 Santiago Aguilar Hernández
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
export function rewriteRelativeImportExtensionsPlugin() {
  return {
    name: "rewrite-relative-import-extensions",
    setup(build) {
      const write = build.initialOptions.write;
      build.initialOptions.write = false;

      build.onEnd((result) => {
        const files = result.outputFiles ?? [];

        for (const file of files) {
          let output = file.text;

          const matches = output.matchAll(
            /(?<=(?:import|export\s*[*{])[^"']+["'])([^"']+)(?=["'])/g,
          );

          for (const match of matches) {
            output = output.replaceAll(match[0], (filePath, index) => {
              if (match.index !== index) {
                return filePath;
              }

              if (!/^\.\.?\//.test(filePath)) {
                return filePath;
              }

              return filePath.replace(
                /\.([jt]sx)$|((?:\.d)?)((?:\.[^./]+?)?)\.([cm]?)ts$/i,
                function (m, tsx, d, ext, cm) {
                  return tsx
                    ? ".js"
                    : d && (!ext || !cm)
                      ? m
                      : d + ext + "." + cm.toLowerCase() + "js";
                },
              );
            });
          }

          if (write === undefined || write) {
            mkdirSync(dirname(file.path), { recursive: true });
            writeFileSync(file.path, output);
          }
        }
      });
    },
  };
}

/** @type {esbuild.BuildOptions} */
const sharedOptions = {
  sourcemap: "external",
  sourcesContent: true,
  minify: false,
  allowOverwrite: true,
  packages: "external",
  platform: "neutral",
  format: "esm",
  target: "es2022",
};

async function main() {
  // Start with a clean slate
  await rm("pkg", { recursive: true, force: true });
  // Build the source code for a neutral platform as ESM
  await esbuild.build({
    entryPoints: await glob(["./src/*.ts", "./src/**/*.ts"]),
    outdir: "pkg/dist-src",
    bundle: false,
    ...sharedOptions,
    sourcemap: false,
    plugins: [rewriteRelativeImportExtensionsPlugin()],
  });

  // Remove the types file from the dist-src folder
  const typeFiles = await glob([
    "./pkg/dist-src/**/types.js.map",
    "./pkg/dist-src/**/types.js",
  ]);
  for (const typeFile of typeFiles) {
    await rm(typeFile);
  }

  const entryPoints = ["./pkg/dist-src/index.js"];

  await esbuild.build({
    entryPoints,
    outdir: "pkg/dist-bundle",
    bundle: true,
    ...sharedOptions,
  });

  // Copy the README, LICENSE to the pkg folder
  await copyFile("LICENSE.md", "pkg/LICENSE.md");
  await copyFile("README.md", "pkg/README.md");

  // Handle the package.json
  let pkg = JSON.parse((await readFile("package.json", "utf8")).toString());
  // Remove unnecessary fields from the package.json
  delete pkg.scripts;
  delete pkg.prettier;
  delete pkg.release;
  await writeFile(
    "pkg/package.json",
    JSON.stringify(
      {
        ...pkg,
        files: ["dist-*/**", "bin/**"],
        types: "dist-types/index.d.ts",
        exports: {
          ".": {
            types: "./dist-types/index.d.ts",
            import: "./dist-bundle/index.js",
            // Tooling currently are having issues with the "exports" field when there is no "default", ex: TypeScript, eslint
            default: "./dist-bundle/index.js",
          },
          "./types": {
            types: "./dist-types/types.d.ts",
          },
        },
        source: "dist-src/index.js",
        sideEffects: false,
      },
      null,
      2,
    ),
  );
}
main();
