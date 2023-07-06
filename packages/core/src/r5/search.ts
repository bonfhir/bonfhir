import { AnyResourceType } from "./fhir-types.codegen.js";
import { RemoveUnderscoreKeys } from "./lang-utils.js";
import { AllResourcesSearchParameters } from "./search.codegen.js";

/**
 * The builder for FHIR Search URLs.
 * https://hl7.org/fhir/search.html
 */
export class FhirSearchBuilder {
  private _searchParams: Array<[string, string]> = [];

  /**
   * Clone the current builder, so that subsequent modifications do not affect the current builder state.
   * @returns a deep copy of the current builder.
   */
  public clone(): this {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const cloned = new (this.constructor as any)();
    cloned.searchParams = JSON.parse(JSON.stringify(this._searchParams));
    return cloned;
  }

  /**
   * Add a search parameter of type date: https://hl7.org/fhir/search.html#date
   * @param parameter the search parameter name
   * @param value the value to search for, either as a Date object (for full ISO value), or as a string.; or null/undefined/empty to ignore the search parameter.
   * @param prefix the prefix to apply for the search
   * @returns the modified builder instance
   *
   * @example
   *    > fhirSearch().dateParam("date", "2022-01-02").href
   *    > "date=2022-01-02"
   *
   *    > fhirSearch().dateParam("date", "2010-01-01", "ge").date("date", "2011-12-31", "le").href
   *    > "date=ge2010-01-01&date=le2011-12-31"
   */
  public dateParam(
    parameter: string,
    value: string | Array<string> | null | undefined,
    prefix?: Prefix | null | undefined,
    replace?: "replace" | null | undefined,
  ): this {
    if (value) {
      const parameterValues = Array.isArray(value)
        ? value.filter(Boolean)
        : [value];
      if (parameterValues.length === 0) {
        return this;
      }

      this.push(
        parameter,
        parameterValues
          .map((x) => `${prefix || ""}${encodeURIComponent(x)}`)
          .join(","),
        replace,
      );
    }
    return this;
  }

  /**
   * Add a missing value search: https://hl7.org/fhir/search.html#missing
   * @param parameter the search parameter name
   * @param isMissing true if searching for missing values, false if search for non-missing values.
   * @returns the modified builder instance
   *
   * @example
   *    > fhirSearch().missingParam("probability").href
   *    > "probability:missing=true"
   */
  public missingParam(
    parameter: string,
    isMissing = true,
    replace?: "replace" | null | undefined,
  ): this {
    return this.push(
      `${parameter}:missing`,
      isMissing ? "true" : "false",
      replace,
    );
  }

  /**
   * Add a search parameter of type number: https://hl7.org/fhir/search.html#number
   * @param parameter the search parameter name
   * @param value the value to search for. This can be either a number or a string if you want to include the precision in the search, or null/undefined to ignore the search parameter.
   * @param prefix the comparison function to apply
   * @returns the modified builder instance
   *
   * @example
   *    > fhirSearch().numberParam("probability", 3).href
   *    > "probability=3"
   *
   *    > fhirSearch().numberParam("probability", "2e2").href
   *    > "probability=2e2",
   */
  public numberParam(
    parameter: string,
    value: number | string | Array<number | string> | null | undefined,
    prefix?: Prefix | null | undefined,
    replace?: "replace" | null | undefined,
  ): this {
    if (value) {
      const parameterValues = Array.isArray(value)
        ? value.filter(Boolean)
        : [value];
      this.push(
        parameter,
        parameterValues.map((x) => `${prefix || ""}${x}`).join(","),
        replace,
      );
    }
    return this;
  }

