import { INodePropertyOptions } from "n8n-workflow";

export const deleteOperation: INodePropertyOptions = {
  name: "Delete",
  value: "delete",
  description: "Delete by ID",
  action: "Delete",
  routing: {
    request: {
      method: "DELETE",
      url: `=/{{$parameter.resource}}/{{$parameter.id}}`,
    },
  },
};
