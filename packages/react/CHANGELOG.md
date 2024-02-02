# @bonfhir/react

## 3.1.0

### Minor Changes

- [#232](https://github.com/bonfhir/bonfhir/pull/232) [`0e5160c`](https://github.com/bonfhir/bonfhir/commit/0e5160c48d5add91f1258712acaf96df77f0b505) Thanks [@julienblin](https://github.com/julienblin)! - Fix #201 - Add a `<FhirInfiniteMarker />` component

### Patch Changes

- [#233](https://github.com/bonfhir/bonfhir/pull/233) [`8849bbb`](https://github.com/bonfhir/bonfhir/commit/8849bbb096ac235ab9bcc128daf781af9aaee5b9) Thanks [@julienblin](https://github.com/julienblin)! - Update mantine version definition

- Updated dependencies [[`aeab8d5`](https://github.com/bonfhir/bonfhir/commit/aeab8d5ed27f9ab2f74ac9715e055e8825c456c6), [`131bd5d`](https://github.com/bonfhir/bonfhir/commit/131bd5d9042cf9e6cf8860b3db8de562928507c0), [`da2bfe7`](https://github.com/bonfhir/bonfhir/commit/da2bfe78eee5e287d6aca48c2f8357e920e9370b)]:
  - @bonfhir/query@3.1.0

## 3.0.0

### Major Changes

- [#194](https://github.com/bonfhir/bonfhir/pull/194) [`6a0bb61`](https://github.com/bonfhir/bonfhir/commit/6a0bb61b4d6e9b971c9cd63488b24c9231d9150c) Thanks [@julienblin](https://github.com/julienblin)! - Fix #103 - update react-query to v5

  This is a breaking change for consumers of the package and will likely impact the apps using bonFHIR.
  Hopefully this is not too bad and most changes are trivial.
  Please review the guide here for more information: https://tanstack.com/query/latest/docs/react/guides/migrating-to-v5

### Patch Changes

- [#185](https://github.com/bonfhir/bonfhir/pull/185) [`dbfa65d`](https://github.com/bonfhir/bonfhir/commit/dbfa65d5b4b3fcd24c86e28b73682233856b1594) Thanks [@julienblin](https://github.com/julienblin)! - Fix a type bug with `<FhirInput />` where string was overly abused

- Updated dependencies [[`f6a3c72`](https://github.com/bonfhir/bonfhir/commit/f6a3c72642654cf5c09a75789a9415150b95aeca), [`6a0bb61`](https://github.com/bonfhir/bonfhir/commit/6a0bb61b4d6e9b971c9cd63488b24c9231d9150c)]:
  - @bonfhir/core@2.17.2
  - @bonfhir/query@3.0.0

## 2.10.0

### Minor Changes

- [#151](https://github.com/bonfhir/bonfhir/pull/151) [`cd2db40`](https://github.com/bonfhir/bonfhir/commit/cd2db409ac3c1f03aa0b240bda809f3ea34fadc8) Thanks [@julienblin](https://github.com/julienblin)! - Fix #144 - Add a `<FhirFormatter />` component to format complex messages using the formatter

### Patch Changes

- Updated dependencies [[`acda662`](https://github.com/bonfhir/bonfhir/commit/acda6629c0af50ce5824501a9f01b1dc595e0dda), [`9766122`](https://github.com/bonfhir/bonfhir/commit/97661222b439b9a9174fd340fbab1a0cc7ff0b43), [`9fbc13d`](https://github.com/bonfhir/bonfhir/commit/9fbc13d09c50aed82626b910560f3fb525142cdd), [`f42935e`](https://github.com/bonfhir/bonfhir/commit/f42935e8dbc38602e6a763a5cca0018c6401b97a), [`304d6c7`](https://github.com/bonfhir/bonfhir/commit/304d6c7868a352d2baad95dbd98cb8bd2b2848de)]:
  - @bonfhir/core@2.17.1
  - @bonfhir/query@2.5.1

## 2.9.0

### Minor Changes

- [#131](https://github.com/bonfhir/bonfhir/pull/131) [`13518b0`](https://github.com/bonfhir/bonfhir/commit/13518b0df35986b8a6b1a568034f95edef6c196d) Thanks [@julienblin](https://github.com/julienblin)! - Fix #118 - Handling of Choice of DataTypes - add the `choice` formatter + `choiceOfDataTypes` helper

- [#129](https://github.com/bonfhir/bonfhir/pull/129) [`5fae2e2`](https://github.com/bonfhir/bonfhir/commit/5fae2e259364c29e0eefa8232cce4858571026ef) Thanks [@julienblin](https://github.com/julienblin)! - Fix #114 - Add `initialValues` callback to `useFhirSearchController`

### Patch Changes

- [#135](https://github.com/bonfhir/bonfhir/pull/135) [`621165e`](https://github.com/bonfhir/bonfhir/commit/621165ebecd99a9009f0bf394d8238f4abf18323) Thanks [@julienblin](https://github.com/julienblin)! - Fix #113 - search can now be a function, defaults to `_text=`, display query errors, and support form reset

- Updated dependencies [[`07783ef`](https://github.com/bonfhir/bonfhir/commit/07783ef61c461be6b2dc2b07b42f52d9df219d2a), [`67aab61`](https://github.com/bonfhir/bonfhir/commit/67aab613fd348f5386e948ec839534cc50928669), [`13518b0`](https://github.com/bonfhir/bonfhir/commit/13518b0df35986b8a6b1a568034f95edef6c196d), [`da9eff6`](https://github.com/bonfhir/bonfhir/commit/da9eff60436a8e5a562eb0464469f548f899b062), [`2f10415`](https://github.com/bonfhir/bonfhir/commit/2f1041545802f890b7c2f6676218a21da9acaf73), [`c7891dc`](https://github.com/bonfhir/bonfhir/commit/c7891dc71b74e7a04d0ad33c927bd29a9bedc92c)]:
  - @bonfhir/core@2.17.0

## 2.8.0

### Minor Changes

- [#102](https://github.com/bonfhir/bonfhir/pull/102) [`99dfce30`](https://github.com/bonfhir/bonfhir/commit/99dfce304dc821fc3d16081926f9a603a9056e80) Thanks [@julienblin](https://github.com/julienblin)! - Fix #91 - Add Quantity input

- [#102](https://github.com/bonfhir/bonfhir/pull/102) [`e3da6548`](https://github.com/bonfhir/bonfhir/commit/e3da65480416bb282024cfba72a84da28247301f) Thanks [@julienblin](https://github.com/julienblin)! - Fix #92 - Add Duration input

## 2.7.0

### Minor Changes

- [#83](https://github.com/bonfhir/bonfhir/pull/83) [`5ff66cd2`](https://github.com/bonfhir/bonfhir/commit/5ff66cd263184800f1d9e3dd1aa1168642adf8d6) Thanks [@julienblin](https://github.com/julienblin)! - Fix #81: add `className` to all react components

- [#83](https://github.com/bonfhir/bonfhir/pull/83) [`887c348f`](https://github.com/bonfhir/bonfhir/commit/887c348ff27bda9e75dd348060933eb3fbae751d) Thanks [@julienblin](https://github.com/julienblin)! - Fix #81: add `style` to all react components

### Patch Changes

- [#93](https://github.com/bonfhir/bonfhir/pull/93) [`39df0adf`](https://github.com/bonfhir/bonfhir/commit/39df0adfaa0f7f569e6d72d12a0d33f722db8c1b) Thanks [@julienblin](https://github.com/julienblin)! - Return a cloned resource in `<FhirInput type="resource" />`

- Updated dependencies [[`a53ae609`](https://github.com/bonfhir/bonfhir/commit/a53ae6092577d373ef97c3ddf5f6a1e826096640), [`775753f0`](https://github.com/bonfhir/bonfhir/commit/775753f0cc1ec05f6c853301a2abe413a75e719f)]:
  - @bonfhir/query@2.5.0
  - @bonfhir/core@2.16.0

## 2.6.0

### Minor Changes

- [#78](https://github.com/bonfhir/bonfhir/pull/78) [`c54acde`](https://github.com/bonfhir/bonfhir/commit/c54acde358ab889f952ef1a0c3b3bd983705c337) Thanks [@julienblin](https://github.com/julienblin)! - Rename `@bonfhir/ui` project to `@bonfhir/react` and `@bonfhir/ui-mantine` to `@bonfhir/mantine`

## 2.5.0

### Minor Changes

- [#48](https://github.com/bonfhir/bonfhir/pull/48) [`5563dfc`](https://github.com/bonfhir/bonfhir/commit/5563dfc86995c2ae175c52f05e568481ce176954) Thanks [@julienblin](https://github.com/julienblin)! - Fix #44 - Breaking Change: Removed incorrect operations types

  The operation types were completely broken, and had to be removed in favor of this.
  This may break some client apps that rely on operations, but the change should be straightforward.

### Patch Changes

- Updated dependencies [[`31971cc`](https://github.com/bonfhir/bonfhir/commit/31971ccbbb3111d99e06ca3d240baaa4fe073a68), [`677a62a`](https://github.com/bonfhir/bonfhir/commit/677a62a547cfe31831b409e9a7757a302f1cdd91), [`6703e8d`](https://github.com/bonfhir/bonfhir/commit/6703e8d74804fc62eebabb5935de7be82a3bf999), [`de78ae3`](https://github.com/bonfhir/bonfhir/commit/de78ae343c1a852b351332b4c7173365c1e1cb2e), [`cf01de0`](https://github.com/bonfhir/bonfhir/commit/cf01de0d5c740c28c446ef410acecf9dcf2f1c3a), [`5563dfc`](https://github.com/bonfhir/bonfhir/commit/5563dfc86995c2ae175c52f05e568481ce176954)]:
  - @bonfhir/query@2.4.0
  - @bonfhir/core@2.14.0

## 2.4.1

### Patch Changes

- [#12](https://github.com/bonfhir/bonfhir/pull/12) [`08d8769`](https://github.com/bonfhir/bonfhir/commit/08d87692947452ce333cddb38478b69d691ce6ee) Thanks [@julienblin](https://github.com/julienblin)! - `FhirPaginationProps.data` has a narrower type

- Updated dependencies [[`a6d153d`](https://github.com/bonfhir/bonfhir/commit/a6d153d45dca46606357d8dcb79c822ecf754504), [`fb36662`](https://github.com/bonfhir/bonfhir/commit/fb36662acfd6fb62356aa932fff75860671e63b8)]:
  - @bonfhir/core@2.10.0

## 2.4.0

### Minor Changes

- [#10](https://github.com/bonfhir/bonfhir/pull/10) [`4827712`](https://github.com/bonfhir/bonfhir/commit/4827712518abb96db41027e367f5def2cae8fa07) Thanks [@julienblin](https://github.com/julienblin)! - Update `<FhirTable>` to support any data - This may be a client breaking change in some cases!

### Patch Changes

- Updated dependencies [[`a619c81`](https://github.com/bonfhir/bonfhir/commit/a619c81355406a75917b4ad5122223621b287673), [`c1774da`](https://github.com/bonfhir/bonfhir/commit/c1774da720175e1131919fd16faa79a402aac6ea), [`47ba701`](https://github.com/bonfhir/bonfhir/commit/47ba7010975779d8761e9cf3773764f0fb5e1232), [`7310c0d`](https://github.com/bonfhir/bonfhir/commit/7310c0d07e95b82edde9b5662d76afcfbd04a868), [`931f1bc`](https://github.com/bonfhir/bonfhir/commit/931f1bcf67b03eca749d7291cdb25274a4e9ade8)]:
  - @bonfhir/query@2.3.0
  - @bonfhir/core@2.9.0

## 2.3.0

### Minor Changes

- [`e5dd1d5`](https://github.com/bonfhir/bonfhir/commit/e5dd1d5411f4ae68ecff706f2f0277ab766e7aac) Thanks [@julienblin](https://github.com/julienblin)! - [Housekeeping] - update typescript module resolution to "Bundler"

### Patch Changes

- [`6b8e816`](https://github.com/bonfhir/bonfhir/commit/6b8e8164afea6c06de22bf8e1313b29057a9ff6e) Thanks [@julienblin](https://github.com/julienblin)! - [Housekeeping] - Update dependencies

- Updated dependencies [[`6b8e816`](https://github.com/bonfhir/bonfhir/commit/6b8e8164afea6c06de22bf8e1313b29057a9ff6e), [`e5dd1d5`](https://github.com/bonfhir/bonfhir/commit/e5dd1d5411f4ae68ecff706f2f0277ab766e7aac), [`3d1ce25`](https://github.com/bonfhir/bonfhir/commit/3d1ce25cbc26d6b272f1388fd3210abea52ac50e), [`623cac8`](https://github.com/bonfhir/bonfhir/commit/623cac852d3f84ff5209282069a0d1d95a8b30cc)]:
  - @bonfhir/query@2.2.0
  - @bonfhir/core@2.8.0

## 2.2.1

### Patch Changes

- [`736f659`](https://github.com/bonfhir/bonfhir/commit/736f6599e8ed28b1264923f8e7222aec24d79dd4) Thanks [@julienblin](https://github.com/julienblin)! - Fix missing RatioRange formatter

- [`3af1c7c`](https://github.com/bonfhir/bonfhir/commit/3af1c7ce7d57d54046b65510318599f3b8940b37) Thanks [@julienblin](https://github.com/julienblin)! - Fix a bug in `FhirInputTerminology` when feeding source as array

- [`05aac34`](https://github.com/bonfhir/bonfhir/commit/05aac34fd21f8562481b219ff8dbfede7ae76d66) Thanks [@julienblin](https://github.com/julienblin)! - Fix default precision in `FhirInput.decimal`

- Updated dependencies [[`736f659`](https://github.com/bonfhir/bonfhir/commit/736f6599e8ed28b1264923f8e7222aec24d79dd4), [`402b786`](https://github.com/bonfhir/bonfhir/commit/402b786446ecca8876a7ed08e736988cf2fa2317)]:
  - @bonfhir/core@2.6.3

## 2.2.0

### Minor Changes

- 8425d04: Add `FhirError` UI component

### Patch Changes

- Updated dependencies [6b0914a]
- Updated dependencies [63111a1]
  - @bonfhir/core@2.6.2

## 2.1.1

### Patch Changes

- 9b1d478: Updated dependencies, including Prettier/ESLint that touched all files
- Updated dependencies [11b949d]
- Updated dependencies [9b1d478]
- Updated dependencies [7891d57]
  - @bonfhir/core@2.6.0
  - @bonfhir/query@2.1.1

## 2.1.0

### Minor Changes

- Multiple fixes to types + dependency bumps

### Patch Changes

- Updated dependencies
  - @bonfhir/core@2.1.0
  - @bonfhir/query@2.1.0
