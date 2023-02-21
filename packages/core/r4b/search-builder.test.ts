/* eslint-disable unicorn/no-useless-undefined */
/* eslint-disable unicorn/no-null */
import {
  fhirSearch,
  FhirSearchBuilder,
  Prefix,
  StringModifier,
  TokenModifier,
  UriModifier,
} from "./search-builder";

describe("search-builder", () => {
  it("build empty", () => {
    const search = fhirSearch();
    expect(search.href).toBe("");
  });

  it("build with search parameters", () => {
    const search = fhirSearch().string("name", "John Doe");
    expect(search.href).toBe("name=John%20Doe");
  });

  it("clone", () => {
    const search = fhirSearch().token("foo", "bar");
    const search2 = search.clone().missing("practitioner");

    expect(search.href).not.toEqual(search2.href);
  });

  it.each(<Array<[FhirSearchBuilder, string]>>[
    [fhirSearch().date("date", "2022-01-02"), "date=2022-01-02"],
    [
      fhirSearch().date("date", ["2022-01-02", "2022-01-03"]),
      "date=2022-01-02,2022-01-03",
    ],
    [
      fhirSearch().date("date", new Date(2022, 1, 2, 15, 50, 23)),
      "date=2022-02-02T15:50:23.000Z",
    ],
    [
      fhirSearch()
        .date("date", "2010-01-01", Prefix.GreaterThanOrEqual)
        .date("date", "2011-12-31", Prefix.LessThanOrEqual),
      "date=ge2010-01-01&date=le2011-12-31",
    ],
    [
      fhirSearch()
        .date("date", "2010-01-01", Prefix.GreaterThanOrEqual)
        .date("date", "2011-12-31", Prefix.LessThanOrEqual, "replace"),
      "date=le2011-12-31",
    ],
    [fhirSearch().date("date", null), ""],
    [fhirSearch().date("date", undefined), ""],
    [fhirSearch().date("date", ""), ""],
  ])("date/%s", (builder, expected) => {
    expect(builder.href).toBe(expected);
  });

  it.each(<Array<[FhirSearchBuilder, string]>>[
    [fhirSearch().missing("probability"), "probability:missing=true"],
    [fhirSearch().missing("probability", true), "probability:missing=true"],
    [fhirSearch().missing("probability", false), "probability:missing=false"],
    [
      fhirSearch()
        .missing("probability", false)
        .missing("probability", true, "replace"),
      "probability:missing=true",
    ],
  ])("missing/%s", (builder, expected) => {
    expect(builder.href).toBe(expected);
  });

  it.each(<Array<[FhirSearchBuilder, string]>>[
    [fhirSearch().number("probability", 3), "probability=3"],
    [fhirSearch().number("probability", [3, 4, 5]), "probability=3,4,5"],
    [fhirSearch().number("probability", "2e2"), "probability=2e2"],
    [
      fhirSearch().number("probability", 0.5, Prefix.LessThan),
      "probability=lt0.5",
    ],
    [
      fhirSearch().number("probability", [0.5, "0.70"], Prefix.LessThan),
      "probability=lt0.5,lt0.70",
    ],
    [fhirSearch().number("probability", "3.00"), "probability=3.00"],
    [fhirSearch().number("probability", null), ""],
    [fhirSearch().number("probability", undefined), ""],
    [fhirSearch().number("probability", ""), ""],
    [
      fhirSearch()
        .number("probability", "2e2")
        .number("probability", 3, null, "replace"),
      "probability=3",
    ],
  ])("number/%s", (builder, expected) => {
    expect(builder.href).toBe(expected);
  });

  it.each(<Array<[FhirSearchBuilder, string]>>[
    [
      fhirSearch().quantity("value-quantity", {
        number: 5.4,
        code: "mg",
      }),
      "value-quantity=5.4||mg",
    ],
    [
      fhirSearch().quantity("value-quantity", [
        {
          number: 5.4,
          code: "mg",
        },
        3,
      ]),
      "value-quantity=5.4||mg,3",
    ],
    [
      fhirSearch().quantity("value-quantity", {
        number: "5.40e-3",
        system: "http://unitsofmeasure.org",
        code: "g",
      }),
      "value-quantity=5.40e-3|http%3A%2F%2Funitsofmeasure.org|g",
    ],
    [
      fhirSearch().quantity(
        "value-quantity",
        {
          number: 5.4,
          system: "http://unitsofmeasure.org",
          code: "g",
        },
        Prefix.ApproximatelyTheSame
      ),
      "value-quantity=ap5.4|http%3A%2F%2Funitsofmeasure.org|g",
    ],
    [fhirSearch().quantity("value-quantity", 0), "value-quantity=0"],
    [fhirSearch().quantity("value-quantity", undefined), ""],
    [fhirSearch().quantity("value-quantity", null), ""],
    [fhirSearch().quantity("value-quantity", ""), ""],
    [
      fhirSearch()
        .quantity("value-quantity", {
          number: 5.4,
          code: "mg",
        })
        .quantity("value-quantity", 0, null, "replace"),
      "value-quantity=0",
    ],
  ])("quantity/%s", (builder, expected) => {
    expect(builder.href).toBe(expected);
  });

  it.each(<Array<[FhirSearchBuilder, string]>>[
    [fhirSearch().reference("subject", "Patient/23"), "subject=Patient%2F23"],
    [
      fhirSearch().reference("subject", ["Patient/23", "Patient/45"]),
      "subject=Patient%2F23,Patient%2F45",
    ],
    [
      fhirSearch().reference("subject", {
        type: "Patient",
        id: "Patient/23",
      }),
      "subject=Patient%2F23",
    ],
    [fhirSearch().reference("subject", "23", "Patient"), "subject:Patient=23"],
    [
      fhirSearch().reference("subject", ["12", "23"], "Patient"),
      "subject:Patient=12,23",
    ],
    [
      fhirSearch().reference("subject", "123456", ":identifier"),
      "subject:identifier=123456",
    ],
    [
      fhirSearch().reference(
        "subject",
        { system: "http://acme.org/fhir/identifier/mrn", value: "123456" },
        ":identifier"
      ),
      "subject:identifier=http%3A%2F%2Facme.org%2Ffhir%2Fidentifier%2Fmrn|123456",
    ],
    [
      fhirSearch().reference("subject", {
        type: "Patient",
        id: "23",
      }),
      "subject=Patient%2F23",
    ],
    [fhirSearch().reference("subject", null), ""],
    [fhirSearch().reference("subject", undefined), ""],
    [fhirSearch().reference("subject", ""), ""],
    [
      fhirSearch()
        .reference("subject", "23", "Patient")
        .reference("subject", "123456", "Patient", "replace"),
      "subject:Patient=123456",
    ],
  ])("reference/%s", (builder, expected) => {
    expect(builder.href).toBe(expected);
  });

  it.each(<Array<[FhirSearchBuilder, string]>>[
    [fhirSearch().string("name", "John Doe"), "name=John%20Doe"],
    [
      fhirSearch().string("name", ["John Doe", "Jane Doe"]),
      "name=John%20Doe,Jane%20Doe",
    ],
    [
      fhirSearch().string("given", "eve", StringModifier.Contains),
      "given:contains=eve",
    ],
    [
      fhirSearch().string("given", ["eve", "adam"], StringModifier.Exact),
      "given:exact=eve,adam",
    ],
    [fhirSearch().string("name", null), ""],
    [fhirSearch().string("name", undefined), ""],
    [fhirSearch().string("name", ""), ""],
    [
      fhirSearch()
        .string("name", "John Doe")
        .string("name", "eve", null, "replace"),
      "name=eve",
    ],
  ])("string/%s", (builder, expected) => {
    expect(builder.href).toBe(expected);
  });

  it.each(<Array<[FhirSearchBuilder, string]>>[
    [
      fhirSearch().token("identifier", {
        system: "http://acme.org/patient",
        value: "2345",
      }),
      "identifier=http%3A%2F%2Facme.org%2Fpatient|2345",
    ],
    [
      fhirSearch().token("identifier", [
        {
          system: "http://acme.org/patient",
          value: "2345",
        },
        { system: "http://acme.org/patient-mbi", value: "abcd" },
      ]),
      "identifier=http%3A%2F%2Facme.org%2Fpatient|2345,http%3A%2F%2Facme.org%2Fpatient-mbi|abcd",
    ],
    [fhirSearch().token("gender", "male"), "gender=male"],
    [fhirSearch().token("gender", ["male", "female"]), "gender=male,female"],
    [
      fhirSearch().token("gender", "male", TokenModifier.Not),
      "gender:not=male",
    ],
    [
      fhirSearch().token("code", "126851005", TokenModifier.Below),
      "code:below=126851005",
    ],
    [
      fhirSearch().token(
        "code",
        "http://acme.org/fhir/ValueSet/cardiac-conditions",
        ":in"
      ),
      "code:in=http%3A%2F%2Facme.org%2Ffhir%2FValueSet%2Fcardiac-conditions",
    ],
    [
      fhirSearch().token(
        "identifier",
        {
          system: "http://terminology.hl7.org/CodeSystem/v2-0203",
          code: "MR",
          value: "446053",
        },
        TokenModifier.OfType
      ),
      "identifier:of-type=http%3A%2F%2Fterminology.hl7.org%2FCodeSystem%2Fv2-0203|MR|446053",
    ],
    [fhirSearch().token("identifier", null), ""],
    [fhirSearch().token("identifier", undefined), ""],
    [fhirSearch().token("identifier", ""), ""],
    [
      fhirSearch().token("identifier", {
        code: null,
        system: null,
      }),
      "",
    ],
    [
      fhirSearch().token("identifier", {
        code: undefined,
        system: undefined,
      }),
      "",
    ],
    [
      fhirSearch().token("identifier", {
        code: "",
        system: "",
      }),
      "",
    ],
    [
      fhirSearch()
        .token("gender", "male")
        .token("gender", "female", null, "replace"),
      "gender=female",
    ],
  ])("token/%s", (builder, expected) => {
    expect(builder.href).toBe(expected);
  });

  it.each(<Array<[FhirSearchBuilder, string]>>[
    [
      fhirSearch().uri("url", "http://acme.org/fhir/ValueSet/123"),
      "url=http%3A%2F%2Facme.org%2Ffhir%2FValueSet%2F123",
    ],
    [
      fhirSearch().uri("url", [
        "http://acme.org/fhir/ValueSet/123",
        "https://foo/bar",
      ]),
      "url=http%3A%2F%2Facme.org%2Ffhir%2FValueSet%2F123,https%3A%2F%2Ffoo%2Fbar",
    ],
    [
      fhirSearch().uri("url", new URL("http://acme.org/fhir/ValueSet/123")),
      "url=http%3A%2F%2Facme.org%2Ffhir%2FValueSet%2F123",
    ],
    [
      fhirSearch().uri("url", "http://acme.org/fhir/", UriModifier.Below),
      "url:below=http%3A%2F%2Facme.org%2Ffhir%2F",
    ],
    [fhirSearch().uri("url", "urn:oid:1.2.3.4.5"), "url=urn%3Aoid%3A1.2.3.4.5"],
    [fhirSearch().uri("url", null), ""],
    [fhirSearch().uri("url", undefined), ""],
    [fhirSearch().uri("url", ""), ""],
    [
      fhirSearch()
        .uri("url", "http://acme.org/fhir/ValueSet/123")
        .uri("url", "http://acme.org/fhir/", null, "replace"),
      "url=http%3A%2F%2Facme.org%2Ffhir%2F",
    ],
  ])("uri/%s", (builder, expected) => {
    expect(builder.href).toBe(expected);
  });
});
