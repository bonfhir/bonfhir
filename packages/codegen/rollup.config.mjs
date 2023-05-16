import commonjs from "@rollup/plugin-commonjs";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import replace from "@rollup/plugin-replace";
import typescript from "@rollup/plugin-typescript";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

export default ["cjs", "esm"].map((format) => ({
  input: "src/index.ts",
  output: [
    {
      file: `dist/${format}/index.${format === "cjs" ? "c" : "m"}js`,
      format,
      sourcemap: true,
      banner: "#!/usr/bin/env node",
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
    }),
    {
      buildEnd: () => {
        mkdirSync(`./dist/${format}`, { recursive: true });
        writeFileSync(
          `./dist/${format}/package.json`,
          `{"type": "${format === "cjs" ? "commonjs" : "module"}}"}`
        );
      },
    },
  ],
  onwarn(warning, warn) {
    if (["THIS_IS_UNDEFINED", "CIRCULAR_DEPENDENCY"].includes(warning.code))
      return;
    warn(warning);
  },
}));
