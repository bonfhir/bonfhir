# @bonfhir/react

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