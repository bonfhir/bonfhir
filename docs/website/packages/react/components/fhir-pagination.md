---
title: <FhirPagination />
---

The `<FhirPagination />` helps with executing pagination on a [FHIR search query and bundle](/packages/core/fhir-client#search-builders-and-bundle-navigators).

It is designed to work in conjunction with the `useFhirSearch` and `useFhirSearchController` hooks, but can be used independently if need be.

## Example usage

```tsx
// The search controller coordinates activities and actions between the <FhirTable /> and the query.
const orgsSearchController = useFhirSearchController({
  defaultSort: "name",
  pageSize: 20,
});

const organizationQuery = useFhirSearch(
  "Organization",
  (search) =>
    search
      ._include("Organization", "partof")
      // The page size and sort must be controlled by the search controller, and passed to the query appropriately.
      ._count(orgsSearchController.pageSize)
      ._sort(orgsSearchController.sort)
      // The total must be requested for the pagination to work. Otherwise, you'll see a 0 out of 0 count.
      ._total("accurate"),
  // The third argument to the `useFhirSearch` hook is the page url that is manipulated by the search controller.
  orgsSearchController.pageUrl
);

return (
  <FhirTable
    {...organizationQuery}
    {...orgsSearchController}
    columns={[...]}
  />
  // Both the query and the controller are spread to the pagination, so that pages can be counted,
  // and page changes can be acted on the controller itself.
  <FhirPagination
    {...organizationQuery}
    {...orgsSearchController}
  />
```

## Note

The capabilities of the pagination depends on the server support - most notably, the `first` and `last` links in the
[returned bundle](https://hl7.org/fhir/bundle-definitions.html#Bundle.link).

If the server omits those values, the pagination may disable some capabilities.

## Preview

<iframe src="https://bonfhir.dev/storybook/iframe.html?args=&id=bonfhir-navigation-fhirpagination--default&viewMode=story" width="100%" />
