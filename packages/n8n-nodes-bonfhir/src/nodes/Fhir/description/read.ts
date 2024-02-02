import { INodePropertyOptions } from "n8n-workflow";

export const readOperation: INodePropertyOptions = {
  name: "Read",
  value: "read",
  description: "Read by ID",
  action: "Read",
  routing: {
    request: {
      method: "GET",
      url: `=/{{$parameter.resource}}/{{$parameter.id}}`,
    },
  },
};
