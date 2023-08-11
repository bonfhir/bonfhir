import { FhirQueryProvider } from "@bonfhir/query/r5";
import { MantineRenderer } from "@bonfhir/ui-mantine/r5";
import { FhirUIProvider } from "@bonfhir/ui/r5";
import { MantineProvider } from "@mantine/core";
import type { Preview } from "@storybook/react";
import { mockClient } from "./mock-fhir-client";

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
      <FhirQueryProvider fhirClient={mockClient}>
        <MantineProvider withGlobalStyles withNormalizeCSS>
          <FhirUIProvider renderer={MantineRenderer}>
            {renderStory()}
          </FhirUIProvider>
        </MantineProvider>
      </FhirQueryProvider>
    ),
  ],
};

export default preview;
