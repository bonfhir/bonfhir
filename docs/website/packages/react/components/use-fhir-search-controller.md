---
title: useFhirSearchController
---

The `useFhirSearchController` hook manages the synchronization between a query and a table and pagination.

See the examples in [`<FhirTable />`](/packages/react/components/fhir-table) and [`<FhirPagination />`](/packages/react/components/fhir-pagination) to better understand the relationship between all components.
[Going through our tutorial](/docs/build-a-fhir-app-with-react/fhir-tables-with-pagination) might also be beneficial.

## Basic usage

```tsx
import { useFhirSearchController } from "@bonfhir/react/r4b";

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
  />);
```

## Add search parameters

In addition to managing pagination and sorting, the search controller can also manages search parameters.

```tsx
const orgsSearchController = useFhirSearchController({
  defaultSort: "name",
  pageSize: 20,
  // Always provide default search parameters. This also create a type for the search object.
  defaultSearch: {
    name: "",
  },
});

const organizationQuery = useFhirSearch(
  "Organization",
  (search) =>
    search
      ._include("Organization", "partof")
      ._count(orgsSearchController.pageSize)
      ._sort(orgsSearchController.sort)
      ._total("accurate")
      // Search parameters must be added to the search query builder
      .name(orgsSearchController.search?.name),
  orgsSearchController.pageUrl,
);

return (
  <>
    <FhirInput
      type="string"
      label="Name"
      placeholder="Search by name"
      // The <FhirInput /> can be controlled directly by the search controller.
      value={orgsSearchController.search?.name}
      onChange={(name) =>
        // This triggers the query on search change.
        orgsSearchController.onSearch((prevSearch) => ({
          ...prevSearch,
          name,
        }))
      }
    />
    <FhirTable
      {...organizationQuery}
      {...orgsSearchController}
      columns={[{ key: "name", title: "Name", render: (org) => org.name }]}
    />
  </>
);
```

## Use external state management

The search controller state can be managed externally.  
This is very useful to project it to the url query parameters, allowing urls to reflect the search state.
Your SPA app now behaves like a server-side rendered app, with support for URL sharing and bookmarks on search!

```tsx
import { OrganizationSortOrder } from "@bonfhir/core/r4b";
import {
  useFhirSearchController,
  useURLSearchParamsStateManager,
} from "@bonfhir/react/r4b";
import { useSearchParams } from "react-router-dom";

// When using a state manager, you need to provide the sort type as a generic argument to avoid any issues.
const orgsSearchController = useFhirSearchController<OrganizationSortOrder>({
  defaultSort: "name",
  pageSize: 20,
  defaultSearch: {
    name: "",
  },
  // This is the solution for React router.
  // We also provide a package for Next.js.
  // Any other router needs to provide its own implementation as the second argument.
  stateManager: useURLSearchParamsStateManager("search", useSearchParams()),
});
```

The first argument to `useURLSearchParamsStateManager` is the scope (which is the name of the url search parameters used
to store the search state). This allows multiple, independent search controllers to be placed on the same page, with
different scopes.
