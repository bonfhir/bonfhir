import { build } from "./builders.js";
import { merge } from "./merge.js";

describe("merge", () => {
  it("copy if current is falsy", () => {
    const incoming = build("Patient", {
      name: [{ family: "Smith" }],
    });

    const [merged, changed] = merge({ current: undefined, incoming });
    expect(merged).toEqual(incoming);
    expect(merged).not.toBe(incoming);
    expect(changed).toBeTruthy();
  });

  it("copy if incoming is falsy", () => {
    const current = build("Patient", {
      name: [{ family: "Smith" }],
    });

    const [merged, changed] = merge({ current, incoming: undefined });
    expect(merged).toEqual(current);
    expect(merged).not.toBe(current);
    expect(changed).toBeFalsy();
  });

  it("merge 1", () => {
    const current = build("Organization", {
      name: "Acme",
    });

    const incoming = build("Organization", {
      name: "Initrode",
    });

    const [merged, changed] = merge({ current, incoming });
    expect(changed).toBeTruthy();
    expect(merged).toMatchInlineSnapshot(`
      {
        "name": "Initrode",
        "resourceType": "Organization",
        "text": {
          "div": "<div xmlns="http://www.w3.org/1999/xhtml"><ul><li><span>Name: </span>Initrode</li></ul></div>",
          "status": "generated",
        },
      }
    `);
  });

  it("merge 2", () => {
    const current = build("Patient", {
      birthDate: "2000-01-01",
    });

    const incoming = build("Patient", {
      gender: "female",
    });

    const [merged, changed] = merge({ current, incoming });
    expect(changed).toBeTruthy();
    expect(merged).toMatchInlineSnapshot(`
      {
        "birthDate": "2000-01-01",
        "gender": "female",
        "resourceType": "Patient",
        "text": {
          "div": "<div xmlns="http://www.w3.org/1999/xhtml"><ul><li><span>Gender: </span>female</li></ul></div>",
          "status": "generated",
        },
      }
    `);
  });

  it("merge 3", () => {
    const current = build("Patient", {
      birthDate: "2000-01-01",
      name: [{ given: ["John"], family: "Smith" }],
    });

    const incoming = build("Patient", {
      gender: "female",
      name: [{ given: ["John"], family: "Doe" }],
    });

    const [merged, changed] = merge({ current, incoming });
    expect(changed).toBeTruthy();
    expect(merged).toMatchInlineSnapshot(`
      {
        "birthDate": "2000-01-01",
        "gender": "female",
        "name": [
          {
            "family": "Smith",
            "given": [
              "John",
            ],
          },
          {
            "family": "Doe",
            "given": [
              "John",
            ],
          },
        ],
        "resourceType": "Patient",
        "text": {
          "div": "<div xmlns="http://www.w3.org/1999/xhtml"><ul><li><span>Gender: </span>female</li><li><span>Name: </span><ul><li>John Doe</li></ul></li></ul></div>",
          "status": "generated",
        },
      }
    `);
  });

  it("merge 4", () => {
    const current = build("Practitioner", {
      qualification: [
        {
          id: "integration-retrieved",
          code: {
            text: "Certified Nurse Midwife",
          },
        },
        {
          code: {
            text: "Certified Tumor Registrar",
          },
        },
      ],
    });

    const incoming = build("Practitioner", {
      qualification: [
        {
          id: "integration-retrieved",
          code: {
            text: "Doctor of Medicine",
          },
        },
        {
          code: {
            text: "Master of Arts",
          },
        },
      ],
    });

    const [merged, changed] = merge({ current, incoming });
    expect(changed).toBeTruthy();
    expect(merged).toMatchInlineSnapshot(`
      {
        "qualification": [
          {
            "code": {
              "text": "Doctor of Medicine",
            },
            "id": "integration-retrieved",
          },
          {
            "code": {
              "text": "Certified Tumor Registrar",
            },
          },
          {
            "code": {
              "text": "Master of Arts",
            },
          },
        ],
        "resourceType": "Practitioner",
        "text": {
          "div": "<div xmlns="http://www.w3.org/1999/xhtml"><ul></ul></div>",
          "status": "generated",
        },
      }
    `);
  });
});
