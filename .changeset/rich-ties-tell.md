---
"@bonfhir/core": patch
---

Use `remarkable` instead of `marked` to format Markdown content. This avoids using regular expression syntax that isn't yet supported by the Hermes JS engine, allowing `@bonfhir/core` to load without error in Expo / React Native applications.
