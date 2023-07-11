import { MantineRenderer } from "@bonfhir/ui-mantine/r5";
import { FhirUIProvider } from "@bonfhir/ui/r5";
import { MantineProvider } from "@mantine/core";
import type { Preview } from "@storybook/react";

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
      expanded: true,
    },
  },
  decorators: [
    (renderStory: Function) => (
      <MantineProvider withGlobalStyles withNormalizeCSS>
        <FhirUIProvider renderer={MantineRenderer}>
          {renderStory()}
        </FhirUIProvider>
      </MantineProvider>
    ),
  ],
};

export default preview;
