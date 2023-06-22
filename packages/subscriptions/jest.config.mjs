/** @type {import('jest').Config} */
export default {
  testEnvironment: "./jest.environment.ts",
  transform: {
    "^.+\\.tsx?$": ["esbuild-jest", { sourcemap: true }],
  },
  moduleNameMapper: {
    "(.+)\\.js": "$1",
  },
};
