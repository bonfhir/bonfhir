/**
 * This module exists as an alternative entry-point to be able to directly reference the core library
 * in a global import context, such as a browser.
 * This enables usage in third-party tools such as no-code tools.
 */

import * as builders from "./builders";
import * as bundleExecutor from "./bundle-executor";
import * as bundleNavigator from "./bundle-navigator";
import * as dateTimeHelpers from "./date-time-helpers";
import * as dedupSearch from "./dedup-search";
import * as extensions from "./extensions";
import * as fetchFhirClient from "./fetch-fhir-client";
import * as fhirClient from "./fhir-client";
import * as fhirTypes from "@bonfhir/fhirtypes/r4b";
import * as formatters from "./formatters";
import * as langUtils from "./lang-utils";
import * as merge from "./merge";
import * as narratives from "./narratives.codegen";
import * as patch from "./patch";
import * as patchCodegen from "./patch.codegen";
import * as references from "./references.codegen";
import * as search from "./search";
import * as searchCodegen from "./search.codegen";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
(globalThis as any).bonfhir = {
  ...builders,
  ...bundleExecutor,
  ...bundleNavigator,
  ...dateTimeHelpers,
  ...dedupSearch,
  ...extensions,
  ...fetchFhirClient,
  ...fhirClient,
  ...fhirTypes,
  ...formatters,
  ...langUtils,
  ...merge,
  ...narratives,
  ...patchCodegen,
  ...patch,
  ...references,
  ...searchCodegen,
  ...search,
};
