import {
  FhirClient,
  ParametersParameter,
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
  searchOne(type: any) {
    if (type === "Questionnaire") {
      return bundleNavigator({
        resourceType: "Bundle",
        type: "searchset",
        entry: [
          {
            resource: {
              resourceType: "Questionnaire",
              status: "active",
              id: "b95e560e-04b2-47e0-b63e-fad36e873376",
              meta: {
                versionId: "b3500c2a-72b5-41f5-b34e-21baa99b94a5",
                lastUpdated: "2023-06-29T15:03:59.732Z",
              },
              item: [
                {
                  id: "id-1",
                  linkId: "generalInformation",
                  type: "group",
                  text: "General information",
                  item: [
                    {
                      id: "id-2",
                      linkId: "firstName",
                      type: "string",
                      text: "First Name",
                    },
                    {
                      id: "id-3",
                      linkId: "lastName",
                      type: "string",
                      text: "Last Name",
                      required: true,
                    },
                    {
                      id: "id-5",
                      linkId: "deceased",
                      type: "boolean",
                      text: "Deceased?",
                      extension: [
                        {
                          url: "http://bonfhir.dev/StructureDefinition/fhir-questionnaire-props",
                          valueString: '{ "mode": "switch" }',
                        },
                      ],
                    },
                    {
                      id: "id-6",
                      linkId: "gender",
                      type: "choice",
                      text: "Gender",
                      answerValueSet:
                        "http://hl7.org/fhir/ValueSet/administrative-gender",
                    },
                    {
                      id: "id-7",
                      linkId: "morning-eating-habit",
                      type: "choice",
                      text: "How often do you eat in the morning?",
                      answerOption: [
                        {
                          valueCoding: {
                            code: "every-day",
                            display: "Every day",
                          },
                          initialSelected: true,
                        },
                        {
                          valueCoding: {
                            code: "once-a-week",
                            display: "Once a week",
                          },
                        },
                        {
                          valueCoding: {
                            code: "never",
                            display: "Never",
                          },
                          valueString: "Never",
                        },
                      ],
                    },
                  ],
                },
              ],
              url: "http://acme.org/sample-questionnaire",
              title: "Patient Information",
            },
          },
        ],
        link: [
          {
            relation: "self",
            url: "http://localhost:8103/fhir/R4/Questionnaire?_count=20&status=active&url=http%3A%2F%2Facme.org%2Fsample-questionnaire",
          },
          {
            relation: "first",
            url: "http://localhost:8103/fhir/R4/Questionnaire?_count=20&_offset=0&status=active&url=http%3A%2F%2Facme.org%2Fsample-questionnaire",
          },
        ],
      }).searchMatchOne();
    }
  },
  execute(operation: any) {
    if (operation.operation === "$expand") {
      const url = operation.parameters?.find(
        (p: ParametersParameter) => p.name === "url",
      ).valueUri;
      if (url === "http://hl7.org/fhir/ValueSet/contact-point-system") {
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

      if (url === "http://hl7.org/fhir/ValueSet/contact-point-use") {
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

      if (url === "http://hl7.org/fhir/ValueSet/name-use") {
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

      if (url === "http://hl7.org/fhir/ValueSet/identifier-use") {
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

      if (url === "http://hl7.org/fhir/ValueSet/administrative-gender") {
        return {
          resourceType: "ValueSet",
          url: "http://hl7.org/fhir/ValueSet/administrative-gender",
          expansion: {
            offset: 0,
            contains: [
              {
                system: "http://hl7.org/fhir/administrative-gender",
                code: "female",
                display: "Female",
              },
              {
                system: "http://hl7.org/fhir/administrative-gender",
                code: "male",
                display: "Male",
              },
              {
                system: "http://hl7.org/fhir/administrative-gender",
                code: "other",
                display: "Other",
              },
              {
                system: "http://hl7.org/fhir/administrative-gender",
                code: "unknown",
                display: "Unknown",
              },
            ],
          },
        };
      }
    }
  },
} as unknown as FhirClient;
