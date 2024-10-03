/**
 * This module exists as an alternative entry-point to be able to directly reference the core library
 * in a global import context, such as a browser.
 * This enables usage in third-party tools such as no-code tools.
 */

import * as fhirTypes from "./fhir-types.codegen";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
(globalThis as any).bonfhir = {
  ...fhirTypes,
};
