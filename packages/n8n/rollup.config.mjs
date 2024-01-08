import commonjs from "@rollup/plugin-commonjs";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import { glob } from "glob";
import path from "node:path";
import { URL, fileURLToPath } from "node:url";

export default {
  input: Object.fromEntries(
    glob
      .sync(["credentials/**/*.credentials.ts", "nodes/**/*.node.ts"])
      .map((file) => [
        path.relative(
          "",
          file.slice(0, file.length - path.extname(file).length),
        ),
        fileURLToPath(new URL(file, import.meta.url)),
      ]),
  ),
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
