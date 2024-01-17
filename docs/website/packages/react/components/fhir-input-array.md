---
title: <FhirInputArray />
---

The `<FhirInputArray />` manages values that are repeated (e.g. when the FHIR cardinality is 0...\*).

As with [`<FhirInput />`](/packages/react/components/fhir-input), it is a controlled component.

:::tip

Although it can be use with a simple `useListState` as shown below, it should probably be used with a form hook / system for maximum power.  
See [`useFhirForm`](/packages/react/mantine/use-fhir-form) or [`useFhirResourceForm`](/packages/react/mantine/use-fhir-resource-form) for more information.

:::

## Example usage

```tsx
// This example uses the `useListState` from Mantine for simplicty sake - https://mantine.dev/hooks/use-list-state/
const [identifiers, setIdentifiers] = useListState<Identifier>([]);

return (
  <FhirInputArray
    label="Identifiers"
    value={identifiers}
    min={1}
    max={10}
    onAdd={(index) => setIdentifiers.insert(index + 1, {})}
    onRemove={(index) => setIdentifiers.remove(index)}
  >
    {({ index }) => (
      <FhirInput
        type="Identifier"
        value={identifiers[index]}
        onChange={(identifier) => {
          if (identifier) {
            setIdentifiers.setItem(index, identifier);
          }
        }}
      />
    )}
  </FhirInputArray>
);
```

The child is a function that gets the index of the element in the array.

## Preview

<iframe src="https://bonfhir.dev/storybook/iframe.html?args=&id=bonfhir-inputs-fhirinputarray--default&viewMode=story" width="100%" />
