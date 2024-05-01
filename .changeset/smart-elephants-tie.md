---
"@bonfhir/react": patch
---

Only sanitize HTML output from Markdown formatting when formatted where a DOM is available (browser, Deno, etc.). Platforms without a DOM (React Native) have other means of rendering and sanitizing a given Markdown or HTML string into a relatively safe and usable UI.
