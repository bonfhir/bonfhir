/* eslint-disable unicorn/no-null */
import { cloneResource, extendResource, extension, tag } from "./extensions";
import { Formatter } from "./formatters";

describe("extensions", () => {
  const CustomPatient = extendResource("Patient", {
    computedName(): string {
      return (
        Formatter.default.format("HumanName", this.name, { max: 1 }) +
        Formatter.default.format("date", this.birthDate, {
          decorator: " born {}",
        })
      );
    },

    birthSex: extension({
      url: "http://hl7.org/fhir/us/core/StructureDefinition/us-core-birthsex",
      kind: "valueCode",
    }),
  });

  const CustomDiagnosticReport = extendResource(
    "DiagnosticReport",
    {
      cptCodes: extension({
        url: "http://custom/cpt-codes",
        kind: "valueCode",
        allowMultiple: true,
      }),

      visibility: tag({ system: "http://custom/visibility" }),

      isPubliclyVisible(): boolean {
        return this.visibility?.code === "public";
      },
    },
    {
      profile: "http://custom/diagnostic-report",
    },
  );

  it("manage computed properties", () => {
    const patient = new CustomPatient({
      name: [{ given: ["John"], family: "Doe" }],
      birthDate: "1970-01-01",
    });

    expect(patient.resourceType).toBe("Patient");
    expect(patient.computedName()).toBeTruthy();
    expect(JSON.stringify(patient, undefined, 2)).toMatchInlineSnapshot(`
      "{
        "resourceType": "Patient",
        "name": [
          {
            "given": [
              "John"
            ],
            "family": "Doe"
          }
        ],
        "birthDate": "1970-01-01",
        "text": {
          "status": "generated",
          "div": "<div xmlns=\\"http://www.w3.org/1999/xhtml\\"><ul><li><span>Birth Date: </span>1/1/1970</li><li><span>Name: </span><ul><li>John Doe</li></ul></li></ul></div>"
        }
      }"
    `);
  });

  it("manage simple extensions", () => {
    const patient = new CustomPatient();
    expect(patient.birthSex).toBeUndefined();
    patient.birthSex = "OTH";
    expect(patient.birthSex).toEqual("OTH");
    expect(JSON.stringify(patient, undefined, 2)).toMatchInlineSnapshot(`
      "{
        "resourceType": "Patient",
        "extension": [
          {
            "url": "http://hl7.org/fhir/us/core/StructureDefinition/us-core-birthsex",
            "valueCode": "OTH"
          }
        ],
        "text": {
          "status": "generated",
          "div": "<div xmlns=\\"http://www.w3.org/1999/xhtml\\"><ul></ul></div>"
        }
      }"
    `);
    patient.birthSex = undefined;
    expect(patient.birthSex).toBeUndefined();
    expect(JSON.stringify(patient, undefined, 2)).toMatchInlineSnapshot(`
      "{
        "resourceType": "Patient",
        "text": {
          "status": "generated",
          "div": "<div xmlns=\\"http://www.w3.org/1999/xhtml\\"><ul></ul></div>"
        }
      }"
    `);
  });

  it("manage array extensions", () => {
    const diagnosticReport = new CustomDiagnosticReport({
      status: "preliminary",
      code: { text: "Diag" },
    });
    expect(diagnosticReport.cptCodes).toHaveLength(0);
    diagnosticReport.cptCodes = ["123"];
    expect(diagnosticReport.cptCodes).toHaveLength(1);
    expect(JSON.stringify(diagnosticReport, undefined, 2))
      .toMatchInlineSnapshot(`
        "{
          "resourceType": "DiagnosticReport",
          "status": "preliminary",
          "code": {
            "text": "Diag"
          },
          "extension": [
            {
              "url": "http://custom/cpt-codes",
              "valueCode": "123"
            }
          ],
          "text": {
            "status": "generated",
            "div": "<div xmlns=\\"http://www.w3.org/1999/xhtml\\"><ul><li><span>Code: </span>Diag</li><li><span>Status: </span>preliminary</li></ul></div>"
          },
          "meta": {
            "profile": [
              "http://custom/diagnostic-report"
            ]
          }
        }"
      `);
    diagnosticReport.cptCodes = [...diagnosticReport.cptCodes, "456"];
    expect(diagnosticReport.cptCodes).toHaveLength(2);
    expect(JSON.stringify(diagnosticReport, undefined, 2))
      .toMatchInlineSnapshot(`
        "{
          "resourceType": "DiagnosticReport",
          "status": "preliminary",
          "code": {
            "text": "Diag"
          },
          "extension": [
            {
              "url": "http://custom/cpt-codes",
              "valueCode": "123"
            },
            {
              "url": "http://custom/cpt-codes",
              "valueCode": "456"
            }
          ],
          "text": {
            "status": "generated",
            "div": "<div xmlns=\\"http://www.w3.org/1999/xhtml\\"><ul><li><span>Code: </span>Diag</li><li><span>Status: </span>preliminary</li></ul></div>"
          },
          "meta": {
            "profile": [
              "http://custom/diagnostic-report"
            ]
          }
        }"
      `);
    expect(diagnosticReport.cptCodes).toHaveLength(2);
    diagnosticReport.cptCodes = [];
    expect(diagnosticReport.cptCodes).toHaveLength(0);
    expect(JSON.stringify(diagnosticReport, undefined, 2))
      .toMatchInlineSnapshot(`
        "{
          "resourceType": "DiagnosticReport",
          "status": "preliminary",
          "code": {
            "text": "Diag"
          },
          "text": {
            "status": "generated",
            "div": "<div xmlns=\\"http://www.w3.org/1999/xhtml\\"><ul><li><span>Code: </span>Diag</li><li><span>Status: </span>preliminary</li></ul></div>"
          },
          "meta": {
            "profile": [
              "http://custom/diagnostic-report"
            ]
          }
        }"
      `);
  });

  it("handle tags", () => {
    const diagnosticReport = new CustomDiagnosticReport({
      status: "preliminary",
      code: { text: "Diag" },
    });
    expect(diagnosticReport.visibility).toBeUndefined();
    diagnosticReport.visibility = { code: "public" };
    expect(diagnosticReport.visibility?.code).toEqual("public");
    expect(diagnosticReport.isPubliclyVisible()).toBeTruthy();
    expect(JSON.stringify(diagnosticReport, undefined, 2))
      .toMatchInlineSnapshot(`
        "{
          "resourceType": "DiagnosticReport",
          "status": "preliminary",
          "code": {
            "text": "Diag"
          },
          "meta": {
            "tag": [
              {
                "code": "public",
                "system": "http://custom/visibility"
              }
            ],
            "profile": [
              "http://custom/diagnostic-report"
            ]
          },
          "text": {
            "status": "generated",
            "div": "<div xmlns=\\"http://www.w3.org/1999/xhtml\\"><ul><li><span>Code: </span>Diag</li><li><span>Status: </span>preliminary</li></ul></div>"
          }
        }"
      `);
    diagnosticReport.visibility = { code: "internal" };
    expect(diagnosticReport.visibility?.code).toEqual("internal");
    expect(diagnosticReport.isPubliclyVisible()).toBeFalsy();
    expect(JSON.stringify(diagnosticReport, undefined, 2))
      .toMatchInlineSnapshot(`
        "{
          "resourceType": "DiagnosticReport",
          "status": "preliminary",
          "code": {
            "text": "Diag"
          },
          "meta": {
            "tag": [
              {
                "code": "internal",
                "system": "http://custom/visibility"
              }
            ],
            "profile": [
              "http://custom/diagnostic-report"
            ]
          },
          "text": {
            "status": "generated",
            "div": "<div xmlns=\\"http://www.w3.org/1999/xhtml\\"><ul><li><span>Code: </span>Diag</li><li><span>Status: </span>preliminary</li></ul></div>"
          }
        }"
      `);
    diagnosticReport.visibility = undefined;
    expect(diagnosticReport.visibility).toBeUndefined();
    expect(JSON.stringify(diagnosticReport, undefined, 2))
      .toMatchInlineSnapshot(`
        "{
          "resourceType": "DiagnosticReport",
          "status": "preliminary",
          "code": {
            "text": "Diag"
          },
          "meta": {
            "profile": [
              "http://custom/diagnostic-report"
            ]
          },
          "text": {
            "status": "generated",
            "div": "<div xmlns=\\"http://www.w3.org/1999/xhtml\\"><ul><li><span>Code: </span>Diag</li><li><span>Status: </span>preliminary</li></ul></div>"
          }
        }"
      `);
  });

  it("clone", () => {
    const patient = new CustomPatient({});
    patient.birthSex = "OTH";
    const anotherPatient = cloneResource(patient);
    expect(anotherPatient).not.toBe(patient);
    expect(anotherPatient.birthSex).toEqual("OTH");
    expect(anotherPatient).toBeInstanceOf(CustomPatient);
  });

  it("initialize with special extensions", () => {
    const patient = new CustomPatient({
      birthSex: "OTH",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any);
    expect(patient.birthSex).toEqual("OTH");
    expect(JSON.stringify(patient, undefined, 2)).toMatchInlineSnapshot(`
      "{
        "resourceType": "Patient",
        "extension": [
          {
            "url": "http://hl7.org/fhir/us/core/StructureDefinition/us-core-birthsex",
            "valueCode": "OTH"
          }
        ],
        "text": {
          "status": "generated",
          "div": "<div xmlns=\\"http://www.w3.org/1999/xhtml\\"><ul></ul></div>"
        }
      }"
    `);
  });

  it("list all keys", () => {
    const patient = new CustomPatient({
      birthSex: "OTH",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any);
    expect(Object.keys(patient)).toMatchInlineSnapshot(`
      [
        "resourceType",
        "computedName",
        "extension",
        "birthSex",
      ]
    `);
  });

  it("merge meta", () => {
    const diagnosticReport = new CustomDiagnosticReport({
      status: "preliminary",
      code: { text: "Diag" },
      meta: {
        source: "http://example.com",
      },
    });
    expect(JSON.stringify(diagnosticReport, undefined, 2))
      .toMatchInlineSnapshot(`
        "{
          "resourceType": "DiagnosticReport",
          "status": "preliminary",
          "code": {
            "text": "Diag"
          },
          "meta": {
            "source": "http://example.com",
            "profile": [
              "http://custom/diagnostic-report"
            ]
          },
          "text": {
            "status": "generated",
            "div": "<div xmlns=\\"http://www.w3.org/1999/xhtml\\"><ul><li><span>Code: </span>Diag</li><li><span>Status: </span>preliminary</li></ul></div>"
          }
        }"
      `);
  });
});
