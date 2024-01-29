import { DomainResourceTypes } from "@bonfhir/core/r4b";
import { INodeProperties, INodePropertyOptions } from "n8n-workflow";

export const createProperties: INodeProperties[][] = DomainResourceTypes.map(
  (type) => [
    {
      displayName: `New ${type} Data`,
      name: "data",
      type: "json",
      default: "",
      required: true,
      displayOptions: {
        show: {
          operation: ["create"],
          resource: [type.toLowerCase()],
        },
      },
      placeholder: `${type} Data`,
      routing: {
        request: {
          url: `=/${type}`,
        },
      },
    },
  ],
);

export const createOperation: INodePropertyOptions = {
  name: "Create",
  value: "create",
  routing: {
    request: {
      method: "POST",
      body: {
        resourceType: "{{$parameter.resourceType}}",
        // spread the data object
      },
    },
  },
};
