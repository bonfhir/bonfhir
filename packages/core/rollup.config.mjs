import commonjs from "@rollup/plugin-commonjs";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import replace from "@rollup/plugin-replace";
import terser from "@rollup/plugin-terser";
import typescript from "@rollup/plugin-typescript";
import { mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import dts from "rollup-plugin-dts";
import filesize from "rollup-plugin-filesize";

export default ["r4b", "r5"].flatMap((release) =>
  ["cjs", "esm"].flatMap((format) => [
    {
      input: `src/${release}/index.ts`,
      output: [
        {
          file: `dist/${release}/${format}/index.${
            format === "cjs" ? "c" : "m"
          }js`,
          format,
          sourcemap: true,
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
          include: [`src/${release}/**/*`],
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
            mkdirSync(`./dist/${release}/${format}`, { recursive: true });
            writeFileSync(
              `./dist/${release}/${format}/package.json`,
              `{"type": "${format === "cjs" ? "commonjs" : "module"}"}`
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
      input: `dist/${release}/${format}/dts/index.d.ts`,
      output: [
        {
          file: `dist/${release}/${format}/index.d.ts`,
          format: format === "esm" ? "m" : "c",
        },
      ],
      plugins: [
        dts(),
        {
          buildEnd: () => {
            rmSync(`dist/${release}/${format}/dts`, {
              recursive: true,
              force: true,
            });
          },
        },
      ],
    },
  ])
);
