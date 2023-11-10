import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import replace from "@rollup/plugin-replace";
import terser from "@rollup/plugin-terser";
import typescript from "@rollup/plugin-typescript";
import { mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import dts from "rollup-plugin-dts";
import filesize from "rollup-plugin-filesize";

export default [
  {
    input: "src/cli.ts",
    output: [
      {
        file: "dist/cli/index.cjs",
        format: "cjs",
        sourcemap: true,
        compact: false, // There is a bug in Rollup that prevents the use of compact: true for this. the error is it mangles a `typeof document` into `typeof document`.
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
        outDir: `dist/cli`,
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
          mkdirSync(`./dist/cli`, { recursive: true });
          writeFileSync(`./dist/cli/package.json`, `{"type": "cjs"}`);
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
  ...["cjs", "esm"].flatMap((format) => [
    {
      input: "src/index.ts",
      output: [
        {
          file: `dist/${format}/index.${format === "cjs" ? "c" : "m"}js`,
          format,
          sourcemap: true,
          compact: true,
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
          outDir: `dist/${format}`,
          declaration: true,
          declarationDir: "dts",
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
        {
          buildEnd: () => {
            mkdirSync(`./dist/${format}`, { recursive: true });
            writeFileSync(
              `./dist/${format}/package.json`,
              `{"type": "${format === "cjs" ? "commonjs" : "module"}}"}`,
            );
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
    {
      input: `dist//${format}/dts/index.d.ts`,
      output: [
        {
          file: `dist/${format}/index.d.ts`,
          format: format === "esm" ? "m" : "c",
        },
      ],
      plugins: [
        dts(),
        {
          buildEnd: () => {
            rmSync(`dist/${format}/dts`, {
              recursive: true,
              force: true,
            });
          },
        },
      ],
    },
  ]),
];
