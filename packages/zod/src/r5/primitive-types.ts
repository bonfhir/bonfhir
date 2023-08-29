/**
 * Zod Primitive types
 */

import { z } from "zod";

/**
 * https://hl7.org/fhir/datatypes.html#base64Binary
 */
export const base64Binary = z
  .string()
  .regex(/(?:[\d+/A-Za-z]{4})*(?:[\d+/A-Za-z]{2}==|[\d+/A-Za-z]{3}=)?/);
/**
 * https://hl7.org/fhir/datatypes.html#base64Binary
 */
export type base64Binary = z.infer<typeof base64Binary>;

/**
 * https://hl7.org/fhir/datatypes.html#boolean
 */
export const boolean = z.boolean();

/**
 * https://hl7.org/fhir/datatypes.html#canonical
 */
export const canonical = z.string().regex(/\S*/);
/**
 * https://hl7.org/fhir/datatypes.html#canonical
 */
export type canonical = z.infer<typeof canonical>;

/**
 * https://hl7.org/fhir/datatypes.html#code
 */
export const code = z.string().regex(/\S+( \S+)*/);
/**
 * https://hl7.org/fhir/datatypes.html#code
 */
export type code = z.infer<typeof code>;

/**
 * https://hl7.org/fhir/datatypes.html#date
 */
export const date = z
  .string()
  .regex(
    /(\d(\d(\d[1-9]|[1-9]0)|[1-9]00)|[1-9]000)(-(0[1-9]|1[0-2])(-(0[1-9]|[12]\d|3[01]))?)?/,
  );

/**
 * https://hl7.org/fhir/datatypes.html#date
 */
export type date = z.infer<typeof date>;

/**
 * https://hl7.org/fhir/datatypes.html#dateTime
 */
export const dateTime = z
  .string()
  .regex(
    /(\d(\d(\d[1-9]|[1-9]0)|[1-9]00)|[1-9]000)(-(0[1-9]|1[0-2])(-(0[1-9]|[12]\d|3[01])(T([01]\d|2[0-3]):[0-5]\d:([0-5]\d|60)(\.\d{1,9})?)?)?(Z|([+-])((0\d|1[0-3]):[0-5]\d|14:00)?)?)?/,
  );

/**
 * https://hl7.org/fhir/datatypes.html#dateTime
 */
export type dateTime = z.infer<typeof dateTime>;

/**
 * https://hl7.org/fhir/datatypes.html#decimal
 */
export const decimal = z.number();

/**
 * https://hl7.org/fhir/datatypes.html#decimal
 */
export type decimal = z.infer<typeof decimal>;

/**
 * https://hl7.org/fhir/datatypes.html#id
 */
export const id = z.string().regex(/[\d.A-Za-z-]{1,64}/);

/**
 * https://hl7.org/fhir/datatypes.html#id
 */
export type id = z.infer<typeof id>;

/**
 * https://hl7.org/fhir/datatypes.html#instant
 */
export const instant = z
  .string()
  .regex(
    /(\d(\d(\d[1-9]|[1-9]0)|[1-9]00)|[1-9]000)-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])T([01]\d|2[0-3]):[0-5]\d:([0-5]\d|60)(\.\d{1,9})?(Z|([+-])((0\d|1[0-3]):[0-5]\d|14:00))/,
  );

/**
 * https://hl7.org/fhir/datatypes.html#instant
 */
export type instant = z.infer<typeof instant>;

/**
 * https://hl7.org/fhir/datatypes.html#integer
 */
export const integer = z.number().int();

/**
 * https://hl7.org/fhir/datatypes.html#integer
 */
export type integer = z.infer<typeof integer>;

// #if fhir >= r5
/**
 * https://hl7.org/fhir/datatypes.html#integer64
 */
export const integer64 = z.coerce.bigint();

/**
 * https://hl7.org/fhir/datatypes.html#integer64
 */
export type integer64 = z.infer<typeof integer64>;
// #endif

/**
 * https://hl7.org/fhir/datatypes.html#markdown
 */
export const markdown = z.string().regex(/^[\S\s]+$/);

/**
 * https://hl7.org/fhir/datatypes.html#markdown
 */
export type markdown = z.infer<typeof markdown>;

/**
 * https://hl7.org/fhir/datatypes.html#oid
 */
export const oid = z.string().regex(/urn:oid:[0-2](\.(0|[1-9]\d*))+/);

/**
 * https://hl7.org/fhir/datatypes.html#oid
 */
export type oid = z.infer<typeof oid>;

/**
 * https://hl7.org/fhir/datatypes.html#string
 */
export const string = z.string().nonempty();

/**
 * https://hl7.org/fhir/datatypes.html#positiveInt
 */
export const positiveInt = z.number().int().positive();

/**
 * https://hl7.org/fhir/datatypes.html#positiveInt
 */
export type positiveInt = z.infer<typeof positiveInt>;

/**
 * https://hl7.org/fhir/datatypes.html#time
 */
export const time = z
  .string()
  .regex(/([01]\d|2[0-3]):[0-5]\d:([0-5]\d|60)(\.\d{1,9})?/);

/**
 * https://hl7.org/fhir/datatypes.html#time
 */
export type time = z.infer<typeof time>;

/**
 * https://hl7.org/fhir/datatypes.html#unsignedInt
 */
export const unsignedInt = z.number().int().nonnegative();

/**
 * https://hl7.org/fhir/datatypes.html#unsignedInt
 */
export type unsignedInt = z.infer<typeof unsignedInt>;

/**
 * https://hl7.org/fhir/datatypes.html#uri
 */
export const uri = z.string().nonempty();

/**
 * https://hl7.org/fhir/datatypes.html#uri
 */
export type uri = z.infer<typeof uri>;

/**
 * https://hl7.org/fhir/datatypes.html#url
 */
export const url = z.string().url();

/**
 * https://hl7.org/fhir/datatypes.html#url
 */
export type url = z.infer<typeof url>;

/**
 * https://hl7.org/fhir/datatypes.html#uuid
 */
export const uuid = z
  .string()
  .regex(/urn:u{2}id:[\da-f]{8}(?:-[\da-f]{4}){3}-[\da-f]{12}/);

/**
 * https://hl7.org/fhir/datatypes.html#uuid
 */
export type uuid = z.infer<typeof uuid>;

/**
 * https://hl7.org/fhir/narrative.html#xhtml
 */
export const xhtml = z.string().nonempty();

/**
 * https://hl7.org/fhir/narrative.html#xhtml
 */
export type xhtml = z.infer<typeof xhtml>;
