---
sidebar_position: 3
title: Actions
description: Use the FHIR API in workflows
---

### All actions

bonFHIR Actions allow interactions with a FHIR API.

The following actions are supported:

- [Create](https://hl7.org/fhir/http.html#create) a FHIR Resource
- [Delete](https://hl7.org/fhir/http.html#delete) a FHIR Resource
- [Get the history](https://hl7.org/fhir/http.html#history) of a FHIR Resource
- [Patch](https://hl7.org/fhir/http.html#patch) a FHIR Resource
- [Read](https://hl7.org/fhir/http.html#read) a FHIR Resource
- Resolve FHIR references
- [Search](https://hl7.org/fhir/http.html#search) FHIR Resources
- [Update](https://hl7.org/fhir/http.html#update) a FHIR Resource
- [Get a specific version](https://hl7.org/fhir/http.html#vread) of a FHIR Resource

![bonFHIR Node](/img/docs/n8n/bonfhir-node.png)

### Search pagination

When using search, the match FHIR resources are emitted (instead of the raw `Bundle`) so that it is easier to manipulate in the workflows.

You can toggle the `Retrieve All Pages?` option to retrieve all pages for the search and emit all the resources.  
Using Query parameters, you can make sure that the page size is reasonable (e.g. using a `_count` argument).

![Show Search Pagination](/img/docs/n8n/show-search-pagination.png)

### Search includes

When using a query parameter of type `_include` or `_revinclude`, the search action will inline the included resources in the resulting
items, to simplify usage in the workflow.

![Show Search Inclusion](/img/docs/n8n/show-search-inclusion.png)

### Resolving references

The "Resolve FHIR references" action allows to automatically fetch references from [`Reference`](https://hl7.org/fhir/references.html#Reference) fields.  
It supports both individual and array values.

When resolving multiple references, it will emit distinct items for each difference,
which allows to iterate over values using [n8n approach](https://docs.n8n.io/data/data-structure/).

![Resolve email references](/img/docs/n8n/resolve-email-references.png)

### Use FHIR Path

Sometime, you may want to narrow down the data returned, or extract a specific value attribute.

Each operation supports a [FHIR Path](https://hl7.org/fhirpath/N1/) field that can be used for this purpose.

![Show FHIRPath](/img/docs/n8n/show-fhirpath.png)
