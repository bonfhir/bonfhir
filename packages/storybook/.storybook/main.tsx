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
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/preset-create-react-app",
    "@storybook/addon-interactions",
  ],
  framework: {
    name: "@storybook/react-webpack5",
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
};
export default config;
