import { MantineRenderer } from "@bonfhir/mantine/r5";
import { FhirQueryProvider } from "@bonfhir/query/r5";
import { FhirUIProvider } from "@bonfhir/react/r5";
import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import "@mantine/tiptap/styles.css";
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
        <MantineProvider>
          <FhirUIProvider renderer={MantineRenderer}>
            {renderStory()}
          </FhirUIProvider>
        </MantineProvider>
      </FhirQueryProvider>
    ),
  ],
};

export default preview;
