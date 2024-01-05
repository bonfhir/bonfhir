---
sidebar_position: 20
title: useFhirCapabilities
description: Read FHIR server capabilities
---

Return a [Query](https://tanstack.com/query/latest/docs/react/guides/queries) for a
[capabilities](https://hl7.org/fhir/http.html#capabilities) request.

```tsx
import { useFhirCapabilities } from "@bonfhir/query/r4b";
import { FhirQueryLoader } from "@bonfhir/react/r4b";

export default function MyComponent() {
  const capabilitiesQuery = useFhirCapabilities();
  const normativeCapabilitiesQuery = useFhirCapabilities("normative");

  return (
    <FhirQueryLoader query={capabilitiesQuery}>
      {(result) => result.title}
    </FhirQueryLoader>
  );
}
```
