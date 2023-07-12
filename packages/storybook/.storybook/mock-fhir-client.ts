import {
  FhirClient,
  bundleNavigator,
  normalizeSearchParameters,
} from "@bonfhir/core/r5";

export const mockClient = {
  fetch: true,
  search(type: any, parameters: any) {
    if (type === "Organization") {
      let sort: any;
      let order = "asc";
      if (parameters) {
        const renderedParameters = new URLSearchParams(
          normalizeSearchParameters("Organization", parameters),
        );
        if (renderedParameters.has("_sort")) {
          sort = renderedParameters.get("_sort");
          if (sort?.startsWith("-")) {
            sort = sort.substring(1);
            order = "desc";
          }
        }
      }

      const entry = [
        {
          fullUrl:
            "http://localhost:8103/fhir/R4/Organization/b503ddcc-00ee-4911-a259-bcedd90231c5",
          resource: {
            resourceType: "Organization",
            name: "AlleyCorpNord",
            text: {
              status: "generated",
              div: '<div xmlns="http://www.w3.org/1999/xhtml"><ul><li><span>Name: </span>AlleyCorpNord</li></ul></div>',
            },
            id: "b503ddcc-00ee-4911-a259-bcedd90231c5",
            meta: {
              versionId: "9bf2ae56-a7a0-4aff-8b21-5599ef811ca7",
              lastUpdated: "2023-06-16T19:40:21.643Z",
            },
          },
        },
        {
          fullUrl:
            "http://localhost:8103/fhir/R4/Organization/391d4f5b-87f5-4c1f-98dd-4f6afcd3274d",
          resource: {
            resourceType: "Organization",
            name: "CMS.gov",
            text: {
              status: "generated",
              div: '<div xmlns="http://www.w3.org/1999/xhtml"><ul><li><span>Name: </span>CMS.gov</li></ul></div>',
            },
            id: "391d4f5b-87f5-4c1f-98dd-4f6afcd3274d",
            meta: {
              versionId: "6ab5c799-9a2a-4db3-9481-d57434691754",
              lastUpdated: "2023-06-16T19:42:57.847Z",
            },
          },
        },
      ];

      if (sort) {
        entry.sort((a: any, b: any) => {
          let baseA = a.resource;
          let baseB = b.resource;
          if (sort === "_lastUpdated") {
            baseA = baseA.meta;
            baseB = baseB.meta;
          }
          if (baseA[sort] < baseB[sort]) {
            return order === "asc" ? -1 : 1;
          }
          if (baseA[sort] > baseB[sort]) {
            return order === "asc" ? 1 : -1;
          }
          return 0;
        });
      }

      return bundleNavigator({
        resourceType: "Bundle",
        type: "searchset",
        entry,
        link: [
          {
            relation: "self",
            url: "http://localhost:8103/fhir/R4/Organization?_count=20",
          },
          {
            relation: "first",
            url: "http://localhost:8103/fhir/R4/Organization?_count=20&_offset=0",
          },
        ],
        total: 2,
      });
    }

    return undefined;
  },
  execute(operation: any) {
    if (operation.operation === "$expand") {
      if (
        operation.parameters?.url ===
        "http://hl7.org/fhir/ValueSet/contact-point-system"
      ) {
        return {
          resourceType: "ValueSet",
          url: "http://hl7.org/fhir/ValueSet/contact-point-system",
          expansion: {
            offset: 0,
            contains: [
              {
                system: "http://hl7.org/fhir/contact-point-system",
                code: "email",
                display: "Email",
              },
              {
                system: "http://hl7.org/fhir/contact-point-system",
                code: "fax",
                display: "Fax",
              },
              {
                system: "http://hl7.org/fhir/contact-point-system",
                code: "other",
                display: "Other",
              },
              {
                system: "http://hl7.org/fhir/contact-point-system",
                code: "pager",
                display: "Pager",
              },
              {
                system: "http://hl7.org/fhir/contact-point-system",
                code: "phone",
                display: "Phone",
              },
              {
                system: "http://hl7.org/fhir/contact-point-system",
                code: "sms",
                display: "SMS",
              },
              {
                system: "http://hl7.org/fhir/contact-point-system",
                code: "url",
                display: "URL",
              },
            ],
          },
        };
      }

      if (
        operation.parameters?.url ===
        "http://hl7.org/fhir/ValueSet/contact-point-use"
      ) {
        return {
          resourceType: "ValueSet",
          url: "http://hl7.org/fhir/ValueSet/contact-point-use",
          expansion: {
            offset: 0,
            contains: [
              {
                system: "http://hl7.org/fhir/contact-point-use",
                code: "home",
                display: "Home",
              },
              {
                system: "http://hl7.org/fhir/contact-point-use",
                code: "mobile",
                display: "Mobile",
              },
              {
                system: "http://hl7.org/fhir/contact-point-use",
                code: "old",
                display: "Old",
              },
              {
                system: "http://hl7.org/fhir/contact-point-use",
                code: "temp",
                display: "Temp",
              },
              {
                system: "http://hl7.org/fhir/contact-point-use",
                code: "work",
                display: "Work",
              },
            ],
          },
        };
      }

      if (
        operation.parameters?.url === "http://hl7.org/fhir/ValueSet/name-use"
      ) {
        return {
          resourceType: "ValueSet",
          url: "http://hl7.org/fhir/ValueSet/name-use",
          expansion: {
            offset: 0,
            contains: [
              {
                system: "http://hl7.org/fhir/name-use",
                code: "anonymous",
                display: "Anonymous",
              },
              {
                system: "http://hl7.org/fhir/name-use",
                code: "maiden",
                display: "Name changed for Marriage",
              },
              {
                system: "http://hl7.org/fhir/name-use",
                code: "nickname",
                display: "Nickname",
              },
              {
                system: "http://hl7.org/fhir/name-use",
                code: "official",
                display: "Official",
              },
              {
                system: "http://hl7.org/fhir/name-use",
                code: "old",
                display: "Old",
              },
              {
                system: "http://hl7.org/fhir/name-use",
                code: "temp",
                display: "Temp",
              },
              {
                system: "http://hl7.org/fhir/name-use",
                code: "usual",
                display: "Usual",
              },
            ],
          },
        };
      }

      if (
        operation.parameters?.url ===
        "http://hl7.org/fhir/ValueSet/identifier-use"
      ) {
        return {
          resourceType: "ValueSet",
          url: "http://hl7.org/fhir/ValueSet/identifier-use",
          expansion: {
            offset: 0,
            contains: [
              {
                system: "http://hl7.org/fhir/identifier-use",
                code: "official",
                display: "Official",
              },
              {
                system: "http://hl7.org/fhir/identifier-use",
                code: "old",
                display: "Old",
              },
              {
                system: "http://hl7.org/fhir/identifier-use",
                code: "secondary",
                display: "Secondary",
              },
              {
                system: "http://hl7.org/fhir/identifier-use",
                code: "temp",
                display: "Temp",
              },
              {
                system: "http://hl7.org/fhir/identifier-use",
                code: "usual",
                display: "Usual",
              },
            ],
          },
        };
      }
    }
  },
} as unknown as FhirClient;
