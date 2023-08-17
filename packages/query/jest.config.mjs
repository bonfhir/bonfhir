/** @type {import('jest').Config} */
export default {
  testEnvironment: "./jest.environment.ts",
  transform: {
    "^.+\\.(t|j)sx?$": ["esbuild-jest", { sourcemap: true }],
  },
};
