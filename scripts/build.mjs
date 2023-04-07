import esbuild from "esbuild";
import octokitBundlesPlugin from "./esbuild-octokit-plugin.js";

esbuild.build({
  // Your build configuration
  plugins: [octokitBundlesPlugin()],
});
