---
sidebar_position: 1
title: Get started
description: Start using the UI components in your app
---

You can either get started from one of our templates, or configure it manually.

## From a template

We do recommend that you use one of our starter template to get started.  
Simply run the `npm create -y bonfhir@latest` command to get started and pick the template that you want.  
We do provide templates for [Vite](https://vitejs.dev/) and a [Next.js](https://nextjs.org/).

If you haven't, we also strongly suggest you follow [one of our get started tutorials](docs/build-a-fhir-app-with-react)
to learn more about the development process.

## Manually

To use the components manually, first make sure that you have a working react application.  
Pay also attention to the required [typescript configuration for bonFHIR](http://localhost:3000/packages/intro#typescript-configuration).

### Install the package(s)

Install the react package, and any renderer package that you need. For the purpose of this guide, we will use the
[Mantine renderer package](/packages/react/mantine):

```bash npm2yarn
npm install @bonfhir/react @bonfhir/mantine
```

You also need to follow any instructions attached to the renderer package. In the case of Mantine, [please follow
the documentation for the toolkit](https://mantine.dev/getting-started/#get-started-without-framework) - which means
installing the toolkit packages and configuration files.

### Add the `<FhirUIProvider />`

Once the packages are installed and the underlying tookit is configured, you know need to configure the `<FhirUIProvider />`.  
The provider is there to globally configure all [react components](/packages/react/components).

Wrap you application with the `<FhirUIProvider />` and indicates which renderer to use:

```tsx
import { FhirUIProvider } from "@bonfhir/react/r4b";
import { MantineRenderer } from "@bonfhir/mantine/r4b";

function Root() {
  //...

  return (
    <FhirUIProvider renderer={MantineRenderer}>
      <App />
    </FhirUIProvider>
  );
}
```

### Configure `@bonfhir/query`

Some components may need to fetch FHIR data. For this, they leverage the [`@bonfhir/query` package](/packages/query).
Please refer to the package installation instructions to configure it.

You are now ready to use the components.

## Configure the `<FhirUIProvider />`

:::info

The `<FhirUIProvider />` uses [React context](https://react.dev/learn/passing-data-deeply-with-context).  
This makes it incompatible with [React server components](https://nextjs.org/docs/app/building-your-application/rendering/server-components) at the moment.

You'll have to add `"use client";` if you use the app router in next.

:::

### Custom global formatter

Some components use a [formatter instance](/packages/core/data-types-formatters) to render FHIR content.
It is possible to customize the instance of the formatter used:

```tsx
import { FhirUIProvider } from "@bonfhir/react/r4b";
import { Formatter } from "@bonfhir/core/r4b";

const formatter = Formatter.build({
  locale: "en-US", // Force en-US locale regardless of browser settings
  booleanLabels: {
    true: "Yes",
    false: "No",
  },
});

function Root() {
  //...

  return (
    <FhirUIProvider formatter={formatter}>
      <App />
    </FhirUIProvider>
  );
}
```

To access the formatter instance in a react component, use the `useFhirUIContext` hook:

```tsx
import { useFhirUIContext } from "@bonfhir/react/r4b";

const { formatter } = useFhirUIContext();
```

### Navigation

Some components may want to access and influence the navigation of the app.
This can be configured using the `onNavigate` prop:

```tsx
import { FhirUIProvider } from "@bonfhir/react/r4b";

function Root() {
  //...
  const navigate = useNavigate(); // Depends on your choice of router

  return (
    <FhirUIProvider
      onNavigate={({ target, aux }) => {
        if (aux) {
          // aux indicate that this should be opened in a different window if possible.
          window.open(target, "_blank");
        } else {
          navigate(target);
        }
      }}
    >
      <App />
    </FhirUIProvider>
  );
}
```

### Default props

You can define default props for all bonFHIR components - they will apply globally, without the need to use them everywhere,
unless they are overridden by component props:

```tsx
import { FhirUIProvider } from "@bonfhir/react/r4b";

function Root() {
  //...
  const navigate = useNavigate(); // Depends on your choice of router

  return (
    <FhirUIProvider
      defaultProps={{
        FhirInput: {
          required: true, // Makes all inputs required by default.
        },
      }}
    >
      <App />
    </FhirUIProvider>
  );
}
```

It is possible to also use a function that can examine the component props and decide how to apply default options:

```tsx
import { FhirUIProvider } from "@bonfhir/react/r4b";

function Root() {
  //...

  return (
    <FhirUIProvider
      defaultProps={{
        FhirInput: (props) => {
          if (["code", "Coding", "CodeableConcept"].includes(props.type)) {
            // Defaults the `fhirClient` props of `FhirInput` to "terminology" when the type is "code, "Coding" or "CodeableConcept"
            return { ...props, fhirClient: "terminology" };
          }

          return props;
        },
      }}
    >
      <App />
    </FhirUIProvider>
  );
}
```

## Typed `rendererProps`

All bonFHIR react components expose a props named `rendererProps` that is passed directly to the underlying renderer
component. This allows a great deal of flexibility in that renderer can expose customization and flexibility on top of
what the base bonFHIR react component interface provides.

The following example illustrates the concept with Mantine renderer for the `<FhirValue />` component, that re-exposes
all of the [`Text` props](https://mantine.dev/core/text/?t=props) inside a `text` attribute:

```tsx
// Render the value in blue with a xl size
<FhirValue
  type="string"
  value="Hello, world!"
  rendererProps={{ text: { color: "blue", size: "xl" } }}
/>
```

By default, these rendererProps are typed with `any`, as the bonFHIR raect package cannot know what the underlying
renderer exposes.  
This is not great for type safety and discoverability.

This can be fixed in 2 ways: locally or globally.

### Locally provide the renderer props type

Renderer packages should provide a type to specify what the renderer props are, and it can be applied to the bonFHIR
component:

```tsx
import { MantineFhirValueProps } from "@bonfhir/mantine/r4b";
import { FhirValue } from "@bonfhir/react/r4b";

// Renderer props is now typed properly.
<FhirValue<MantineFhirValueProps>
  type="string"
  value="Hello, world!"
  rendererProps={{ text: { color: "blue", size: "xl" } }}
/>;
```

While this works, we recommend using the global approach as it will be applied everywhere by default.

### Globally apply the renderer props type

For this, you will need to create a filoe named `bonfhir.d.ts` at the root of your application, and apply TypeScript
types overrides for each bonFHIR component you use:

```tsx
import {
  MantineFhirPaginationProps,
  MantineFhirValueProps,
} from "@bonfhir/mantine/r4b";
import { FhirPaginationProps, FhirValueProps } from "@bonfhir/react/r4b";

declare module "@bonfhir/react/r4b" {
  export function FhirValue(
    props: FhirValueProps<MantineFhirValueProps>,
  ): ReactElement | null;

  export function FhirPagination(
    props: FhirPaginationProps<MantineFhirPaginationProps>,
  ): ReactElement | null;
}
```

In this example, we override the `<FhirValue />` and `<FhirPagination />` components to appy the rendererProps for
Mantine.
