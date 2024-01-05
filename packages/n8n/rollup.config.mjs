import commonjs from "@rollup/plugin-commonjs";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";

export default {
  input: [
    "nodes/Fhir/ResourceLookup.node.ts",
    "nodes/FHIRWebhookTrigger/FHIRWebhookTrigger.node.ts",
  ],
  output: [
    {
      dir: "dist",
      format: "cjs",
      sourcemap: true,
    },
  ],
  plugins: [
    nodeResolve(),
    commonjs(),
    typescript({
      include: [`**/*.ts`],
      outDir: `dist/`,
      declaration: false,
      declarationMap: false,
      exclude: ["**/*.test.ts"],
    }),
  ],
};
