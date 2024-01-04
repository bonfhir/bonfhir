---
sidebar_position: 4
title: Custom renderers
description: Complete customization
---

You can create custom renderers if need be, to replace and/or augment bonFHIR-provided one.

Let's assume that you want to create custom renderer for [`<FhirValue />`](http://localhost:3000/packages/react/components/fhir-value).
This renderer should:

- only rendere the values as string without any other component
- allows appending "(preliminary)" to any information displayed on screen

We'll first create the custom renderer, and configure the app to use it.

## Create your custom renderer

Create a new component named `custom-fhir-value.tsx` using the following content:

```tsx
import { FhirValueRendererProps } from "@bonfhir/react/r5";
import { ReactElement } from "react";

export function CustomFhirValue(
  props: FhirValueRendererProps<CustomFhirValueProps>,
): ReactElement | null {
  return (
    <>
      {props.formattedValue}
      {props.rendererProps?.preliminary ? " (preliminary)" : ""}
    </>
  );
}

export interface CustomFhirValueProps {
  preliminary?: boolean;
}
```

A custom renderer is simply a React component that:

- takes a prop of `-RendererProps` to match with the [bonFHIR React component](/packages/react/components) to render
- define a new type for its own renderer props to use as additional capabilities
- renders what needs to be done

Here you can note that the `FhirValueProps` and `FhirValueRendererProps` are slightly different - one is the public API when using the component,
the other is the API that the renderer needs to support; most of the time, some complexity is already absorbed by the bonFHIR React component itself.

You can also use the [`useFhirUIContext`](/packages/react/components/use-fhir-ui-context) hook to get access to the global ui context.

## Create a new custom renderer

Create a new file named `custom-renderer.ts`:

```tsx
import { MantineRenderer } from "@bonfhir/mantine/r4b";
import { FhirUIRenderer } from "@bonfhir/react/r4b";
import { CustomFhirValue } from "./custom-fhir-value";

// This re-uses all the Mantine renderer except for the one we just created.
export const CustomRenderer = {
  ...MantineRenderer,
  FhirValue: CustomFhirValue,
} satisfies FhirUIRenderer;

// This one is if you want to have only your components.
export const CustomRenderer = {
  FhirValue: CustomFhirValue,
} satisfies Partial<FhirUIRenderer>;
```

## Configure the new renderer on the `<FhirUIProvider />`

```tsx
import { FhirUIProvider } from "@bonfhir/react/r4b";
import { CustomRenderer } from "./custom-renderer";

function Root() {
  //...

  return (
    <FhirUIProvider renderer={CustomRenderer}>
      <App />
    </FhirUIProvider>
  );
}
```

Optionaly, [if you have configured typed renderer props](/packages/react/get-started#typed-rendererprops), update the `<FhirValue />` render props:

```tsx
import type { CustomFhirValueProps } from "./custom-fhir-value";
import { FhirPaginationProps, FhirValueProps } from "@bonfhir/react/r4b";

declare module "@bonfhir/react/r4b" {
  export function FhirValue(
    props: FhirValueProps<CustomFhirValueProps>,
  ): ReactElement | null;
}
```

## Use the component as usual

```tsx
<FhirValue
  type="string"
  value="Hello World"
  rendererProps={{ preliminary: true }}
/>
```

Congrats!
