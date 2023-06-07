const fs = require("fs/promises");
const glob = require("glob");
const esbuild = require("esbuild");

const octokitBundlesPlugin = (options = {}) => {
  const sharedOptions = {
    sourcemap: "external",
    sourcesContent: true,
    minify: false,
    allowOverwrite: true,
    packages: "external",
    ...options,
  };

  return {
    name: "octokit-bundles",
    async setup(build) {
      // Run the build steps after the main build
      build.onEnd(async (result) => {
        if (result.errors.length) return;

        // Start with a clean slate
        await fs.rm("pkg", { recursive: true, force: true });

        // Build the source code for a neutral platform as ESM
        await esbuild.build({
          entryPoints: await glob(["./src/*.ts", "./src/**/*.ts"]),
          outdir: "pkg/dist-src",
          bundle: false,
          platform: "neutral",
          format: "esm",
          ...sharedOptions,
          sourcemap: false,
        });

        // Remove the types file from the dist-src folder
        const typeFiles = await glob([
          "./pkg/dist-src/**/types.js.map",
          "./pkg/dist-src/**/types.js",
        ]);
        for (const typeFile of typeFiles) {
          await fs.rm(typeFile);
        }

        const entryPoints = ["./pkg/dist-src/index.js"];

        await Promise.all([
          // Build the CJS Node.js bundle
          esbuild.build({
            entryPoints,
            outdir: "pkg/dist-node",
            bundle: true,
            platform: "node",
            target: "node14",
            format: "cjs",
            ...sharedOptions,
          }),
          // Build the ESM browser bundle
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
        await fs.copyFile("LICENSE.md", "pkg/LICENSE.md");
        await fs.copyFile("README.md", "pkg/README.md");

        // Handle the package.json
        let pkg = JSON.parse(await fs.readFile("package.json", "utf8"));
        // Remove unnecessary fields from the package.json
        delete pkg.scripts;
        delete pkg.prettier;
        delete pkg.release;
        await fs.writeFile(
          "pkg/package.json",
          JSON.stringify(
            {
              ...pkg,
              files: ["dist-*/**", "bin/**"],
              main: "dist-node/index.js",
              browser: "dist-web/index.js",
              types: "dist-types/index.d.ts",
              module: "dist-src/index.js",
              sideEffects: false,
            },
            null,
            2
          )
        );
      });
    },
  };
};

module.exports = octokitBundlesPlugin;
