/** @type {import('jest').Config} */
export default {
  globalSetup: "<rootDir>/jest.setup.mjs",
  prettierPath: undefined, // https://jestjs.io/docs/configuration/#prettierpath-string
  transform: {
    "^.+\\.(t|j)sx?$": ["esbuild-jest", { sourcemap: true }],
  },
};
