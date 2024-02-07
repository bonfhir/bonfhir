---
title: <FhirTable />
---

The `<FhirTable />` component is designed to render data in a tabular fashion.

It is designed to work in conjunction with the `useFhirSearch` and `useFhirSearchController` hooks, but can be used independently if need be.

## Example usage

```tsx
// Using the useFhirSearch query directly
const organizationQuery = useFhirSearch("Organization", (search) =>
  search._include("Organization", "partof"),
);

return (
  <FhirTable
    // Spreading the query like this ensure that types flow to the render properly.
    {...organizationQuery}
    columns={[
      {
        key: "name",
        title: "Name",
        render: (org) => <FhirValue type="string" value={org.name} />,
      },
      {
        key: "address",
        title: "Address",
        render: (org) => (
          <FhirValue type="Address" value={org.address} options={{ max: 1 }} />
        ),
      },
      {
        key: "partof",
        title: "Part of",
        render: (org) => (
          <FhirValue type="string" value={org.partOf?.included()?.name} />
        ),
      },
    ]}
  />
);
```

Each column can provide its own renderer that is used for each cell.

## Row navigation

There is built-in support for row navigation when a row is clicked, using the [configured navigation on the `<FhirUIProvider />`](/packages/react/get-started#navigation).

```tsx
// Return the target url to navigate to.
<FhirTable onRowNavigate={(org) => `/organizations/${org.id}`} />
```

## Sorting support

When used in tandem with a [search controller](/packages/react/components/use-fhir-search-controller), the table can provide automatic server-side
sorting.  
The column `key` attrtibute must be a valid FHIR search parameter for the sorting to work properly.

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
      // The page size and sort must now be controlled by the search controller, and passed to the query appropriately.
      ._count(orgsSearchController.pageSize)
      ._sort(orgsSearchController.sort),
);

return (
  <FhirTable
    {...organizationQuery}
    // The search controller is spread as well. which allows the table to update the sort order on demand.
    {...orgsSearchController}
    columns={[
      {
        key: "name",
        title: "Name",
        sortable: true, // This column will be sortable, and will use the "name" search parameters
        render: (org) => <FhirValue type="string" value={org.name} />,
      },
      {
        key: "_lastUpdated",
        title: "Last Updated",
        sortable: true, // This column will be sortable, and will use the "_lastUpdated" search parameters
        render: (org) => (
          <FhirValue type="instant" value={org.meta.lastUpdated} />
        ),
      },
    ]}
  />
```

## Preview

<iframe src="https://bonfhir.dev/storybook/iframe.html?args=&id=bonfhir-data-display-fhirtable--default&viewMode=story" width="100%" />
