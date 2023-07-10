# @bonfhir/core

## 2.6.1

### Patch Changes

- 9b6fed3: Fix a bug with the bundle navigator when using proxies of proxies
- c12f853: Fix refReference and refIncluded select type signature to allow nullish in array
- 0d5101b: Fix a bug with undefined references + better type information
- 085f18f: FetchFhirClient: allow auth function to return a string or undefined

## 2.6.0

### Minor Changes

- 11b949d: Fix codegen problem with allowed types extensions for OperationParameters
- 7891d57: Add fhir... date time helpers

### Patch Changes

- 9b1d478: Updated dependencies, including Prettier/ESLint that touched all files

## 2.5.0

### Minor Changes

- 67e1380: `client.createOr` now returns a `Retrieved` resource
- 49f07c1: Add dateTime helpers

## 2.4.0

### Minor Changes

- (Hopefully) finally fix decimal.js packaging

## 2.3.0

### Minor Changes

- Fix decimal.js packaging issue

## 2.2.0

### Minor Changes

- Fix FHIR type generation

## 2.1.0

### Minor Changes

- Multiple fixes to types + dependency bumps
