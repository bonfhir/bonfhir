import commonjs from "@rollup/plugin-commonjs";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import replace from "@rollup/plugin-replace";
import typescript from "@rollup/plugin-typescript";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const packageJson = JSON.parse(readFileSync("package.json", "utf8"));

export default [
  {
    input: "src/index.ts",
    output: [
      {
        file: "dist/cjs/index.cjs",
        format: "cjs",
        sourcemap: true,
        banner: "#!/usr/bin/env node",
      },
    ],
    plugins: [
      replace({
        preventAssignment: true,
        values: {
          "process.env.PACKAGE_VERSION": `"${packageJson.version}"`,
        },
      }),
      nodeResolve({
        exportConditions: ["node"],
      }),
      commonjs(),
      typescript({
        outDir: "dist/cjs",
        declaration: false,
        declarationMap: false,
      }),
      {
        buildEnd: () => {
          mkdirSync("./dist/cjs", { recursive: true });
          writeFileSync("./dist/cjs/package.json", '{"type": "commonjs"}');
          const targetPackage = JSON.parse(JSON.stringify(packageJson));
          delete targetPackage.scripts;
          delete targetPackage.devDependencies;
          delete targetPackage.dependencies;
          delete targetPackage.prettier;
          delete targetPackage.type;
          writeFileSync(
            "./dist/package.json",
            JSON.stringify(targetPackage, undefined, 2)
          );
        },
      },
    ],
  },
  {
    input: "src/index.ts",
    output: [
      {
        file: "dist/esm/index.mjs",
        format: "esm",
        sourcemap: true,
      },
    ],
    plugins: [
      replace({
        preventAssignment: true,
        values: {
          "process.env.PACKAGE_VERSION": `"${packageJson.version}"`,
        },
      }),
      nodeResolve({
        exportConditions: ["node"],
      }),
      commonjs(),
      typescript({
        outDir: "dist/esm",
        declaration: false,
        declarationMap: false,
      }),
      {
        buildEnd: () => {
          mkdirSync("./dist/esm", { recursive: true });
          writeFileSync("./dist/esm/package.json", '{"type": "module"}');
        },
      },
    ],
  },
];
