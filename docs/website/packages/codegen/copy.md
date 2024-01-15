---
sidebar_position: 2
title: Copying
description: codegen's copy function
---

The `copy` function is designed to facilitate the duplication of source code from one FHIR version to another.

## Basic Example

### Set Up Your Source and Target Directories

Ensure that you have two directories: one for the source FHIR version and another for the target FHIR version. For example, you might have a directory structure like this:

- `src/r5` (source)
- `src/r4b` (target)

### Prepare Conditional Preprocessing

If you need conditional preprocessing (such as including code only for specific FHIR versions), add preprocessing directives to your source files. For example:

```ts
// #if fhir >= r5
// Specific code for FHIR version r5 or higher
// #endif
```

### Run the Codegen Command

Next, run this command from your terminal to use the `copy` function. Here's an example:

```bash
npx -y @bonfhir/codegen copy --source-fhir r5 --target-fhir r4b --source "./r5" --target "./r4b"
```

- Adjust the `--source-fhir` and `--target-fhir` flags to match your source and target FHIR versions.
- Specify the correct paths for your source and target directories in the `--source` and `--target` commands.

:::note

This tool expects [prettier](https://prettier.io/) to be present in the environment, as it will run after the files are altered.

:::

### Verify the Results

Check your target directory (e.g., src/r5) to ensure that the files have been copied and preprocessed as expected. Imported FHIR version paths in these files should be updated to the target version (ex. e.g. `import "@bonfhir/core/r5"` -> `"@bonfhir/core/r4b"`), and conditional preprocessing directives should have been correctly applied.