  /**
   * Add a search parameter of type quantity: https://hl7.org/fhir/search.html#quantity
   * @param parameter the search parameter name
   * @param number the value to search for. This can be either a number, a string if you want to include the precision in the search, a code/system/number combination, an array of all of the previous combinations, or null/undefined to ignore the search parameter.
   * @param prefix the comparison function to apply
   * @returns the modified builder instance
   *
   * @example
   *    > fhirSearch().quantityParam("value-quantity", { number: 5.4, code: "mg" }).href
   *    > "value-quantity=5.4||mg"
   */
  public quantityParam(
    parameter: string,
    number:
      | number
      | string
      | {
          number: number | string | null | undefined;
          system?: string | null | undefined;
          code?: string | null | undefined;
        }
      | Array<
          | number
          | string
          | {
              number: number | string | null | undefined;
              system?: string | null | undefined;
              code?: string | null | undefined;
            }
        >
      | null
      | undefined,
    prefix?: Prefix | null | undefined,
    replace?: "replace" | null | undefined,
  ): this {
    if (number == undefined || number === "") {
      return this;
    }

    const parameterValues = Array.isArray(number)
      ? number.filter((x) => !(x == undefined) && x !== "")
      : [number];

    if (parameterValues.length === 0) {
      return this;
    }

    this.push(
      parameter,
      parameterValues
        .map(
          (x) =>
            `${prefix || ""}${
              x instanceof Object
                ? [x.number, x.system, x.code]
                    .map((y) => (y ? encodeURIComponent(`${y}`) : ""))
                    .join("|")
                : x
            }`,
        )
        .join(","),
      replace,
    );

    return this;
  }

  /**
   * Add a search parameter of type reference: https://hl7.org/fhir/search.html#reference
   * @param parameter the search parameter name
   * @param id the value to search for; maybe a full id or url, a composite id / type, a token reference if using the "identifier" modifier, or empty/null/undefined to ignore the search parameter.
   * @param modifier :identifier to use an identifier token search or a FHIR resource type to narrow the reference by a specific type
   * @returns the modified builder instance
   *
   * @example
   *    > fhirSearch().referenceParam("subject", "Patient/23").href
   *    > "subject=Patient%2F23"
   *
   *    > fhirSearch().referenceParam("subject", ["12", "23"], "Patient").href
   *    >  "subject:Patient=12,23"
   *
   *    > fhirSearch().referenceParam("subject", { system: "http://acme.org/fhir/identifier/mrn", value: "123456" }, ":identifier").href
   *    > "subject:identifier=http%3A%2F%2Facme.org%2Ffhir%2Fidentifier%2Fmrn|123456"
   */
  public referenceParam(
    parameter: string,
    id:
      | { id: string; type: string }
      | string
      | Array<{ id: string; type: string } | string>
      | null
      | undefined,
    modifier?: AnyResourceType | null | undefined,
    replace?: "replace" | null | undefined,
  ): this;
  public referenceParam(
    parameter: string,
    id:
      | {
          system?: string | null | undefined;
          code?: string | null | undefined;
          value?: string | null | undefined;
        }
      | string
      | Array<
          | {
              system?: string | null | undefined;
              code?: string | null | undefined;
              value?: string | null | undefined;
            }
          | string
        >,
    modifier: ":identifier",
    replace?: "replace" | null | undefined,
  ): this;
  public referenceParam(
    parameter: string,
    id:
      | { id: string; type: string }
      | {
          system?: string | null | undefined;
          code?: string | null | undefined;
          value?: string | null | undefined;
        }
      | string
      | Array<
          | { id: string; type: string }
          | {
              system?: string | null | undefined;
              code?: string | null | undefined;
              value?: string | null | undefined;
            }
          | string
        >
      | null
      | undefined,
    modifier?: ":identifier" | AnyResourceType | null | undefined,
    replace?: "replace" | null | undefined,
  ): this;
  public referenceParam(
    parameter: string,
    id:
      | { id: string; type: string }
      | {
          system?: string | null | undefined;
          code?: string | null | undefined;
          value?: string | null | undefined;
        }
      | string
      | Array<
          | { id: string; type: string }
          | {
              system?: string | null | undefined;
              code?: string | null | undefined;
              value?: string | null | undefined;
            }
          | string
        >
      | null
      | undefined,
    modifier?: ":identifier" | AnyResourceType | null | undefined,
    replace?: "replace" | null | undefined,
  ): this {
    if (!id) {
      return this;
    }

    if (modifier === ":identifier") {
      this.tokenParam(
        `${parameter}:identifier`,
        id as
          | string
          | {
              system?: string | null | undefined;
              code?: string | null | undefined;
              value?: string | null | undefined;
            }
          | Array<
              | {
                  system?: string | null | undefined;
                  code?: string | null | undefined;
                  value?: string | null | undefined;
                }
              | string
            >,
        undefined,
        replace,
      );

      return this;
    }

    const parameterValues = Array.isArray(id) ? id.filter(Boolean) : [id];

    const renderedParameterValues = (
      parameterValues as Array<{ id: string; type: string } | string>
    ).map((x) =>
      typeof x === "string"
        ? encodeURIComponent(x)
        : encodeURIComponent(
            `${x.type}/${
              x.id?.startsWith(x.type + "/") // Let's be kind and auto-correct double type inclusions.
                ? x.id.slice(x.type.length + 1)
                : x.id
            }`,
          ),
    );

    if (renderedParameterValues.length === 0) {
      return this;
    }

    this.push(
      `${parameter}${modifier ? `:${modifier}` : ""}`,
      renderedParameterValues.join(","),
      replace,
    );

    return this;
  }

