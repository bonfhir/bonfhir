# @bonfhir/ui-mantine

## 2.3.3

### Patch Changes

- [#50](https://github.com/bonfhir/bonfhir/pull/50) [`115f356`](https://github.com/bonfhir/bonfhir/commit/115f356fb7f765264638b72a6bfbdaa34b1fc2ed) Thanks [@julienblin](https://github.com/julienblin)! - Fix questionnaire resetting when query re-runs

- Updated dependencies [[`eb17f1c`](https://github.com/bonfhir/bonfhir/commit/eb17f1cd82062575b2a45dbb73acaa6b664c5160)]:
  - @bonfhir/core@2.14.1

## 2.3.2

### Patch Changes

- [#46](https://github.com/bonfhir/bonfhir/pull/46) [`6331ca6`](https://github.com/bonfhir/bonfhir/commit/6331ca67a3593a9caeba48320c4c2d64b8a7f5ac) Thanks [@julienblin](https://github.com/julienblin)! - Fix #42: add support for `Questionnaire.answerOption.initialSelected`

- [#49](https://github.com/bonfhir/bonfhir/pull/49) [`db75654`](https://github.com/bonfhir/bonfhir/commit/db75654b98911bd11d2933649f243bd0d50d2ceb) Thanks [@julienblin](https://github.com/julienblin)! - Fix #4 - Missing label on terminology input when using segmented control

- Updated dependencies [[`31971cc`](https://github.com/bonfhir/bonfhir/commit/31971ccbbb3111d99e06ca3d240baaa4fe073a68), [`677a62a`](https://github.com/bonfhir/bonfhir/commit/677a62a547cfe31831b409e9a7757a302f1cdd91), [`6703e8d`](https://github.com/bonfhir/bonfhir/commit/6703e8d74804fc62eebabb5935de7be82a3bf999), [`de78ae3`](https://github.com/bonfhir/bonfhir/commit/de78ae343c1a852b351332b4c7173365c1e1cb2e), [`cf01de0`](https://github.com/bonfhir/bonfhir/commit/cf01de0d5c740c28c446ef410acecf9dcf2f1c3a), [`5563dfc`](https://github.com/bonfhir/bonfhir/commit/5563dfc86995c2ae175c52f05e568481ce176954)]:
  - @bonfhir/query@2.4.0
  - @bonfhir/core@2.14.0
  - @bonfhir/ui@2.5.0

## 2.3.1

### Patch Changes

- [#16](https://github.com/bonfhir/bonfhir/pull/16) [`6bf0d79`](https://github.com/bonfhir/bonfhir/commit/6bf0d79f269bad6c68b1584538b1f105860ec3be) Thanks [@julienblin](https://github.com/julienblin)! - Fix `FhirTable` header no-wrap to prevent orphaned sort button

- [#16](https://github.com/bonfhir/bonfhir/pull/16) [`5832c74`](https://github.com/bonfhir/bonfhir/commit/5832c743affa5aa378e072a8934b067dee9f1ebe) Thanks [@julienblin](https://github.com/julienblin)! - Fix a bug in `FhirTable` rendererProps for td styling

- [#16](https://github.com/bonfhir/bonfhir/pull/16) [`793ba6c`](https://github.com/bonfhir/bonfhir/commit/793ba6c47802bd42f6073aec0e7d9ed7844986e3) Thanks [@julienblin](https://github.com/julienblin)! - Add `theadPrefix` and `headerCell` to `FhirTable` to allow more customization of the table header

- Updated dependencies [[`df80ae2`](https://github.com/bonfhir/bonfhir/commit/df80ae2d2d53590ee00bd5c6278aba5ef75ca9c2)]:
  - @bonfhir/core@2.11.0

## 2.3.0

### Minor Changes

- [`e5dd1d5`](https://github.com/bonfhir/bonfhir/commit/e5dd1d5411f4ae68ecff706f2f0277ab766e7aac) Thanks [@julienblin](https://github.com/julienblin)! - [Housekeeping] - update typescript module resolution to "Bundler"

- [`a22ddf0`](https://github.com/bonfhir/bonfhir/commit/a22ddf05d1cd832aec6a6e335f1ec2e469407ab1) Thanks [@julienblin](https://github.com/julienblin)! - Add support for `FhirQuestionnaire...answerOption`

### Patch Changes

- [`6b8e816`](https://github.com/bonfhir/bonfhir/commit/6b8e8164afea6c06de22bf8e1313b29057a9ff6e) Thanks [@julienblin](https://github.com/julienblin)! - [Housekeeping] - Update dependencies

- [`c6e385e`](https://github.com/bonfhir/bonfhir/commit/c6e385efaf0bdba741b99f29bc1b40c0b4d5e86e) Thanks [@julienblin](https://github.com/julienblin)! - Fix `FhirQuestionnaire` initial values when changing the `questionnaire` prop.

- Updated dependencies [[`6b8e816`](https://github.com/bonfhir/bonfhir/commit/6b8e8164afea6c06de22bf8e1313b29057a9ff6e), [`e5dd1d5`](https://github.com/bonfhir/bonfhir/commit/e5dd1d5411f4ae68ecff706f2f0277ab766e7aac), [`3d1ce25`](https://github.com/bonfhir/bonfhir/commit/3d1ce25cbc26d6b272f1388fd3210abea52ac50e), [`623cac8`](https://github.com/bonfhir/bonfhir/commit/623cac852d3f84ff5209282069a0d1d95a8b30cc)]:
  - @bonfhir/query@2.2.0
  - @bonfhir/core@2.8.0
  - @bonfhir/ui@2.3.0

## 2.2.1

### Patch Changes

- [`c84e3af`](https://github.com/bonfhir/bonfhir/commit/c84e3afeff5e66d968179077790cbb20077bee8e) Thanks [@julienblin](https://github.com/julienblin)! - Fix a bug in `FhirInputArray` that prevented removing elements

- [`0fc309e`](https://github.com/bonfhir/bonfhir/commit/0fc309e0c2c9eab30e684ca0a51cdad0245c8e63) Thanks [@julienblin](https://github.com/julienblin)! - Fix a bug with FhirInputArray when using simple input types (e.g. string)

- [`e3ed6fc`](https://github.com/bonfhir/bonfhir/commit/e3ed6fc66e2bcf49e2a57b2959871db01b90d71b) Thanks [@julienblin](https://github.com/julienblin)! - Fix `FhirInputArray` icon alignment

- Updated dependencies [[`736f659`](https://github.com/bonfhir/bonfhir/commit/736f6599e8ed28b1264923f8e7222aec24d79dd4), [`3af1c7c`](https://github.com/bonfhir/bonfhir/commit/3af1c7ce7d57d54046b65510318599f3b8940b37), [`05aac34`](https://github.com/bonfhir/bonfhir/commit/05aac34fd21f8562481b219ff8dbfede7ae76d66), [`402b786`](https://github.com/bonfhir/bonfhir/commit/402b786446ecca8876a7ed08e736988cf2fa2317)]:
  - @bonfhir/core@2.6.3
  - @bonfhir/ui@2.2.1

## 2.2.0

### Minor Changes

- 8425d04: Add `FhirError` UI component

### Patch Changes

- Updated dependencies [6b0914a]
- Updated dependencies [8425d04]
- Updated dependencies [63111a1]
  - @bonfhir/core@2.6.2
  - @bonfhir/ui@2.2.0

## 2.1.1

### Patch Changes

- 9b1d478: Updated dependencies, including Prettier/ESLint that touched all files
- Updated dependencies [11b949d]
- Updated dependencies [9b1d478]
- Updated dependencies [7891d57]
  - @bonfhir/core@2.6.0
  - @bonfhir/query@2.1.1
  - @bonfhir/ui@2.1.1

## 2.1.0

### Minor Changes

- Multiple fixes to types + dependency bumps

### Patch Changes

- Updated dependencies
  - @bonfhir/core@2.1.0
  - @bonfhir/query@2.1.0
  - @bonfhir/ui@2.1.0
