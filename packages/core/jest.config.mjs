/** @type {import('jest').Config} */
export default {
  globalSetup: "<rootDir>/jest.setup.mjs",
  transform: {
    "^.+\\.(t|j)sx?$": ["esbuild-jest", { sourcemap: true }],
  },
};