  /**
   * Add a search parameter of type string: https://hl7.org/fhir/search.html#string
   *
   * For a simple string search, a string parameter serves as the input for a search against sequences of characters.
   * This search is insensitive to casing and included combining characters, like accents or other diacritical marks.
   * Punctuation and non-significant whitespace (e.g. repeated space characters, tab vs space) should also be ignored.
   * By default, a field matches a string query if the value of the field equals or starts with the supplied parameter
   * value, after both have been normalized by case and combining characters.
   *
   * @param parameter the search parameter name
   * @param value the value to search for, multiple values to search for in a OR combination, or empty/null/undefined to ignore the search parameter. The value is URL-encoded automatically.
   * @param modifier the search modifier to apply
   * @returns the modified builder instance
   *
   * @example
   *    > fhirSearch().stringParam("name", "John Doe").href
   *    > "name=John%20Doe"
   *
   *    > fhirSearch().stringParam("given", ["eve", "adam"], ":contains").href
   *    > "given:contains=eve,adam"
   */
  public stringParam(
    parameter: string,
    value: string | string[] | null | undefined,
    modifier?: StringModifier | null | undefined,
    special?: "replace" | "remove" | null | undefined,
  ): this {
    if (special === "remove") {
      return this.push(`${parameter}${modifier || ""}`, "", "remove");
    }

    if (value?.length) {
      const parameterValues = typeof value === "string" ? [value] : value;
      this.push(
        `${parameter}${modifier || ""}`,
        parameterValues.map((x) => encodeURIComponent(x)).join(","),
        special,
      );
    }
    return this;
  }

  /**
   * Composite search parameters support joining single values with a $
   *
   * @param parameter the search parameter name
   * @param value - the value of the parameter. It will be constructed as-is in the final search query
   * @returns the modified builder instance
   *
   * @example
   *    > fhirSearch().compositeParam("component-code-value-quantity", "http://loinc.org|8480-6$lt60").href
   *    > "component-code-value-quantity=http://loinc.org|8480-6$lt60"
   */
  public compositeParam(
    parameter: string,
    value: string | null | undefined,
  ): this {
    if (!value) {
      return this;
    }

    return this.push(parameter, value);
  }

  /**
   * That indicates that the way this parameter works is unique to the parameter and described with the parameter.
   *
   * @param parameter the search parameter name
   * @param value - the value of the parameter. It will be constructed as-is in the final search query
   * @returns the modified builder instance
   *
   * @example
   *    > fhirSearch().specialParam("near", "11.45522|152.22460").href
   *    > "near=11.45522|152.22460"
   */
  public specialParam(
    parameter: string,
    value: string | null | undefined,
  ): this {
    if (!value) {
      return this;
    }

    return this.push(parameter, value);
  }

