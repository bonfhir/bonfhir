/** @type {import('jest').Config} */
export default {
  testEnvironment: "./jest.environment.ts",
  testEnvironmentOptions: {
    customExportConditions: [""], // https://mswjs.io/docs/migrations/1.x-to-2.x#cannot-find-module-mswnode-jsdom
  },
  transform: {
    "^.+\\.(t|j)sx?$": ["esbuild-jest", { sourcemap: true }],
  },
};
