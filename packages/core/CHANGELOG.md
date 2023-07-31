# @bonfhir/core

## 2.10.0

### Minor Changes

- [#12](https://github.com/bonfhir/bonfhir2/pull/12) [`a6d153d`](https://github.com/bonfhir/bonfhir2/commit/a6d153d45dca46606357d8dcb79c822ecf754504) Thanks [@julienblin](https://github.com/julienblin)! - `compareBy` now accepts reverse sort argument (e.g. "-name")

- [#12](https://github.com/bonfhir/bonfhir2/pull/12) [`fb36662`](https://github.com/bonfhir/bonfhir2/commit/fb36662acfd6fb62356aa932fff75860671e63b8) Thanks [@julienblin](https://github.com/julienblin)! - Add `asBundlePagination` helper

## 2.9.0

### Minor Changes

- [#11](https://github.com/bonfhir/bonfhir2/pull/11) [`c1774da`](https://github.com/bonfhir/bonfhir2/commit/c1774da720175e1131919fd16faa79a402aac6ea) Thanks [@julienblin](https://github.com/julienblin)! - Add template option to HumanName formatter

- [#10](https://github.com/bonfhir/bonfhir2/pull/10) [`47ba701`](https://github.com/bonfhir/bonfhir2/commit/47ba7010975779d8761e9cf3773764f0fb5e1232) Thanks [@julienblin](https://github.com/julienblin)! - Add GraphQL support in `FhirClient`

- [#8](https://github.com/bonfhir/bonfhir2/pull/8) [`7310c0d`](https://github.com/bonfhir/bonfhir2/commit/7310c0d07e95b82edde9b5662d76afcfbd04a868) Thanks [@julienblin](https://github.com/julienblin)! - Add `FhirClient.graph` method

## 2.8.0

### Minor Changes

- [`e5dd1d5`](https://github.com/bonfhir/bonfhir2/commit/e5dd1d5411f4ae68ecff706f2f0277ab766e7aac) Thanks [@julienblin](https://github.com/julienblin)! - [Housekeeping] - update typescript module resolution to "Bundler"

- [`3d1ce25`](https://github.com/bonfhir/bonfhir2/commit/3d1ce25cbc26d6b272f1388fd3210abea52ac50e) Thanks [@julienblin](https://github.com/julienblin)! - Add `duration.subtract` API

### Patch Changes

- [`6b8e816`](https://github.com/bonfhir/bonfhir2/commit/6b8e8164afea6c06de22bf8e1313b29057a9ff6e) Thanks [@julienblin](https://github.com/julienblin)! - [Housekeeping] - Update dependencies

- [`623cac8`](https://github.com/bonfhir/bonfhir2/commit/623cac852d3f84ff5209282069a0d1d95a8b30cc) Thanks [@julienblin](https://github.com/julienblin)! - Relaxed typing on `client.transaction` and `client.batch`

## 2.7.0

### Minor Changes

- [`9e3bea5`](https://github.com/bonfhir/bonfhir2/commit/9e3bea5cfdc6e77b4880e736cdf066c2c6b3d4e6) Thanks [@julienblin](https://github.com/julienblin)! - Add `asResolvableReferences` helper function

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
