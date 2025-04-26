import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["components/index.ts"], // Your library entry point
  format: ["cjs", "esm"], // Output formats
  dts: true, // Generate TypeScript declaration files
  splitting: false,
  sourcemap: true,
  clean: true, // Clean output directory before build
  external: ["react", "react-dom"], // Specify external dependencies (peerDependencies)
  injectStyle: false, // Let the consuming application handle CSS (Tailwind)
});
