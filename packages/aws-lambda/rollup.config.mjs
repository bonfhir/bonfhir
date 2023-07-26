import commonjs from "@rollup/plugin-commonjs";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import replace from "@rollup/plugin-replace";
import terser from "@rollup/plugin-terser";
import typescript from "@rollup/plugin-typescript";
import { mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { readFile } from "node:fs/promises";
import dts from "rollup-plugin-dts";
import filesize from "rollup-plugin-filesize";

const packageJson = JSON.parse(await readFile("package.json", "utf8"));

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
      external: (id) =>
        id.startsWith("@bonfhir/") ||
        Object.keys(packageJson.peerDependencies || {}).some((x) =>
          id.startsWith(x),
        ),
      plugins: [
        replace({
          preventAssignment: true,
          values: {
            "process.env.PACKAGE_VERSION": `"${
              JSON.parse(readFileSync("package.json", "utf8")).version
            }"`,
          },
        }),
        nodeResolve(),
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
              `{"type": "${format === "cjs" ? "commonjs" : "module"}"}`,
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
      external: (id) =>
        id.startsWith("@bonfhir/") ||
        Object.keys(packageJson.peerDependencies || {}).includes(id),
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
      onwarn(warning, warn) {
        if (
          warning.code === "UNRESOLVED_IMPORT" &&
          warning.exporter.startsWith("@bonfhir/")
        ) {
          return;
        }
        warn(warning);
      },
    },
  ]),
);
