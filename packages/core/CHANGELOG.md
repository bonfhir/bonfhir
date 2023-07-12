# @bonfhir/core

## 2.6.3

### Patch Changes

- [`736f659`](https://github.com/bonfhir/bonfhir2/commit/736f6599e8ed28b1264923f8e7222aec24d79dd4) Thanks [@julienblin](https://github.com/julienblin)! - Fix missing RatioRange formatter

- [`402b786`](https://github.com/bonfhir/bonfhir2/commit/402b786446ecca8876a7ed08e736988cf2fa2317) Thanks [@julienblin](https://github.com/julienblin)! - Fix `RecursiveResolvableReferences` signature to allow functions to work.

## 2.6.2

### Patch Changes

- 6b0914a: Fix a small bug in formatter decorator that displayed the decorator even when value is empty
- 63111a1: Add `disableSameOriginCheck` in FetchFhirClient options to support GCP HealthCare API

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
