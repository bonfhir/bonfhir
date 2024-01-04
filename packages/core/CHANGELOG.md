# @bonfhir/core

## 2.17.2

### Patch Changes

- [#171](https://github.com/bonfhir/bonfhir/pull/171) [`f6a3c72`](https://github.com/bonfhir/bonfhir/commit/f6a3c72642654cf5c09a75789a9415150b95aeca) Thanks [@julienblin](https://github.com/julienblin)! - Fix #167 - `toFhirResource` should exclude functions

## 2.17.1

### Patch Changes

- [#153](https://github.com/bonfhir/bonfhir/pull/153) [`acda662`](https://github.com/bonfhir/bonfhir/commit/acda6629c0af50ce5824501a9f01b1dc595e0dda) Thanks [@julienblin](https://github.com/julienblin)! - Fix #142 - do not duplicate date on `Period` formatter when it is the same

- [#147](https://github.com/bonfhir/bonfhir/pull/147) [`9766122`](https://github.com/bonfhir/bonfhir/commit/97661222b439b9a9174fd340fbab1a0cc7ff0b43) Thanks [@julienblin](https://github.com/julienblin)! - Fix #143 - duplicated decorator

- [#152](https://github.com/bonfhir/bonfhir/pull/152) [`9fbc13d`](https://github.com/bonfhir/bonfhir/commit/9fbc13d09c50aed82626b910560f3fb525142cdd) Thanks [@julienblin](https://github.com/julienblin)! - Fix #61 - add documentation to `compareBy`

- [#149](https://github.com/bonfhir/bonfhir/pull/149) [`304d6c7`](https://github.com/bonfhir/bonfhir/commit/304d6c7868a352d2baad95dbd98cb8bd2b2848de) Thanks [@julienblin](https://github.com/julienblin)! - Fix #141 - support retrieved resources in search references

## 2.17.0

### Minor Changes

- [#138](https://github.com/bonfhir/bonfhir/pull/138) [`07783ef`](https://github.com/bonfhir/bonfhir/commit/07783ef61c461be6b2dc2b07b42f52d9df219d2a) Thanks [@julienblin](https://github.com/julienblin)! - Fix #133 - add `toFhirResource` to extended resources

- [#131](https://github.com/bonfhir/bonfhir/pull/131) [`13518b0`](https://github.com/bonfhir/bonfhir/commit/13518b0df35986b8a6b1a568034f95edef6c196d) Thanks [@julienblin](https://github.com/julienblin)! - Fix #118 - Handling of Choice of DataTypes - add the `choice` formatter + `choiceOfDataTypes` helper

- [#138](https://github.com/bonfhir/bonfhir/pull/138) [`da9eff6`](https://github.com/bonfhir/bonfhir/commit/da9eff60436a8e5a562eb0464469f548f899b062) Thanks [@julienblin](https://github.com/julienblin)! - Fix #136 - add profile to `extendResource`

- [#130](https://github.com/bonfhir/bonfhir/pull/130) [`2f10415`](https://github.com/bonfhir/bonfhir/commit/2f1041545802f890b7c2f6676218a21da9acaf73) Thanks [@julienblin](https://github.com/julienblin)! - Fix #112 - add `asResource`, `findReference` and `findReferences` helpers

- [#138](https://github.com/bonfhir/bonfhir/pull/138) [`c7891dc`](https://github.com/bonfhir/bonfhir/commit/c7891dc71b74e7a04d0ad33c927bd29a9bedc92c) Thanks [@julienblin](https://github.com/julienblin)! - Fix #137 - add `onFhirResource` callback to `extendResource`

### Patch Changes

- [#134](https://github.com/bonfhir/bonfhir/pull/134) [`67aab61`](https://github.com/bonfhir/bonfhir/commit/67aab613fd348f5386e948ec839534cc50928669) Thanks [@julienblin](https://github.com/julienblin)! - Update `marked`` internal dependency for markdown parsing/rendering

## 2.16.1

### Patch Changes

- [#97](https://github.com/bonfhir/bonfhir/pull/97) [`ad86aa05`](https://github.com/bonfhir/bonfhir/commit/ad86aa058bd100ac1f95b25c09ad18fa7cbafa85) Thanks [@julienblin](https://github.com/julienblin)! - Update dependencies

## 2.16.0

### Minor Changes

- [#89](https://github.com/bonfhir/bonfhir/pull/89) [`a53ae609`](https://github.com/bonfhir/bonfhir/commit/a53ae6092577d373ef97c3ddf5f6a1e826096640) Thanks [@julienblin](https://github.com/julienblin)! - Fix #88: add support for GraphQL Execution Result / partial errors

### Patch Changes

- [#87](https://github.com/bonfhir/bonfhir/pull/87) [`775753f0`](https://github.com/bonfhir/bonfhir/commit/775753f0cc1ec05f6c853301a2abe413a75e719f) Thanks [@julienblin](https://github.com/julienblin)! - Fix #86: make `parameters` optional on `searchAllPages`

## 2.15.0

### Minor Changes

- [#59](https://github.com/bonfhir/bonfhir/pull/59) [`5a53a1f`](https://github.com/bonfhir/bonfhir/commit/5a53a1fcbf1f4b18c3250768292a0b56e46e27e0) Thanks [@julienblin](https://github.com/julienblin)! - Add `resourcesAreEqual` helper function to semantically compare resources

- [#73](https://github.com/bonfhir/bonfhir/pull/73) [`200cc4b`](https://github.com/bonfhir/bonfhir/commit/200cc4bc3bf38d85ed24476c2751f12f176d329e) Thanks [@julienblin](https://github.com/julienblin)! - Update duration API: rename `round` to `convert` and add better rounding options.

- [#72](https://github.com/bonfhir/bonfhir/pull/72) [`7030b76`](https://github.com/bonfhir/bonfhir/commit/7030b7631f30c65e17ff83a074fce7d211c85cb6) Thanks [@julienblin](https://github.com/julienblin)! - Fix #71: Add `duration.round` and `duration.age` helpers

### Patch Changes

- [#77](https://github.com/bonfhir/bonfhir/pull/77) [`998396e`](https://github.com/bonfhir/bonfhir/commit/998396ec35090a2462dbfbaaa41f0a9a5babaa90) Thanks [@julienblin](https://github.com/julienblin)! - Fix #76 - subtypes with base of `Element` are missing from codegen

- [#62](https://github.com/bonfhir/bonfhir/pull/62) [`816e7d1`](https://github.com/bonfhir/bonfhir/commit/816e7d1d41db4de095f1df26af3a96f472e290c9) Thanks [@julienblin](https://github.com/julienblin)! - Update marked dependency

- [#59](https://github.com/bonfhir/bonfhir/pull/59) [`944bc6e`](https://github.com/bonfhir/bonfhir/commit/944bc6ea9a5e717359973ac2379e17b180bed8b8) Thanks [@julienblin](https://github.com/julienblin)! - Fix a bug in `client.createOr` that prevented using a search function parameter

## 2.14.2

### Patch Changes

- [#52](https://github.com/bonfhir/bonfhir/pull/52) [`7e5aa27`](https://github.com/bonfhir/bonfhir/commit/7e5aa27be94871f53688c9ef7ee893d1eee15a13) Thanks [@julienblin](https://github.com/julienblin)! - Make proxy properties writable

## 2.14.1

### Patch Changes

- [#50](https://github.com/bonfhir/bonfhir/pull/50) [`eb17f1c`](https://github.com/bonfhir/bonfhir/commit/eb17f1cd82062575b2a45dbb73acaa6b664c5160) Thanks [@julienblin](https://github.com/julienblin)! - Fix potential Infinite loop creation on `BundleNavigator` Proxy

## 2.14.0

### Minor Changes

- [#35](https://github.com/bonfhir/bonfhir/pull/35) [`6703e8d`](https://github.com/bonfhir/bonfhir/commit/6703e8d74804fc62eebabb5935de7be82a3bf999) Thanks [@julienblin](https://github.com/julienblin)! - Add support for global browser import

- [#37](https://github.com/bonfhir/bonfhir/pull/37) [`de78ae3`](https://github.com/bonfhir/bonfhir/commit/de78ae343c1a852b351332b4c7173365c1e1cb2e) Thanks [@julienblin](https://github.com/julienblin)! - Add support for `Reference` in `FhirClient.read`

- [#48](https://github.com/bonfhir/bonfhir/pull/48) [`5563dfc`](https://github.com/bonfhir/bonfhir/commit/5563dfc86995c2ae175c52f05e568481ce176954) Thanks [@julienblin](https://github.com/julienblin)! - Fix #44 - Breaking Change: Removed incorrect operations types

  The operation types were completely broken, and had to be removed in favor of this.
  This may break some client apps that rely on operations, but the change should be straightforward.

### Patch Changes

- [#47](https://github.com/bonfhir/bonfhir/pull/47) [`677a62a`](https://github.com/bonfhir/bonfhir/commit/677a62a547cfe31831b409e9a7757a302f1cdd91) Thanks [@julienblin](https://github.com/julienblin)! - Fix #39: Add ReferenceTarget helper to extract a reference target

- [#45](https://github.com/bonfhir/bonfhir/pull/45) [`cf01de0`](https://github.com/bonfhir/bonfhir/commit/cf01de0d5c740c28c446ef410acecf9dcf2f1c3a) Thanks [@julienblin](https://github.com/julienblin)! - Fix #43: `FhirClient.capabilities` returns TerminologyCapabilities when mode=terminology

## 2.13.0

### Minor Changes

- [#27](https://github.com/bonfhir/bonfhir/pull/27) [`510226e`](https://github.com/bonfhir/bonfhir/commit/510226eeb771b408026543f3ebba60fd461e2123) Thanks [@julienblin](https://github.com/julienblin)! - Add `onError` callback on `FetchFhirClient`.

## 2.12.0

### Minor Changes

- [#25](https://github.com/bonfhir/bonfhir/pull/25) [`cd479cf`](https://github.com/bonfhir/bonfhir/commit/cd479cf6d23c8c14a14a30ea73eb980e69d8445a) Thanks [@julienblin](https://github.com/julienblin)! - Add `isReferenceOf` helper

## 2.11.0

### Minor Changes

- [#14](https://github.com/bonfhir/bonfhir/pull/14) [`df80ae2`](https://github.com/bonfhir/bonfhir/commit/df80ae2d2d53590ee00bd5c6278aba5ef75ca9c2) Thanks [@julienblin](https://github.com/julienblin)! - Add `fhirDedupSearch`

## 2.10.0

### Minor Changes

- [#12](https://github.com/bonfhir/bonfhir/pull/12) [`a6d153d`](https://github.com/bonfhir/bonfhir/commit/a6d153d45dca46606357d8dcb79c822ecf754504) Thanks [@julienblin](https://github.com/julienblin)! - `compareBy` now accepts reverse sort argument (e.g. "-name")

- [#12](https://github.com/bonfhir/bonfhir/pull/12) [`fb36662`](https://github.com/bonfhir/bonfhir/commit/fb36662acfd6fb62356aa932fff75860671e63b8) Thanks [@julienblin](https://github.com/julienblin)! - Add `asBundlePagination` helper

## 2.9.0

### Minor Changes

- [#11](https://github.com/bonfhir/bonfhir/pull/11) [`c1774da`](https://github.com/bonfhir/bonfhir/commit/c1774da720175e1131919fd16faa79a402aac6ea) Thanks [@julienblin](https://github.com/julienblin)! - Add template option to HumanName formatter

- [#10](https://github.com/bonfhir/bonfhir/pull/10) [`47ba701`](https://github.com/bonfhir/bonfhir/commit/47ba7010975779d8761e9cf3773764f0fb5e1232) Thanks [@julienblin](https://github.com/julienblin)! - Add GraphQL support in `FhirClient`

- [#8](https://github.com/bonfhir/bonfhir/pull/8) [`7310c0d`](https://github.com/bonfhir/bonfhir/commit/7310c0d07e95b82edde9b5662d76afcfbd04a868) Thanks [@julienblin](https://github.com/julienblin)! - Add `FhirClient.graph` method

## 2.8.0

### Minor Changes

- [`e5dd1d5`](https://github.com/bonfhir/bonfhir/commit/e5dd1d5411f4ae68ecff706f2f0277ab766e7aac) Thanks [@julienblin](https://github.com/julienblin)! - [Housekeeping] - update typescript module resolution to "Bundler"

- [`3d1ce25`](https://github.com/bonfhir/bonfhir/commit/3d1ce25cbc26d6b272f1388fd3210abea52ac50e) Thanks [@julienblin](https://github.com/julienblin)! - Add `duration.subtract` API

### Patch Changes

- [`6b8e816`](https://github.com/bonfhir/bonfhir/commit/6b8e8164afea6c06de22bf8e1313b29057a9ff6e) Thanks [@julienblin](https://github.com/julienblin)! - [Housekeeping] - Update dependencies

- [`623cac8`](https://github.com/bonfhir/bonfhir/commit/623cac852d3f84ff5209282069a0d1d95a8b30cc) Thanks [@julienblin](https://github.com/julienblin)! - Relaxed typing on `client.transaction` and `client.batch`

## 2.7.0

### Minor Changes

- [`9e3bea5`](https://github.com/bonfhir/bonfhir/commit/9e3bea5cfdc6e77b4880e736cdf066c2c6b3d4e6) Thanks [@julienblin](https://github.com/julienblin)! - Add `asResolvableReferences` helper function

## 2.6.3

### Patch Changes

- [`736f659`](https://github.com/bonfhir/bonfhir/commit/736f6599e8ed28b1264923f8e7222aec24d79dd4) Thanks [@julienblin](https://github.com/julienblin)! - Fix missing RatioRange formatter

- [`402b786`](https://github.com/bonfhir/bonfhir/commit/402b786446ecca8876a7ed08e736988cf2fa2317) Thanks [@julienblin](https://github.com/julienblin)! - Fix `RecursiveResolvableReferences` signature to allow functions to work.

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