  /**
   * Add a search parameter of type token: https://hl7.org/fhir/search.html#token
   * @param parameter the search parameter name
   * @param value the value, or the system/code/value, or an array of values, or empty/null/undefined to ignore the search parameter. Values are URL-encoded automatically.
   * @param modifier the search modifier to apply
   * @returns the modified builder instance
   *
   * @example
   *    > fhirSearch().tokenParam("identifier", { system: "http://acme.org/patient", value: "2345" }).href
   *    > "identifier=http%3A%2F%2Facme.org%2Fpatient|2345"
   *
   *    > fhirSearch().tokenParam("gender", ["male", "female"]).href
   *    > "gender=male,female"
   *
   *    > fhirSearch().tokenParam("gender", "male", ":not").href
   *    > "gender:not=male"
   */
  public tokenParam(
    parameter: string,
    value:
      | {
          system?: string | null | undefined;
          code?: string | null | undefined;
          value?: string | null | undefined;
        }
      | string
      | Array<
          | {
              system?: string | null | undefined;
              code?: string | null | undefined;
              value?: string | null | undefined;
            }
          | string
        >
      | null
      | undefined,
    modifier?: TokenModifier | null | undefined,
    replace?: "replace" | null | undefined,
  ): this {
    if (value == undefined) {
      return this;
    }

    const parameterValues = Array.isArray(value)
      ? value.filter(Boolean)
      : [value];

    if (parameterValues.length === 0) {
      return this;
    }

    const renderedParameterValues = parameterValues
      .map((element) => this.tokenParameterValue(element))
      .join(",");

    if (renderedParameterValues) {
      this.push(
        `${parameter}${modifier || ""}`,
        renderedParameterValues,
        replace,
      );
    }
    return this;
  }

  private tokenParameterValue(
    value:
      | string
      | {
          system?: string | null | undefined;
          code?: string | null | undefined;
          value?: string | null | undefined;
        },
  ): string {
    let result = "";

    if (typeof value === "string") {
      result = encodeURIComponent(value);
    } else if (value.system && !value.code && !value.value) {
      result = `${encodeURIComponent(value.system)}|`;
    } else {
      result = [value.system, value.code, value.value]
        .filter((x) => !(x == undefined))
        .map((x) => (x ? encodeURIComponent(x) : x))
        .join("|");
    }

    if (!result || result === "|") {
      return "";
    }

    return result;
  }

  /**
   * Add a search parameter of type uri: https://hl7.org/fhir/search.html#uri
   * @param parameter the search parameter name
   * @param value the value to search for as a string, a URL. an array of strings or URLs, or empty/null/undefined to ignore the parameter.
   * @param modifier the search modifier to apply
   * @returns the modified builder instance
   *
   * @example
   *    > fhirSearch().uriParam("url", "http://acme.org/fhir/ValueSet/123").href
   *    > "url=http%3A%2F%2Facme.org%2Ffhir%2FValueSet%2F123"
   */
  public uriParam(
    parameter: string,
    value: string | URL | Array<string | URL> | null | undefined,
    modifier?: UriModifier | null | undefined,
    replace?: "replace" | null | undefined,
  ): this {
    if (!value) {
      return this;
    }

    const parameterValues = Array.isArray(value)
      ? value.filter(Boolean)
      : [value];
    if (parameterValues.length === 0) {
      return this;
    }

    return this.push(
      `${parameter}${modifier || ""}`,
      parameterValues.map((x) => encodeURIComponent(x.toString())).join(","),
      replace,
    );
  }

  /**
   * Alias for href.
   */
  public toString(): string {
    return this.href;
  }

  /**
   * Get the final string containing the whole URL.
   *
   * @example
   *    > fhirSearch().string("name", "John Doe").href
   *    > "name=John%20Doe"
   *
   *    > fhirSearch().string("name", "John Doe").href
   *    > "name=John%20Doe"
   */
  public get href(): string {
    return this._searchParams.length === 0
      ? ""
      : this._searchParams.map(([key, value]) => `${key}=${value}`).join("&");
  }

  /**
   * The number of primary resources to return by page.
   *
   * @see https://hl7.org/fhir/search.html#count
   */
  _count(value: number): this {
    return this.stringParam("_count", `${value}`, undefined, "replace");
  }

  /**
   * Include a related resource directly referenced by the main resource.
   *
   * @see https://hl7.org/fhir/search.html#include
   */
  _include<TResourceType extends keyof AllResourcesSearchParameters>(
    sourceResource: TResourceType,
    searchParameter: ReferencesOnlySearchParameters<
      AllResourcesSearchParameters[TResourceType]
    >,
    options?: {
      targetResourceType?: TResourceType | null | undefined;
      iterate?: boolean | null | undefined;
    },
  ): this {
    return this.stringParam(
      `_include${options?.iterate == undefined ? "" : ":iterate"}`,
      `${sourceResource}:${String(searchParameter)}${
        options?.targetResourceType ? `:${options.targetResourceType}` : ""
      }`,
    );
  }

