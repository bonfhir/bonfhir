/** @type {import('jest').Config} */
export default {
  transform: {
    "^.+\\.tsx?$": ["esbuild-jest", { sourcemap: true }],
  },
};
