import { defineConfig } from "tsup";

export default defineConfig({
  entry: { index: "src/bin.ts" },
  format: ["esm"],
  target: "node22",
  outDir: "bin",
  clean: true,
  banner: { js: "#!/usr/bin/env node" },
  platform: "node",
});
