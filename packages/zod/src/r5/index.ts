export * from "./fhir-types.codegen";
export * from "./primitive-types";

import { z } from "zod";

const t = z.object({});

type t2 = typeof t;
