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
      "classic",
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
      }),
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
            type: "docSidebar",
            sidebarId: "getStartedSidebar",
            position: "right",
            label: "Packages Documentation",
          },
          {
            type: "docSidebar",
            sidebarId: "getStartedSidebar",
            position: "right",
            label: "Contributing",
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
    }),
};

module.exports = config;
