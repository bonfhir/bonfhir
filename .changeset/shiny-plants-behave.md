---
"@bonfhir/query": minor
"@bonfhir/core": minor
"@bonfhir/ui": minor
---

Fix #44 - Breaking Change: Removed incorrect operations types

The operation types were completely broken, and had to be removed in favor of this.
This may break some client apps that rely on operations, but the change should be straightforward.
