---
sidebar_position: 6
title: Import in browser
---

In addition to the [versions available for all packages](/packages/intro#package-formats), the `@bonfhir/core` package
can also be imported directly in a browser, without packaging.

Simply use the [unpkg service](https://unpkg.com) to pull it in:

```html
<script src="https://unpkg.com/@bonfhir/core/dist/r4b/global/index.js"></script>
```

This version is meant primarily to be imported in low-code environments, where you can still benefit from some of the
bonFHIR features by importing in a client-side browser directly.
