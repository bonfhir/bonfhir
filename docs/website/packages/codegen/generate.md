---
sidebar_position: 1
title: Generating
description: codegen's generate function
---

The generate function loads FHIR structure definition files and uses them to generate code according to templates you provide. These templates are written in [EJS format](https://ejs.co/), and the generator is agnostic to the target programming language. The files that generate the definitions can be found at [packages/codegen/definitions/fhir](https://github.com/bonfhir/bonfhir/tree/main/packages/codegen/definitions/fhir).

## Basic Example

### Prepare your Template

Prepare an EJS formatted template, or multiple templates, and store them in a folder called `/templates` in your project. Here is a basic example of a template:

```ejs title="resource-names.ts.ejs"
export const ResourceNames = [<% for (const structureDef of fhir.resources) { -%>
  "<%= structureDef.type -%>",
<% } -%>];
```

- This template will produce an array of resource names.
- `fhir` is the variable injected into the context that has the [FHIR structure definitions](https://github.com/bonfhir/bonfhir/blob/main/packages/codegen/src/fhir/fhir-definitions.ts) loaded.

### Run the Codegen Command

Next, run this command from your terminal to use the `generate` function. Here's an example:

```bash
npx -y @bonfhir/codegen generate --fhir r4b -t ./templates/**/*.ejs -b ./templates -p 'prettier --write %files%' -o ./your-output-path
```

- Make sure to specify an output path for your code in the `-o` command
- specify the version of FHIR you want to use with `--fhir`. You can specify multiple FHIR versions at once: `r5, r4b`. In the case of multiple versions, the output can be templated - e.g. `-o "./src/<%= fhir.release %>"`

:::note

This tool expects [prettier](https://prettier.io/) to be present in the environment.

:::

### Test Generated Code in Your Project

Your code will be added to your output destination, and it's final file name will be the name of the template with the addition of `**.codegen.**`, minus the extension of `*.ejs` (e.g. `resource-names.ts.ejs` -> `resource-names.codegen.ts`).

The example template above will produce something like this:

```ts
export const ResourceNames = [
  "Account",
  "ActivityDefinition",
  "AdministrableProductDefinition",
  "AdverseEvent",
  "AllergyIntolerance",
  "Appointment",
  "AppointmentResponse",
  "AuditEvent",
...
```