  /**
   * Include a related resource referencing the main resource.
   *
   * @see https://hl7.org/fhir/search.html#revinclude
   */
  _revinclude<TResourceType extends keyof AllResourcesSearchParameters>(
    sourceResource: TResourceType,
    searchParameter: ReferencesOnlySearchParameters<
      AllResourcesSearchParameters[TResourceType]
    >,
    options?: {
      targetResourceType?: TResourceType | null | undefined;
      iterate?: boolean | null | undefined;
    },
  ): this {
    return this.stringParam(
      `_revinclude${options?.iterate == undefined ? "" : ":iterate"}`,
      `${sourceResource}:${String(searchParameter)}${
        options?.targetResourceType ? `:${options.targetResourceType}` : ""
      }`,
    );
  }

  /**
   *  Return only a portion of the resources.
   *
   * @see https://hl7.org/fhir/search.html#summary
   */
  _summary(value: SummaryValue): this {
    return this.stringParam("_summary", `${value}`, undefined, "replace");
  }

  /**
   * Add a `total` element to the returned `Bundle` which is the number of resources that match the search parameters.
   * Note that `Bundle.total` represents the total number of matches, not how many resources are returned in a particular response
   *
   * @see https://hl7.org/fhir/search.html#total
   */
  _total(value: "none" | "estimate" | "accurate"): this {
    return this.stringParam("_total", value, undefined, "replace");
  }

  private push(
    parameter: string,
    value: string,
    special?: "replace" | "remove" | null | undefined,
  ): this {
    if (special) {
      let foundIndex = 0;
      while (
        (foundIndex = this._searchParams.findIndex(
          (x) => x[0] === parameter,
        )) !== -1
      ) {
        this._searchParams.splice(foundIndex, 1);
      }
    }

    if (special !== "remove") {
      this._searchParams.push([parameter, value]);
    }

    return this;
  }
}

/**
 * A prefix to the parameter value may be used to control the nature of the matching.
 * https://hl7.org/fhir/search.html#prefix
 */
export const Prefix = {
  /**
   * the value for the parameter in the resource is equal to the provided value
   *
   * the range of the search value fully contains the range of the target value
   */
  Equal: "eq",

  /**
   * the value for the parameter in the resource is not equal to the provided value
   *
   * the range of the search value does not fully contain the range of the target value
   */
  NotEqual: "ne",

  /**
   * the value for the parameter in the resource is greater than the provided value
   *
   * the range above the search value intersects (i.e. overlaps) with the range of the target value
   */
  GreaterThan: "gt",

  /**
   * the value for the parameter in the resource is less than the provided value
   *
   * the range below the search value intersects (i.e. overlaps) with the range of the target value
   */
  LessThan: "lt",

  /**
   * the value for the parameter in the resource is greater or equal to the provided value
   *
   * the range above the search value intersects (i.e. overlaps) with the range of the target value,
   * or the range of the search value fully contains the range of the target value
   */
  GreaterThanOrEqual: "ge",

  /**
   * the value for the parameter in the resource is less or equal to the provided value
   *
   * the range below the search value intersects (i.e. overlaps) with the range of the target value,
   * or the range of the search value fully contains the range of the target value
   */
  LessThanOrEqual: "le",

  /**
   * the value for the parameter in the resource starts after the provided value
   *
   * the range of the search value does not overlap with the range of the target value,
   * and the range above the search value contains the range of the target value
   */
  StartsAfter: "sa",

  /**
   * the value for the parameter in the resource ends before the provided value
   *
   * the range of the search value does overlap not with the range of the target value,
   * and the range below the search value contains the range of the target value
   */
  EndsBefore: "eb",

  /**
   * the value for the parameter in the resource is approximately the same to the provided value.
   * Note that the recommended value for the approximation is 10% of the stated value
   * (or for a date, 10% of the gap between now and the date), but systems may choose other values where appropriate
   *
   * the range of the search value overlaps with the range of the target value
   */
  ApproximatelyTheSame: "ap",
} as const;

