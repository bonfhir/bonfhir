/** @type {import('jest').Config} */
export default {
  globalSetup: "<rootDir>/jest.setup.mjs",
  transform: {
    "^.+\\.tsx?$": ["esbuild-jest", { sourcemap: true }],
  },
  moduleNameMapper: {
    "^decimal.js$": "decimal.js",
    "(.+)\\.js": "$1",
  },
};
