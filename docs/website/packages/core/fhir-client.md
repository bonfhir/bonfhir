---
sidebar_position: 2
title: FHIR Client
description: Access FHIR Servers
---

The `FhirClient` is an important piece of the `core` package.
It manages all interactions with a FHIR server, and provides useful extensions to manipulate batches, extensions, bundles, etc.

The `FhirClient` is intentionaly defined as an interface, and we provide an implementation (`FetchFhirClient`) that uses the [fetch API in the browser and node](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) that should work in most contexts.

## Initialize

```typescript
import { FetchFhirClient, FhirClient } from "@bonfhir/core/r4b";

// Initialize a new client with a fixed `Authorization` value
const client: FhirClient = new FetchFhirClient({
  baseUrl: "http://fhir-server/fhir/R4",
  auth: "Basic <basic-auth-key>",
});

// Initialize using a OAuth client_credentials flow
const client: FhirClient = new FetchFhirClient({
  baseUrl: "http://fhir-server/fhir/R4",
  auth: {
    tokenUrl: "http://auth-server/oauth2/token",
    clientId: "xxx",
    clientSecret: "xxx",
  },
});

// Initialize using a custom function for the `Authorization` header
// Called on every request
const client: FhirClient = new FetchFhirClient({
  baseUrl: "http://fhir-server/fhir/R4",
  auth: async(input, init) => ...,
});

// Worst case scenario - take control of the `fetch` implementation
const client: FhirClient = new FetchFhirClient({
  baseUrl: "http://fhir-server/fhir/R4",
  fetch: async (input, init) => myFetch(input, init)
});
```

## CRUD

The client supports basic FHIR CRUD operations.
Take note that they return a typed `Retrieved` resource (e.g. `Retrieved<Patient>`), so that you can differentiate from
resources that are only materialized in the client at the moment.

```typescript
declare const client: FhirClient;

const patient = await client.read(
  "Patient",
  "29a34226-4c5a-4c19-b0a1-f45909b7f1df",
);

const patientVersion = await client.vread(
  "Patient",
  "29a34226-4c5a-4c19-b0a1-f45909b7f1df",
  "0737483c-1e93-45d4-8161-18e3d3b9c7fe",
);

const newPatient = await client.create(
  build("Patient", { name: [{ family: "Doe", given: ["John"] }] }),
);

newPatient.birthDate = "1998-02-03";
const updatedPatient = await client.update(newPatient);

const patchedPatient = await client.patch(
  "Patient",
  "29a34226-4c5a-4c19-b0a1-f45909b7f1df",
  (patch) => patch.add("/active", true).remove("/name/0/family"),
);

await client.delete(patient);

// This creates if there is no `id`, or update if there is.
const patient = await client.save(patient);

// Escape hatch - perform any arbitrary fetch operations on the server
await client.fetch<NonStandardFHIRResourceResponseType>(
  "NonStandardFHIRResource",
  { method: "POST" },
);
```

## Search builders and bundle navigators

The client features built-in typed search parameters and bundle navigation facilities.
Most notably, it can resolve `_include` and `_revinclude` resources from the primary resources.
The searching inside the bundle is indexed lazily, so you do not need to maintain any external dictionary / indexing
of resources.

```typescript
// This is an example search operation
const result = await client.search("Observation", (search) =>
  search
    .status("final")
    .subject(patient)
    ._count(100)
    ._sort("-date")
    ._include("Observation", "patient")
    ._revinclude("Encounter", "reason-reference"),
);

const allMatchingObservations = result.searchMatch();

// Search parameters can be added even if their are not from the base FHIR profile
// All FHIR search parameter types are supported (look for `-Param` methods)
const result = await client.search("Observation", (search) =>
  search.dateParam("date", "2020-01-01", "gt"),
);

// Last resort - pass the search query as a string
const result = await client.search("Observation", "_date:gt=2020-01-01");

// Get access directly to the included subject from the search operation
// This searches the result bundle through a lazily-created index; no need to build any dictionary yourself.
// `_revinclude` references are also dynamically indexed.
const firstObservation = allMatchingObservations[0]!;
const includedSubject = firstObservation.subject?.included();
const encountersReferencingFirstObservation =
  firstObservation.revIncluded<Encounter>((x) => x.reasonReference);

// Access the underlying Bundle
const rawBundle = result.bundle;

// Accessing the next page
const hasNextPage = Boolean(result.linkUrl("next"));
if (hasNextPage) {
  const nextPageResult = await client.fetchPage(result.linkUrl("next")!);
}

// Iterate over result pages and invoke a method on each page
await client.searchByPage(
  "Patient",
  (search) => search.active("true")._count(200),
  async (page) => {
    const allPAtientsInThePage = page.searchMatch();
  },
);

// Or retrieve all pages at once
// Be careful with this one as it may take a _long_ time and take too much memory.
const allResultsAggregated = await client.searchAllPages(
  "Condition",
  (search) => search.encounter(encounter)._count(100),
);
const allConditions = allResultsAggregated.searchMatch();
```

