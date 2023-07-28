import * as Types from "../../graphql-types.js";

import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";
export type ListOrganizationsQueryVariables = Types.Exact<{
  name?: Types.InputMaybe<Types.Scalars["String"]["input"]>;
}>;

export type ListOrganizationsQuery = {
  __typename?: "QueryType";
  OrganizationList?:
    | Array<
        | {
            __typename?: "Organization";
            resourceType: string;
            id?: string | undefined;
            name?: string | undefined;
            address?:
              | Array<{
                  __typename?: "Address";
                  use?: string | undefined;
                  type?: string | undefined;
                  text?: string | undefined;
                  line?: Array<string> | undefined;
                  city?: string | undefined;
                  state?: string | undefined;
                  postalCode?: string | undefined;
                  country?: string | undefined;
                }>
              | undefined;
            identifier?:
              | Array<{
                  __typename?: "Identifier";
                  use?: string | undefined;
                  system?: string | undefined;
                  value?: string | undefined;
                }>
              | undefined;
          }
        | undefined
      >
    | undefined;
};

export const ListOrganizationsDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "ListOrganizations" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "name" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "OrganizationList" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "name" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "name" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "resourceType" },
                },
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "name" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "address" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "use" } },
                      { kind: "Field", name: { kind: "Name", value: "type" } },
                      { kind: "Field", name: { kind: "Name", value: "text" } },
                      { kind: "Field", name: { kind: "Name", value: "line" } },
                      { kind: "Field", name: { kind: "Name", value: "city" } },
                      { kind: "Field", name: { kind: "Name", value: "state" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "postalCode" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "country" },
                      },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "identifier" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "use" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "system" },
                      },
                      { kind: "Field", name: { kind: "Name", value: "value" } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  ListOrganizationsQuery,
  ListOrganizationsQueryVariables
>;
