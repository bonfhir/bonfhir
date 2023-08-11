import { addons } from "@storybook/manager-api";
import { create } from "@storybook/theming";

const theme = create({
  base: "light",
  brandTitle: "BonFHIR",
  //brandImage: "/icon-fhir-48.png",
});

addons.setConfig({
  theme,
});