## Operations

The client can also execute [FHIR Operations](https://hl7.org/fhir/operations.html).

```typescript
// Perform a GET operation that do not affect state
const result = await client.execute<ValueSet>({
  operation: "$expand",
  resourceType: "ValueSet",
  parameters: [
    {
      name: "url",
      valueUrl: "http://hl7.org/fhir/ValueSet/encounter-status",
    },
  ],
});

// Perform a POST operation that do affect state
const result = await client.execute<Group>({
  affectsState: true,
  operation: "$add",
  resourceType: "Group",
  resourceId: "49e433b0-d7d5-4118-91b1-5fd60995cde2",
  parameters: [
    {
      name: "additions",
      resource: patient,
    },
  ],
});
```

A `BundleNavigator` can also be used on any bundle, without going through the client:

```typescript
declare const bundle: Bundle<Patient>;
const navigator = bundleNavigator(bundle);
const patients = navigator.searchMatch();
```

## Batch/Transaction builder

The client includes a builder to help with creating [FHIR Batch or Transation Bundles](https://hl7.org/fhir/http.html#transaction).

```typescript
// Create a batch builder to register multiple requests at once.
const batch = client.batch();

// Register a search for communication requests
// At this point, the results are not available yet - we only get a handle for later.
// The batch builder exposes the same API as the client, but instead of returning values directly,
// it returns a future request handle.
const communicationsFutureRequest = batch.search(
  "CommunicationRequest",
  (search) =>
    search
      .patient("Patient/fe88522e-2864-4be9-bb43-7bd4c1031687")
      .status("active")
      ._count(100),
);

// Register another read request for an encounter
const encounterFutureRequest = batch.read(
  "Encounter",
  "10d5f280-8a7f-43fd-925a-f82e5db56be9",
);

// And finally register an operation to expand a value set
const valueSetExpandedFutureRequest = batch.execute<ValueSet>({
  operation: "$expand",
  resourceType: "ValueSet",
  parameters: [
    {
      name: "url",
      valueUrl: "http://hl7.org/fhir/ValueSet/encounter-status",
    },
  ],
});

// Once all requests are registered, we can execute them in parallel.
await batch.send();

// Results are now available for each handle
const allCommunications = communicationsFutureRequest.resource.searchMatch();
const encounter = encounterFutureRequest.resource; // As we the API, this will throw if not found
const valueSetExpansion = valueSetExpandedFutureRequest.resource?.expansion;

// Each future request is aware of the availability of the result
const isResultAvailable = communicationsFutureRequest.sent;

// More details of the underlying bundle are also available if need be
// like the request and response entries in the respective bundles
communicationsFutureRequest.requestEntry;
communicationsFutureRequest.responseEntry;
batch.request;
batch.response;
```

The transaction builder works the same way, but has an additional trick up its sleeve:
it can manage intra-bundle references.

```typescript
// Create a transaction builder to register multiple requests at once.
const transaction = client.transaction();

// Register a create request for a new organization.
const organizationFutureRequest = transaction.create(
  build("Organization", { name: "Acme, Inc" }),
);

// Register a create request for a new practitioner.
const practitionerFutureRequest = transaction.create(
  build("Practitioner", {
    name: [{ given: ["John"], family: "Doe" }],
  }),
);

// Register a create request for a new patient.
// Notice how we can use the previous future requests to reference the organization and practitioner,
// even though they have not been created yet.
const patientFutureRequest = transaction.create(
  build("Patient", {
    managingOrganization: organizationFutureRequest.reference,
    generalPractitioner: [practitionerFutureRequest.reference],
  }),
);

// Send the transaction bundle to the FHIR server.
await transaction.send();

// If all goes well, the transaction will have created the organization, practitioner, and patient.
const patient = patientFutureRequest.resource;
```

## Mergers

The client also exposes some facilities to intelligently merge resources based on search criteria.
This is particularly helpful in data import scenarios where you need to import the same conceptual resource
(think e.g. a patient) multiple times and you want to avoid duplication or lost information.

```typescript
// Assume that you've received an updated patient resource.
declare const updatedPatient: Patient;

// Using the `createOr()` method, you can declaratively choose the merging behavior that you want.

// return the existing resource if it exists, or create a new one if it doesn't
const [finalPatient, updatedPatientReplacedTheExistingOne] =
  await client.createOr("return", updatedPatient);

// systematically replace the existing resource with the updated one
const [finalPatient, updatedPatientReplacedTheExistingOne] =
  await client.createOr("replace", updatedPatient);

// systematically add a new resource regardless of a previous one.
const [finalPatient] = await client.createOr("add", updatedPatient);

// Merge the updated resource with the existing one and replace the existing one with the result.
const [finalPatient, patientsWereMerged] = await client.createOr(
  "merge",
  updatedPatient,
);
```

How are resources matched? Not by `id`, that would make no sense.
By default, they use the most likely attribute to perform the search, from top to bottom:

- the `url` for [Definition resources](https://hl7.org/fhir/definition.html)
- the `identifier` if the resource have some (e.g. `Patient`, `Practitioner`)
- the `name` if it is a simple value (e.g. `Organization`)

These default should work as expected in most cases.
Using `identifier` in particular, if you store the source system id with a custom system, should work very reliably.
If you want to be sure, you can specify the search criteria:

```typescript
// Merge a condition based on matching the same subject, recordedDate and code.
const [finalCondition, wasMerged] = await client.createOr(
  "merge",
  updatedCondition,
  (search) =>
    search
      .subject(updatedCondition.subject)
      .recordedDate(updatedCondition.recordedDate)
      .code(updatedCondition.code?.coding?.[0]),
);
```

It is possible to use the merging functionality directly as well:

```typescript
const [result, wasUpdated] = merge(current, incoming);
```

And how are resources merged?
There is a default strategy for merging resources is basic, and recursive:

- add missing values simple values from the source
- replace conflicting simple values with the updated value
- merge arrays by matching elements if they are equal (deep comparison), or they have the same `id` value

Narratives are ignored during the merge, and re-generated on the final resource.  
Some [`Meta`](https://hl7.org/fhir/resource.html#Meta) attributes are also ignored.

It is possible to customize this strategy by passing an array of `mergers` to the `createOr` function.
Have a look at existing `mergers` implementation to understand how it works.
The tests for the mergers should also informs you about final results.

## GraphQL

The client also supports executing [GraphQL operations](https://hl7.org/fhir/graphql.html) if the FHIR Server supports it.
While it can be used with free-text queries, it is best to use it with [the GraphQL Code Generator](https://the-guild.dev/graphql/codegen)
and [`TypedDocumentNode`](https://github.com/dotansimha/graphql-typed-document-node) to ensure type safety for GraphQL operations.

[This guide](https://the-guild.dev/graphql/codegen/docs/getting-started) should walk you through installing the GraphQL
code generator in your solution.

```typescript
// This is a sample of how to use the client to make a GraphQL query using free text
const result = await client.graphql(
  /* GraphQL */ `
    query ListOrganizations($name: String, $_count: Int, $_sort: String) {
      OrganizationList(name: $name, _count: $_count, _sort: $_sort) {
        resourceType
        id
        name
        identifier {
          value
        }
      }
    }
  `,
  {
    name: "Test",
    _count: 10,
    _sort: "name",
  },
);

// Or if you configure your project to use TypedDocumentNode - see https://the-guild.dev/graphql/codegen/docs/getting-started
// you can have fully typed GraphQL queries
const listOrganizationDocument = graphql(/* GraphQL */ `
  query ListOrganizations($name: String, $_count: Int, $_sort: String) {
    OrganizationList(name: $name, _count: $_count, _sort: $_sort) {
      resourceType
      id
      name
      identifier {
        value
      }
    }
  }
`);

// result here is fully typed :-)
const result = await client.graphql(listOrganizationDocument, {
  name: "Test",
  _count: 10,
});
const orgs = result.OrganizationList.map(...);

// The graphqlResult gives you the full GraphQL response - this allows you to handle partial errors scenario and more
const graphQLResult = await client.graphqlResult(listOrganizationDocument, {
  name: "Test",
  _count: 10,
});
const orgs = graphQLResult.data?.OrganizationList?.map(...);
```
