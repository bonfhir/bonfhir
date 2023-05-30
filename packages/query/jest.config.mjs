/** @type {import('jest').Config} */
export default {
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.tsx?$": ["esbuild-jest", { sourcemap: true }],
  },
  moduleNameMapper: {
    "(.+)\\.js": "$1",
  },
};
