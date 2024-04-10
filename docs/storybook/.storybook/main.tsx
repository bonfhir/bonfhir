import { dirname, join } from "path";
import type { StorybookConfig } from "@storybook/react-webpack5";

const config: StorybookConfig = {
  stories: [
    {
      directory: "../src/stories",
      files: "**/*.mdx",
      titlePrefix: "BonFHIR",
    },
    {
      directory: "../src/stories",
      files: "**/*.stories.@(js|jsx|ts|tsx)",
      titlePrefix: "BonFHIR",
    },
  ],
  addons: [
    getAbsolutePath("@storybook/addon-links"),
    getAbsolutePath("@storybook/addon-essentials"),
    getAbsolutePath("@storybook/preset-create-react-app"),
    getAbsolutePath("@storybook/addon-interactions"),
    getAbsolutePath("@storybook/addon-storysource"),
    getAbsolutePath("@storybook/addon-mdx-gfm")
  ],
  framework: {
    name: getAbsolutePath("@storybook/react-webpack5"),
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
  staticDirs: ["../public"],
  managerHead: (head) => `
    ${head}
    <link rel="shortcut icon" href="/favicon.ico">
  `,
  webpackFinal: async (config) => {
    config.resolve = {
      ...config.resolve,
      extensionAlias: {
        ...config.resolve?.extensionAlias,
        ".js": [".ts", ".js"],
        ".mjs": [".mts", ".mjs"],
      },
    };
    return config;
  },
};
export default config;

function getAbsolutePath(value: string): any {
  return dirname(require.resolve(join(value, "package.json")));
}
