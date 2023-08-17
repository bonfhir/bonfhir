/** @type {import('jest').Config} */
export default {
  transform: {
    "^.+\\.(t|j)sx?$": ["esbuild-jest", { sourcemap: true }],
  },
};
