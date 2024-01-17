# Bonfhir

A collection of projects and libraries to help implement [FHIR](https://hl7.org/fhir/)-based products and solutions.

Documentation: https://bonfhir.dev

# BonFHIR Quickstart

### Prerequisites

- node/npm
- [Docker](https://docs.docker.com/desktop/)

### Create a starter app from one of the templates

`$ npm create bonfhir`

The current starter templates are the following:

- **playground:** A simple playground to get started playing with bonFHIR core.
- **vite:** A Vite SPA project with BonFHIR UI and React-Router.
- **lambda:** An AWS Lambda serverless application connected to a FHIR Server.
- **next:** A Next.js app with BonFHIR UI & Subscription API, with NextAuth
  integration.
- **monorepo:** A Monorepo with a Web app (SPA), an AWS Lambda API, and supporting
  packages. This for more advanced projects.

### Run a sample FHIR server

Once you have an application up and running the next step is connecting to some data. Provided is a docker image you can run locally with some test data.

_From within your new bonFHIR application_  
Start the FHIR backend  
`$ npm run fhir:start-server`

Ensure the backend is running at [localhost:8100](http://localhost:8100)

Authenticate with credentials `admin@example.com` / `medplum_admin` / Use "Default Project"

Load some test data  
`npm run fhir:add-sample-data`

**Note:** The following error occurs if using a version of Node prior to 18

> ReferenceError: fetch is not defined

### Start building!

Using the provided bonFHIR utilities and components start building! Here is a simple React example to get you started

```javascript
import { useFhirSearch } from "@bonfhir/query/r4b";
import { FhirTable, FhirValue } from "@bonfhir/react/r4b";
import { Paper } from "@mantine/core";

export default function Home() {
  const patientQuery = useFhirSearch("Patient");

  return (
    <Paper>
      <FhirTable
        {...patientQuery}
        columns={[
          {
            key: "name",
            title: "Name",
            render(patient) {
              return <FhirValue type="HumanName" value={patient.name} />;
            },
          },
        ]}
      />
    </Paper>
  );
}
```
