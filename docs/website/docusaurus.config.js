// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const { themes } = require("prism-react-renderer");

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "bonFHIR",
  tagline: "Easily harness the potential of FHIR in your apps",

  favicon: "img/favicon.ico",
  url: "https://bonfhir.dev",
  baseUrl: "/",
  organizationName: "bonfhir",
  projectName: "bonfhir.github.io",
  trailingSlash: false,
  onBrokenLinks: "warn",
  onBrokenMarkdownLinks: "warn",
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  presets: [
    [
      "@docusaurus/preset-classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          remarkPlugins: [
            [require("@docusaurus/remark-plugin-npm2yarn"), { sync: true }],
          ],
          editUrl: "https://github.com/bonfhir/bonfhir/tree/main/docs/website/",
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
        gtag: {
          trackingID: "G-R0EMRLV0G9",
        },
      }),
    ],
  ],

  plugins: [
    [
      "@docusaurus/plugin-content-docs",
      {
        id: "packages",
        path: "packages",
        routeBasePath: "packages",
        sidebarPath: require.resolve("./sidebars.js"),
        editUrl: "https://github.com/bonfhir/bonfhir/tree/main/docs/website",
        remarkPlugins: [
          [require("@docusaurus/remark-plugin-npm2yarn"), { sync: true }],
        ],
      },
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: "img/docusaurus-social-card.jpg",
      navbar: {
        logo: {
          alt: "bonFHIR",
          src: "img/bonfhir_logo.svg",
        },
        items: [
          {
            type: "docSidebar",
            sidebarId: "getStartedSidebar",
            position: "right",
            label: "Get Started",
          },
          {
            to: "/packages/intro",
            position: "right",
            label: "Packages Documentation",
            activeBaseRegex: `/packages/`,
          },
          {
            href: "https://bonfhir.dev/storybook",
            label: "Storybook",
            position: "right",
          },
          {
            href: "https://github.com/bonfhir/bonfhir",
            label: "GitHub",
            position: "right",
          },
        ],
      },
      prism: {
        theme: themes.dracula,
        darkTheme: themes.dracula,
      },
      colorMode: {
        disableSwitch: true,
      },
      algolia: {
        appId: "C444QI5SK7",
        apiKey: "fc7d73ded65b514d4e2773653bc196c4",
        indexName: "bonfhir",
      },
    }),
};

module.exports = config;