/**
 * A prefix to the parameter value may be used to control the nature of the matching.
 * https://hl7.org/fhir/search.html#prefix
 */
export type Prefix = (typeof Prefix)[keyof typeof Prefix];

/**
 * https://hl7.org/fhir/search.html#string
 */
export const StringModifier = {
  /**
   * Returns results that include the supplied parameter value anywhere within the field being searched
   */
  Contains: ":contains",

  /**
   * Returns results that match the entire supplied parameter, including casing and accents.
   */
  Exact: ":exact",

  /**
   * Advanced text handling capabilities.
   * https://hl7.org/fhir/search.html#text
   */
  Text: ":text",
} as const;

export type StringModifier =
  (typeof StringModifier)[keyof typeof StringModifier];

/**
 * https://hl7.org/fhir/search.html#token
 */
export const TokenModifier = {
  /**
   * The search parameter is processed as a string that searches text associated with the code/value -
   * either CodeableConcept.text, Coding.display, or Identifier.type.text.
   * In this case, the search functions as a [normal string search](https://hl7.org/fhir/search.html#string)
   */
  Text: ":text",

  /**
   * Reverse the code matching described in the paragraph above: return all resources that do not have a matching item.
   * Note that this includes resources that have no value for the parameter - e.g. ?gender:not=male includes all
   * patients that do not have gender = male, including patients that do not have a gender at all
   */
  Not: ":not",

  /**
   * The search parameter is a concept with the form `[system]|[code]`, and the search parameter tests whether the
   * coding in a resource [subsumes](https://hl7.org/fhir/codesystem.html#subsumption) the specified search code.
   * For example, the search concept has an is-a relationship with the coding in the resource,
   * and this includes the coding itself.
   */
  Above: ":above",

  /**
   * The search parameter is a concept with the form `[system]|[code]`, and the search parameter tests whether the
   * coding in a resource is [subsumed](https://hl7.org/fhir/codesystem.html#subsumption) by the specified search code.
   * For example, the coding in the resource has an is-a relationship with the search concept,
   * and this includes the coding itself.
   */
  Below: ":below",

  /**
   * The search parameter is a URI (relative or absolute) that identifies a value set, and the search parameter
   * tests whether the coding is in the specified [value set](https://hl7.org/fhir/valueset.html).
   * The reference may be literal (to an address where the value set can be found) or logical (a reference to ValueSet.url).
   * If the server can treat the reference as a literal URL, it does, else it tries to match known logical ValueSet.url values.
   */
  In: ":in",

  /**
   * The search parameter is a URI (relative or absolute) that identifies a value set,
   * and the search parameter tests whether the coding is not in the specified value set.
   */
  NotIn: ":not-in",

  /**
   * The search parameter has the format system|code|value, where the system and code refer to a
   * `Identifier.type.coding.system` and `.code`, and match if any of the type codes match. All 3 parts must be present
   */
  OfType: ":of-type",
} as const;

/**
 * https://hl7.org/fhir/search.html#token
 */
export type TokenModifier = (typeof TokenModifier)[keyof typeof TokenModifier];

/**
 * https://hl7.org/fhir/search.html#uri
 */
export const UriModifier = {
  /**
   * Search for any value above a given specific URL. This will match on any value set with the specified URL,
   * but also on URL that only have parent paths.
   * e.g. http://acme.org/fhir/ValueSet/123/_history/5 also matches http://acme.org/fhir/ValueSet/123
   *
   * Only apply to URLs, and not URNS such as OIDs
   */
  Above: ":above",

  /**
   * Search any value that have a URL that starts with the matching url.
   *
   * Only apply to URLs, and not URNS such as OIDs
   */
  Below: ":below",
} as const;

export type UriModifier = (typeof UriModifier)[keyof typeof UriModifier];

export type SummaryValue = "true" | "text" | "data" | "count" | "false";

export type ReferencesOnlySearchParameters<T> = RemoveUnderscoreKeys<
  keyof {
    [K in keyof T as T[K] extends "reference" ? K : never]: T[K];
  }
>;
