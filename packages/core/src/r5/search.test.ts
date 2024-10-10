/* eslint-disable unicorn/no-null */
/* eslint-disable unicorn/no-useless-undefined */
import { Organization, Retrieved } from "@bonfhir/fhirtypes/r5";
import { duration } from "./date-time-helpers";
import {
  FhirSearchBuilder,
  Prefix,
  StringModifier,
  TokenModifier,
  UriModifier,
} from "./search";

describe("FhirSearchBuilder", () => {
  it("build empty", () => {
    const search = new FhirSearchBuilder();
    expect(search.href).toBe("");
  });

  it("build with search parameters", () => {
    const search = new FhirSearchBuilder().stringParam("name", "John Doe");
    expect(search.href).toBe("name=John%20Doe");
  });

  it("clone", () => {
    const search = new FhirSearchBuilder().tokenParam("foo", "bar");
    const search2 = search.clone().missingParam("practitioner");

    expect(search.href).not.toEqual(search2.href);
  });

  it.each(<Array<[FhirSearchBuilder, string]>>[
    [
      new FhirSearchBuilder().dateParam("date", "2022-01-02"),
      "date=2022-01-02",
    ],
    [
      new FhirSearchBuilder().dateParam("date", ["2022-01-02", "2022-01-03"]),
      "date=2022-01-02,2022-01-03",
    ],
    [
      new FhirSearchBuilder()
        .dateParam("date", "2010-01-01", Prefix.GreaterThanOrEqual)
        .dateParam("date", "2011-12-31", Prefix.LessThanOrEqual),
      "date=ge2010-01-01&date=le2011-12-31",
    ],
    [
      new FhirSearchBuilder()
        .dateParam("date", "2010-01-01", Prefix.GreaterThanOrEqual)
        .dateParam("date", "2011-12-31", Prefix.LessThanOrEqual, "replace"),
      "date=le2011-12-31",
    ],
    [
      new FhirSearchBuilder().dateParam(
        "date",
        duration.add("2023-07-05", duration.months(-3)),
        "ge",
      ),
      "date=ge2023-04-05",
    ],
    [new FhirSearchBuilder().dateParam("date", null), ""],
    [new FhirSearchBuilder().dateParam("date", undefined), ""],
    [new FhirSearchBuilder().dateParam("date", ""), ""],
  ])("date/%s", (builder, expected) => {
    expect(builder.href).toBe(expected);
  });

  it.each(<Array<[FhirSearchBuilder, string]>>[
    [
      new FhirSearchBuilder().missingParam("probability"),
      "probability:missing=true",
    ],
    [
      new FhirSearchBuilder().missingParam("probability", true),
      "probability:missing=true",
    ],
    [
      new FhirSearchBuilder().missingParam("probability", false),
      "probability:missing=false",
    ],
    [
      new FhirSearchBuilder()
        .missingParam("probability", false)
        .missingParam("probability", true, "replace"),
      "probability:missing=true",
    ],
  ])("missing/%s", (builder, expected) => {
    expect(builder.href).toBe(expected);
  });

  it.each(<Array<[FhirSearchBuilder, string]>>[
    [new FhirSearchBuilder().numberParam("probability", 3), "probability=3"],
    [
      new FhirSearchBuilder().numberParam("probability", [3, 4, 5]),
      "probability=3,4,5",
    ],
    [
      new FhirSearchBuilder().numberParam("probability", "2e2"),
      "probability=2e2",
    ],
    [
      new FhirSearchBuilder().numberParam("probability", 0.5, Prefix.LessThan),
      "probability=lt0.5",
    ],
    [
      new FhirSearchBuilder().numberParam(
        "probability",
        [0.5, "0.70"],
        Prefix.LessThan,
      ),
      "probability=lt0.5,lt0.70",
    ],
    [
      new FhirSearchBuilder().numberParam("probability", "3.00"),
      "probability=3.00",
    ],
    [new FhirSearchBuilder().numberParam("probability", null), ""],
    [new FhirSearchBuilder().numberParam("probability", undefined), ""],
    [new FhirSearchBuilder().numberParam("probability", ""), ""],
    [
      new FhirSearchBuilder()
        .numberParam("probability", "2e2")
        .numberParam("probability", 3, null, "replace"),
      "probability=3",
    ],
  ])("number/%s", (builder, expected) => {
    expect(builder.href).toBe(expected);
  });

  it.each(<Array<[FhirSearchBuilder, string]>>[
    [
      new FhirSearchBuilder().quantityParam("value-quantity", {
        number: 5.4,
        code: "mg",
      }),
      "value-quantity=5.4||mg",
    ],
    [
      new FhirSearchBuilder().quantityParam("value-quantity", [
        {
          number: 5.4,
          code: "mg",
        },
        3,
      ]),
      "value-quantity=5.4||mg,3",
    ],
    [
      new FhirSearchBuilder().quantityParam("value-quantity", {
        number: "5.40e-3",
        system: "http://unitsofmeasure.org",
        code: "g",
      }),
      "value-quantity=5.40e-3|http%3A%2F%2Funitsofmeasure.org|g",
    ],
    [
      new FhirSearchBuilder().quantityParam(
        "value-quantity",
        {
          number: 5.4,
          system: "http://unitsofmeasure.org",
          code: "g",
        },
        Prefix.ApproximatelyTheSame,
      ),
      "value-quantity=ap5.4|http%3A%2F%2Funitsofmeasure.org|g",
    ],
    [
      new FhirSearchBuilder().quantityParam("value-quantity", 0),
      "value-quantity=0",
    ],
    [new FhirSearchBuilder().quantityParam("value-quantity", undefined), ""],
    [new FhirSearchBuilder().quantityParam("value-quantity", null), ""],
    [new FhirSearchBuilder().quantityParam("value-quantity", ""), ""],
    [
      new FhirSearchBuilder()
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

  const organization: Retrieved<Organization> = {
    resourceType: "Organization",
    id: "456",
    meta: {
      versionId: "2",
      lastUpdated: "2021-07-05T14:48:00.000Z",
    },
  };

  it.each(<Array<[FhirSearchBuilder, string]>>[
    [
      new FhirSearchBuilder().referenceParam("subject", "Patient/23"),
      "subject=Patient%2F23",
    ],
    [
      new FhirSearchBuilder().referenceParam("subject", [
        "Patient/23",
        "Patient/45",
      ]),
      "subject=Patient%2F23,Patient%2F45",
    ],
    [
      new FhirSearchBuilder().referenceParam("subject", {
        type: "Patient",
        id: "Patient/23",
      }),
      "subject=Patient%2F23",
    ],
    [
      new FhirSearchBuilder().referenceParam("subject", "23", "Patient"),
      "subject:Patient=23",
    ],
    [
      new FhirSearchBuilder().referenceParam(
        "subject",
        ["12", "23"],
        "Patient",
      ),
      "subject:Patient=12,23",
    ],
    [
      new FhirSearchBuilder().referenceParam(
        "subject",
        "123456",
        ":identifier",
      ),
      "subject:identifier=123456",
    ],
    [
      new FhirSearchBuilder().referenceParam(
        "subject",
        { system: "http://acme.org/fhir/identifier/mrn", value: "123456" },
        ":identifier",
      ),
      "subject:identifier=http%3A%2F%2Facme.org%2Ffhir%2Fidentifier%2Fmrn|123456",
    ],
    [
      new FhirSearchBuilder().referenceParam("subject", {
        type: "Patient",
        id: "23",
      }),
      "subject=Patient%2F23",
    ],
    [
      new FhirSearchBuilder().referenceParam("subject", {
        resourceType: "Patient",
        id: "23",
      }),
      "subject=Patient%2F23",
    ],
    [
      new FhirSearchBuilder().referenceParam("organization", organization),
      "organization=Organization%2F456",
    ],
    [new FhirSearchBuilder().referenceParam("subject", null), ""],
    [new FhirSearchBuilder().referenceParam("subject", undefined), ""],
    [new FhirSearchBuilder().referenceParam("subject", ""), ""],
    [
      new FhirSearchBuilder()
        .referenceParam("subject", "23", "Patient")
        .referenceParam("subject", "123456", "Patient", "replace"),
      "subject:Patient=123456",
    ],
  ])("reference/%s", (builder, expected) => {
    expect(builder.href).toBe(expected);
  });

  it.each(<Array<[FhirSearchBuilder, string]>>[
    [
      new FhirSearchBuilder().stringParam("name", "John Doe"),
      "name=John%20Doe",
    ],
    [
      new FhirSearchBuilder().stringParam("name", ["John Doe", "Jane Doe"]),
      "name=John%20Doe,Jane%20Doe",
    ],
    [
      new FhirSearchBuilder().stringParam(
        "given",
        "eve",
        StringModifier.Contains,
      ),
      "given:contains=eve",
    ],
    [
      new FhirSearchBuilder().stringParam(
        "given",
        ["eve", "adam"],
        StringModifier.Exact,
      ),
      "given:exact=eve,adam",
    ],
    [new FhirSearchBuilder().stringParam("name", null), ""],
    [new FhirSearchBuilder().stringParam("name", undefined), ""],
    [new FhirSearchBuilder().stringParam("name", ""), ""],
    [
      new FhirSearchBuilder()
        .stringParam("name", "John Doe")
        .stringParam("name", "eve", null, "replace"),
      "name=eve",
    ],
  ])("string/%s", (builder, expected) => {
    expect(builder.href).toBe(expected);
  });

  it.each(<Array<[FhirSearchBuilder, string]>>[
    [
      new FhirSearchBuilder().compositeParam(
        "component-code-value-quantity",
        "http://loinc.org|8480-6$lt60",
      ),
      "component-code-value-quantity=http://loinc.org|8480-6$lt60",
    ],
  ])("composite/%s", (builder, expected) => {
    expect(builder.href).toBe(expected);
  });

  it.each(<Array<[FhirSearchBuilder, string]>>[
    [
      new FhirSearchBuilder().specialParam("near", "11.45522|152.22460"),
      "near=11.45522|152.22460",
    ],
  ])("special/%s", (builder, expected) => {
    expect(builder.href).toBe(expected);
  });

  it.each(<Array<[FhirSearchBuilder, string]>>[
    [
      new FhirSearchBuilder().tokenParam("identifier", {
        system: "http://acme.org/patient",
        value: "2345",
      }),
      "identifier=http%3A%2F%2Facme.org%2Fpatient|2345",
    ],
    [
      new FhirSearchBuilder().tokenParam("identifier", [
        {
          system: "http://acme.org/patient",
          value: "2345",
        },
        { system: "http://acme.org/patient-mbi", value: "abcd" },
      ]),
      "identifier=http%3A%2F%2Facme.org%2Fpatient|2345,http%3A%2F%2Facme.org%2Fpatient-mbi|abcd",
    ],
    [new FhirSearchBuilder().tokenParam("gender", "male"), "gender=male"],
    [
      new FhirSearchBuilder().tokenParam("gender", ["male", "female"]),
      "gender=male,female",
    ],
    [
      new FhirSearchBuilder().tokenParam("gender", "male", TokenModifier.Not),
      "gender:not=male",
    ],
    [
      new FhirSearchBuilder().tokenParam(
        "code",
        "126851005",
        TokenModifier.Below,
      ),
      "code:below=126851005",
    ],
    [
      new FhirSearchBuilder().tokenParam("code", {
        system: "http://hl7.org/fhir/sid/icd-10",
      }),
      "code=http%3A%2F%2Fhl7.org%2Ffhir%2Fsid%2Ficd-10|",
    ],
    [
      new FhirSearchBuilder().tokenParam(
        "code",
        "http://acme.org/fhir/ValueSet/cardiac-conditions",
        ":in",
      ),
      "code:in=http%3A%2F%2Facme.org%2Ffhir%2FValueSet%2Fcardiac-conditions",
    ],
    [
      new FhirSearchBuilder().tokenParam(
        "identifier",
        {
          system: "http://terminology.hl7.org/CodeSystem/v2-0203",
          code: "MR",
          value: "446053",
        },
        TokenModifier.OfType,
      ),
      "identifier:of-type=http%3A%2F%2Fterminology.hl7.org%2FCodeSystem%2Fv2-0203|MR|446053",
    ],
    [new FhirSearchBuilder().tokenParam("identifier", null), ""],
    [new FhirSearchBuilder().tokenParam("identifier", undefined), ""],
    [new FhirSearchBuilder().tokenParam("identifier", ""), ""],
    [
      new FhirSearchBuilder().tokenParam("identifier", {
        code: null,
        system: null,
      }),
      "",
    ],
    [
      new FhirSearchBuilder().tokenParam("identifier", {
        code: undefined,
        system: undefined,
      }),
      "",
    ],
    [
      new FhirSearchBuilder().tokenParam("identifier", {
        code: "",
        system: "",
      }),
      "",
    ],
    [
      new FhirSearchBuilder()
        .tokenParam("gender", "male")
        .tokenParam("gender", "female", null, "replace"),
      "gender=female",
    ],
  ])("token/%s", (builder, expected) => {
    expect(builder.href).toBe(expected);
  });

  it.each(<Array<[FhirSearchBuilder, string]>>[
    [
      new FhirSearchBuilder().uriParam(
        "url",
        "http://acme.org/fhir/ValueSet/123",
      ),
      "url=http%3A%2F%2Facme.org%2Ffhir%2FValueSet%2F123",
    ],
    [
      new FhirSearchBuilder().uriParam("url", [
        "http://acme.org/fhir/ValueSet/123",
        "https://foo/bar",
      ]),
      "url=http%3A%2F%2Facme.org%2Ffhir%2FValueSet%2F123,https%3A%2F%2Ffoo%2Fbar",
    ],
    [
      new FhirSearchBuilder().uriParam(
        "url",
        new URL("http://acme.org/fhir/ValueSet/123"),
      ),
      "url=http%3A%2F%2Facme.org%2Ffhir%2FValueSet%2F123",
    ],
    [
      new FhirSearchBuilder().uriParam(
        "url",
        "http://acme.org/fhir/",
        UriModifier.Below,
      ),
      "url:below=http%3A%2F%2Facme.org%2Ffhir%2F",
    ],
    [
      new FhirSearchBuilder().uriParam("url", "urn:oid:1.2.3.4.5"),
      "url=urn%3Aoid%3A1.2.3.4.5",
    ],
    [new FhirSearchBuilder().uriParam("url", null), ""],
    [new FhirSearchBuilder().uriParam("url", undefined), ""],
    [new FhirSearchBuilder().uriParam("url", ""), ""],
    [
      new FhirSearchBuilder()
        .uriParam("url", "http://acme.org/fhir/ValueSet/123")
        .uriParam("url", "http://acme.org/fhir/", null, "replace"),
      "url=http%3A%2F%2Facme.org%2Ffhir%2F",
    ],
  ])("uri/%s", (builder, expected) => {
    expect(builder.href).toBe(expected);
  });
});
