/* eslint-disable unicorn/no-null */
/* eslint-disable unicorn/no-useless-undefined */
import {
  fhirSearch,
  FhirSearchBuilder,
  Prefix,
  StringModifier,
  TokenModifier,
  UriModifier,
} from "./search";

describe("search", () => {
  it("build empty", () => {
    const search = fhirSearch();
    expect(search.href).toBe("");
  });

  it("build with search parameters", () => {
    const search = fhirSearch().stringParam("name", "John Doe");
    expect(search.href).toBe("name=John%20Doe");
  });

  it("clone", () => {
    const search = fhirSearch().tokenParam("foo", "bar");
    const search2 = search.clone().missingParam("practitioner");

    expect(search.href).not.toEqual(search2.href);
  });

  it.each(<Array<[FhirSearchBuilder, string]>>[
    [fhirSearch().dateParam("date", "2022-01-02"), "date=2022-01-02"],
    [
      fhirSearch().dateParam("date", ["2022-01-02", "2022-01-03"]),
      "date=2022-01-02,2022-01-03",
    ],
    [
      fhirSearch().dateParam("date", new Date(2022, 1, 2, 15, 50, 23)),
      "date=2022-02-02T15:50:23.000Z",
    ],
    [
      fhirSearch()
        .dateParam("date", "2010-01-01", Prefix.GreaterThanOrEqual)
        .dateParam("date", "2011-12-31", Prefix.LessThanOrEqual),
      "date=ge2010-01-01&date=le2011-12-31",
    ],
    [
      fhirSearch()
        .dateParam("date", "2010-01-01", Prefix.GreaterThanOrEqual)
        .dateParam("date", "2011-12-31", Prefix.LessThanOrEqual, "replace"),
      "date=le2011-12-31",
    ],
    [fhirSearch().dateParam("date", null), ""],
    [fhirSearch().dateParam("date", undefined), ""],
    [fhirSearch().dateParam("date", ""), ""],
  ])("date/%s", (builder, expected) => {
    expect(builder.href).toBe(expected);
  });

  it.each(<Array<[FhirSearchBuilder, string]>>[
    [fhirSearch().missingParam("probability"), "probability:missing=true"],
    [
      fhirSearch().missingParam("probability", true),
      "probability:missing=true",
    ],
    [
      fhirSearch().missingParam("probability", false),
      "probability:missing=false",
    ],
    [
      fhirSearch()
        .missingParam("probability", false)
        .missingParam("probability", true, "replace"),
      "probability:missing=true",
    ],
  ])("missing/%s", (builder, expected) => {
    expect(builder.href).toBe(expected);
  });

  it.each(<Array<[FhirSearchBuilder, string]>>[
    [fhirSearch().numberParam("probability", 3), "probability=3"],
    [fhirSearch().numberParam("probability", [3, 4, 5]), "probability=3,4,5"],
    [fhirSearch().numberParam("probability", "2e2"), "probability=2e2"],
    [
      fhirSearch().numberParam("probability", 0.5, Prefix.LessThan),
      "probability=lt0.5",
    ],
    [
      fhirSearch().numberParam("probability", [0.5, "0.70"], Prefix.LessThan),
      "probability=lt0.5,lt0.70",
    ],
    [fhirSearch().numberParam("probability", "3.00"), "probability=3.00"],
    [fhirSearch().numberParam("probability", null), ""],
    [fhirSearch().numberParam("probability", undefined), ""],
    [fhirSearch().numberParam("probability", ""), ""],
    [
      fhirSearch()
        .numberParam("probability", "2e2")
        .numberParam("probability", 3, null, "replace"),
      "probability=3",
    ],
  ])("number/%s", (builder, expected) => {
    expect(builder.href).toBe(expected);
  });

  it.each(<Array<[FhirSearchBuilder, string]>>[
    [
      fhirSearch().quantityParam("value-quantity", {
        number: 5.4,
        code: "mg",
      }),
      "value-quantity=5.4||mg",
    ],
    [
      fhirSearch().quantityParam("value-quantity", [
        {
          number: 5.4,
          code: "mg",
        },
        3,
      ]),
      "value-quantity=5.4||mg,3",
    ],
    [
      fhirSearch().quantityParam("value-quantity", {
        number: "5.40e-3",
        system: "http://unitsofmeasure.org",
        code: "g",
      }),
      "value-quantity=5.40e-3|http%3A%2F%2Funitsofmeasure.org|g",
    ],
    [
      fhirSearch().quantityParam(
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
    [fhirSearch().quantityParam("value-quantity", 0), "value-quantity=0"],
    [fhirSearch().quantityParam("value-quantity", undefined), ""],
    [fhirSearch().quantityParam("value-quantity", null), ""],
    [fhirSearch().quantityParam("value-quantity", ""), ""],
    [
      fhirSearch()
        .quantityParam("value-quantity", {
          number: 5.4,
          code: "mg",
        })
        .quantityParam("value-quantity", 0, null, "replace"),
      "value-quantity=0",
    ],
  ])("quantity/%s", (builder, expected) => {
    expect(builder.href).toBe(expected);
  });

  it.each(<Array<[FhirSearchBuilder, string]>>[
    [
      fhirSearch().referenceParam("subject", "Patient/23"),
      "subject=Patient%2F23",
    ],
    [
      fhirSearch().referenceParam("subject", ["Patient/23", "Patient/45"]),
      "subject=Patient%2F23,Patient%2F45",
    ],
    [
      fhirSearch().referenceParam("subject", {
        type: "Patient",
        id: "Patient/23",
      }),
      "subject=Patient%2F23",
    ],
    [
      fhirSearch().referenceParam("subject", "23", "Patient"),
      "subject:Patient=23",
    ],
    [
      fhirSearch().referenceParam("subject", ["12", "23"], "Patient"),
      "subject:Patient=12,23",
    ],
    [
      fhirSearch().referenceParam("subject", "123456", ":identifier"),
      "subject:identifier=123456",
    ],
    [
      fhirSearch().referenceParam(
        "subject",
        { system: "http://acme.org/fhir/identifier/mrn", value: "123456" },
        ":identifier"
      ),
      "subject:identifier=http%3A%2F%2Facme.org%2Ffhir%2Fidentifier%2Fmrn|123456",
    ],
    [
      fhirSearch().referenceParam("subject", {
        type: "Patient",
        id: "23",
      }),
      "subject=Patient%2F23",
    ],
    [fhirSearch().referenceParam("subject", null), ""],
    [fhirSearch().referenceParam("subject", undefined), ""],
    [fhirSearch().referenceParam("subject", ""), ""],
    [
      fhirSearch()
        .referenceParam("subject", "23", "Patient")
        .referenceParam("subject", "123456", "Patient", "replace"),
      "subject:Patient=123456",
    ],
  ])("reference/%s", (builder, expected) => {
    expect(builder.href).toBe(expected);
  });

  it.each(<Array<[FhirSearchBuilder, string]>>[
    [fhirSearch().stringParam("name", "John Doe"), "name=John%20Doe"],
    [
      fhirSearch().stringParam("name", ["John Doe", "Jane Doe"]),
      "name=John%20Doe,Jane%20Doe",
    ],
    [
      fhirSearch().stringParam("given", "eve", StringModifier.Contains),
      "given:contains=eve",
    ],
    [
      fhirSearch().stringParam("given", ["eve", "adam"], StringModifier.Exact),
      "given:exact=eve,adam",
    ],
    [fhirSearch().stringParam("name", null), ""],
    [fhirSearch().stringParam("name", undefined), ""],
    [fhirSearch().stringParam("name", ""), ""],
    [
      fhirSearch()
        .stringParam("name", "John Doe")
        .stringParam("name", "eve", null, "replace"),
      "name=eve",
    ],
  ])("string/%s", (builder, expected) => {
    expect(builder.href).toBe(expected);
  });

  it.each(<Array<[FhirSearchBuilder, string]>>[
    [
      fhirSearch().tokenParam("identifier", {
        system: "http://acme.org/patient",
        value: "2345",
      }),
      "identifier=http%3A%2F%2Facme.org%2Fpatient|2345",
    ],
    [
      fhirSearch().tokenParam("identifier", [
        {
          system: "http://acme.org/patient",
          value: "2345",
        },
        { system: "http://acme.org/patient-mbi", value: "abcd" },
      ]),
      "identifier=http%3A%2F%2Facme.org%2Fpatient|2345,http%3A%2F%2Facme.org%2Fpatient-mbi|abcd",
    ],
    [fhirSearch().tokenParam("gender", "male"), "gender=male"],
    [
      fhirSearch().tokenParam("gender", ["male", "female"]),
      "gender=male,female",
    ],
    [
      fhirSearch().tokenParam("gender", "male", TokenModifier.Not),
      "gender:not=male",
    ],
    [
      fhirSearch().tokenParam("code", "126851005", TokenModifier.Below),
      "code:below=126851005",
    ],
    [
      fhirSearch().tokenParam("code", {
        system: "http://hl7.org/fhir/sid/icd-10",
      }),
      "code=http%3A%2F%2Fhl7.org%2Ffhir%2Fsid%2Ficd-10|",
    ],
    [
      fhirSearch().tokenParam(
        "code",
        "http://acme.org/fhir/ValueSet/cardiac-conditions",
        ":in"
      ),
      "code:in=http%3A%2F%2Facme.org%2Ffhir%2FValueSet%2Fcardiac-conditions",
    ],
    [
      fhirSearch().tokenParam(
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
    [fhirSearch().tokenParam("identifier", null), ""],
    [fhirSearch().tokenParam("identifier", undefined), ""],
    [fhirSearch().tokenParam("identifier", ""), ""],
    [
      fhirSearch().tokenParam("identifier", {
        code: null,
        system: null,
      }),
      "",
    ],
    [
      fhirSearch().tokenParam("identifier", {
        code: undefined,
        system: undefined,
      }),
      "",
    ],
    [
      fhirSearch().tokenParam("identifier", {
        code: "",
        system: "",
      }),
      "",
    ],
    [
      fhirSearch()
        .tokenParam("gender", "male")
        .tokenParam("gender", "female", null, "replace"),
      "gender=female",
    ],
  ])("token/%s", (builder, expected) => {
    expect(builder.href).toBe(expected);
  });

  it.each(<Array<[FhirSearchBuilder, string]>>[
    [
      fhirSearch().uriParam("url", "http://acme.org/fhir/ValueSet/123"),
      "url=http%3A%2F%2Facme.org%2Ffhir%2FValueSet%2F123",
    ],
    [
      fhirSearch().uriParam("url", [
        "http://acme.org/fhir/ValueSet/123",
        "https://foo/bar",
      ]),
      "url=http%3A%2F%2Facme.org%2Ffhir%2FValueSet%2F123,https%3A%2F%2Ffoo%2Fbar",
    ],
    [
      fhirSearch().uriParam(
        "url",
        new URL("http://acme.org/fhir/ValueSet/123")
      ),
      "url=http%3A%2F%2Facme.org%2Ffhir%2FValueSet%2F123",
    ],
    [
      fhirSearch().uriParam("url", "http://acme.org/fhir/", UriModifier.Below),
      "url:below=http%3A%2F%2Facme.org%2Ffhir%2F",
    ],
    [
      fhirSearch().uriParam("url", "urn:oid:1.2.3.4.5"),
      "url=urn%3Aoid%3A1.2.3.4.5",
    ],
    [fhirSearch().uriParam("url", null), ""],
    [fhirSearch().uriParam("url", undefined), ""],
    [fhirSearch().uriParam("url", ""), ""],
    [
      fhirSearch()
        .uriParam("url", "http://acme.org/fhir/ValueSet/123")
        .uriParam("url", "http://acme.org/fhir/", null, "replace"),
      "url=http%3A%2F%2Facme.org%2Ffhir%2F",
    ],
  ])("uri/%s", (builder, expected) => {
    expect(builder.href).toBe(expected);
  });
});
