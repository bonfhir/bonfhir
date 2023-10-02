# @bonfhir/query

## 2.5.0

### Minor Changes

- [#89](https://github.com/bonfhir/bonfhir/pull/89) [`a53ae609`](https://github.com/bonfhir/bonfhir/commit/a53ae6092577d373ef97c3ddf5f6a1e826096640) Thanks [@julienblin](https://github.com/julienblin)! - Fix #88: add support for GraphQL Execution Result / partial errors

### Patch Changes

- Updated dependencies [[`a53ae609`](https://github.com/bonfhir/bonfhir/commit/a53ae6092577d373ef97c3ddf5f6a1e826096640), [`775753f0`](https://github.com/bonfhir/bonfhir/commit/775753f0cc1ec05f6c853301a2abe413a75e719f)]:
  - @bonfhir/core@2.16.0

## 2.4.0

### Minor Changes

- [#37](https://github.com/bonfhir/bonfhir/pull/37) [`31971cc`](https://github.com/bonfhir/bonfhir/commit/31971ccbbb3111d99e06ca3d240baaa4fe073a68) Thanks [@julienblin](https://github.com/julienblin)! - Add support for reference in `useFhirRead`

- [#48](https://github.com/bonfhir/bonfhir/pull/48) [`5563dfc`](https://github.com/bonfhir/bonfhir/commit/5563dfc86995c2ae175c52f05e568481ce176954) Thanks [@julienblin](https://github.com/julienblin)! - Fix #44 - Breaking Change: Removed incorrect operations types

  The operation types were completely broken, and had to be removed in favor of this.
  This may break some client apps that rely on operations, but the change should be straightforward.

### Patch Changes

- [#45](https://github.com/bonfhir/bonfhir/pull/45) [`cf01de0`](https://github.com/bonfhir/bonfhir/commit/cf01de0d5c740c28c446ef410acecf9dcf2f1c3a) Thanks [@julienblin](https://github.com/julienblin)! - Fix #43: `FhirClient.capabilities` returns TerminologyCapabilities when mode=terminology

- Updated dependencies [[`677a62a`](https://github.com/bonfhir/bonfhir/commit/677a62a547cfe31831b409e9a7757a302f1cdd91), [`6703e8d`](https://github.com/bonfhir/bonfhir/commit/6703e8d74804fc62eebabb5935de7be82a3bf999), [`de78ae3`](https://github.com/bonfhir/bonfhir/commit/de78ae343c1a852b351332b4c7173365c1e1cb2e), [`cf01de0`](https://github.com/bonfhir/bonfhir/commit/cf01de0d5c740c28c446ef410acecf9dcf2f1c3a), [`5563dfc`](https://github.com/bonfhir/bonfhir/commit/5563dfc86995c2ae175c52f05e568481ce176954)]:
  - @bonfhir/core@2.14.0

## 2.3.0

### Minor Changes

- [#8](https://github.com/bonfhir/bonfhir/pull/8) [`a619c81`](https://github.com/bonfhir/bonfhir/commit/a619c81355406a75917b4ad5122223621b287673) Thanks [@julienblin](https://github.com/julienblin)! - Add `useFhirGraph` hook

- [#10](https://github.com/bonfhir/bonfhir/pull/10) [`931f1bc`](https://github.com/bonfhir/bonfhir/commit/931f1bcf67b03eca749d7291cdb25274a4e9ade8) Thanks [@julienblin](https://github.com/julienblin)! - Add `useFhirGraphQL` and `useFhirGraphQLMutation` hooks

### Patch Changes

- Updated dependencies [[`c1774da`](https://github.com/bonfhir/bonfhir/commit/c1774da720175e1131919fd16faa79a402aac6ea), [`47ba701`](https://github.com/bonfhir/bonfhir/commit/47ba7010975779d8761e9cf3773764f0fb5e1232), [`7310c0d`](https://github.com/bonfhir/bonfhir/commit/7310c0d07e95b82edde9b5662d76afcfbd04a868)]:
  - @bonfhir/core@2.9.0

## 2.2.0

### Minor Changes

- [`e5dd1d5`](https://github.com/bonfhir/bonfhir/commit/e5dd1d5411f4ae68ecff706f2f0277ab766e7aac) Thanks [@julienblin](https://github.com/julienblin)! - [Housekeeping] - update typescript module resolution to "Bundler"

### Patch Changes

- [`6b8e816`](https://github.com/bonfhir/bonfhir/commit/6b8e8164afea6c06de22bf8e1313b29057a9ff6e) Thanks [@julienblin](https://github.com/julienblin)! - [Housekeeping] - Update dependencies

- Updated dependencies [[`6b8e816`](https://github.com/bonfhir/bonfhir/commit/6b8e8164afea6c06de22bf8e1313b29057a9ff6e), [`e5dd1d5`](https://github.com/bonfhir/bonfhir/commit/e5dd1d5411f4ae68ecff706f2f0277ab766e7aac), [`3d1ce25`](https://github.com/bonfhir/bonfhir/commit/3d1ce25cbc26d6b272f1388fd3210abea52ac50e), [`623cac8`](https://github.com/bonfhir/bonfhir/commit/623cac852d3f84ff5209282069a0d1d95a8b30cc)]:
  - @bonfhir/core@2.8.0

## 2.1.1

### Patch Changes

- 9b1d478: Updated dependencies, including Prettier/ESLint that touched all files
- Updated dependencies [11b949d]
- Updated dependencies [9b1d478]
- Updated dependencies [7891d57]
  - @bonfhir/core@2.6.0

## 2.1.0

### Minor Changes

- Multiple fixes to types + dependency bumps

### Patch Changes

- Updated dependencies
  - @bonfhir/core@2.1.0
