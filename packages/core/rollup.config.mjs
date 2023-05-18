import commonjs from "@rollup/plugin-commonjs";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import replace from "@rollup/plugin-replace";
import typescript from "@rollup/plugin-typescript";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import filesize from "rollup-plugin-filesize";

export default ["r4b", "r5"].flatMap((release) =>
  ["cjs", "esm"].map((format) => ({
    input: `src/${release}/index.ts`,
    output: [
      {
        file: `dist/${release}/${format}/index.${
          format === "cjs" ? "c" : "m"
        }js`,
        format,
        sourcemap: true,
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
        outDir: `dist/${format}`,
        declaration: false,
        declarationMap: false,
        exclude: ["**/*.test.ts"],
      }),
      {
        buildEnd: () => {
          mkdirSync(`./dist/${release}/${format}`, { recursive: true });
          writeFileSync(
            `./dist/${release}/${format}/package.json`,
            `{"type": "${format === "cjs" ? "commonjs" : "module"}}"}`
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
  }))
);
