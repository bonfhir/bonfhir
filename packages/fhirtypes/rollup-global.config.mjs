import commonjs from "@rollup/plugin-commonjs";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import replace from "@rollup/plugin-replace";
import terser from "@rollup/plugin-terser";
import typescript from "@rollup/plugin-typescript";
import { readFileSync } from "node:fs";
import filesize from "rollup-plugin-filesize";

// This is a separate file as if included in the main rollup, nodejs explodes when compiling.
export default ["r4b", "r5"].map((release) => ({
  input: `src/${release}/global.ts`,
  output: [
    {
      file: `dist/${release}/global/index.js`,
      format: "cjs",
      compact: true,
    },
  ],
  plugins: [
    replace({
      preventAssignment: true,
      values: {
        "process.env.PACKAGE_VERSION": `"${
          JSON.parse(readFileSync("package.json", "utf8")).version
        }"`,
      },
    }),
    nodeResolve({
      exportConditions: ["node"],
    }),
    commonjs(),
    typescript({
      outDir: `dist/${release}`,
      declaration: false,
      declarationMap: false,
      exclude: ["**/*.test.ts"],
    }),
    terser({
      compress: false,
      mangle: false,
      output: {
        comments: false,
      },
    }),
    filesize(),
  ],
  onwarn(warning, warn) {
    if (["THIS_IS_UNDEFINED", "CIRCULAR_DEPENDENCY"].includes(warning.code))
      return;
    warn(warning);
  },
}));
