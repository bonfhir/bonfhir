import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import replace from "@rollup/plugin-replace";
import terser from "@rollup/plugin-terser";
import typescript from "@rollup/plugin-typescript";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import filesize from "rollup-plugin-filesize";

export default [
  {
    input: "src/index.ts",
    output: [
      {
        file: "dist/cjs/index.cjs",
        format: "cjs",
        sourcemap: true,
        compact: true,
        banner: "#!/usr/bin/env node",
        inlineDynamicImports: true,
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
        preferBuiltins: true,
      }),
      commonjs(),
      json(),
      typescript({
        outDir: `dist/cjs`,
        declarationMap: false,
        declaration: false,
        exclude: ["**/*.test.ts"],
      }),
      terser({
        compress: false,
        mangle: false,
        output: {
          comments: false,
        },
      }),
      {
        buildEnd: () => {
          mkdirSync(`./dist/cjs`, { recursive: true });
          writeFileSync(`./dist/cjs/package.json`, `{"type": "cjs"}`);
        },
      },
      filesize(),
    ],
    onwarn(warning, warn) {
      if (["THIS_IS_UNDEFINED", "CIRCULAR_DEPENDENCY"].includes(warning.code))
        return;
      warn(warning);
    },
  },
];
