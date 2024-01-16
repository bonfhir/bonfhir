---
sidebar_position: 10
title: Codegen
---

import DocCardList from '@theme/DocCardList';

[![npm](https://img.shields.io/npm/v/@bonfhir/codegen)](https://www.npmjs.com/package/@bonfhir/codegen)

```bash npm2yarn
npm install @bonfhir/codegen
```

The `codegen` package's purpose is to solve the problem of supporting multiple versions of FHIR in the BonFHIR repo. It generates typescript code that will be ready to interact with FHIR, by loading complex FHIR definitions and integrating them into the code. It simplifies the process of creating the necessary code structure to ensure that your package or application can correctly handle and use FHIR Resource data. FHIR structure definition files are stored in [packages/codegen/definitions/fhir](https://github.com/bonfhir/bonfhir/tree/main/packages/codegen/definitions/fhir).

:::warning

The main purpose of this package is to support the development of BonFHIR itself, so the implications of using it outside of BonFHIR are unknown. Use it at your own risk!

:::

<DocCardList />
