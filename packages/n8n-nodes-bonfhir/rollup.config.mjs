import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import { glob } from "glob";
import path from "node:path";
import { URL, fileURLToPath } from "node:url";
import copy from "rollup-plugin-copy";

export default {
  input: Object.fromEntries(
    glob
      .sync(["src/credentials/**/*.credentials.ts", "src/nodes/**/*.node.ts"])
      .map((file) => [
        path.relative(
          "src",
          file.slice(0, file.length - path.extname(file).length),
        ),
        fileURLToPath(new URL(file, import.meta.url)),
      ]),
  ),
  external: (id) =>
    id.startsWith("n8n") || id.startsWith("request-promise-native"),
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
    json(),
    typescript({
      declaration: false,
      declarationMap: false,
      exclude: ["**/*.test.ts"],
      outputToFilesystem: false,
    }),
    copy({
      targets: [
        {
          src: "src/**/*.{png,svg,json}",
          dest: "dist",
          rename: (_, __, fullPath) => {
            return fullPath.replace("src", "");
          },
        },
      ],
    }),
  ],
};
