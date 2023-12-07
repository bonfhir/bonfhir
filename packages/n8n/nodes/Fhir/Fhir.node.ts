import { IExecuteFunctions } from "n8n-core";

import {
  // IDataObject,
  INodeExecutionData,
  INodeType,
  INodeTypeDescription,
} from "n8n-workflow";
import { OptionsWithUri } from "request-promise-native";

export class Fhir implements INodeType {
  description: INodeTypeDescription = {
    displayName: "Fhir",
    name: "fhir",
    icon: "file:Fhir.svg",
    group: ["transform"],
    version: 1,
    description: "Consume your FHIR API",
    defaults: {
      name: "Fhir",
    },
    inputs: ["main"],
    outputs: ["main"],
    credentials: [
      {
        name: "FhirOAuth2Api",
        required: true,
      },
    ],
    // Basic node details will go here
    properties: [
      // Resources and operations will go here
      {
        displayName: "Resource",
        name: "resource",
        type: "options",
        options: [
          {
            name: "Patient",
            value: "patient",
          },
        ],
        default: "patient",
        noDataExpression: true,
        required: true,
        description: "Get a patient",
      },
      {
        displayName: "Operation",
        name: "operation",
        type: "options",
        displayOptions: {
          show: {
            resource: ["patient"],
          },
        },
        options: [
          {
            name: "Get",
            value: "get",
            description: "Get a patient",
            action: "Get a patient",
          },
        ],
        default: "get",
        noDataExpression: true,
      },
      {
        displayName: "Patient ID",
        name: "id",
        type: "string",
        required: true,
        displayOptions: {
          show: {
            operation: ["get"],
            resource: ["patient"],
          },
        },
        default: "",
        placeholder: "Insert ID here",
        description: "FHIR ID for the patient",
      },
    ],
  };
  // The execute method will go here
  async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
    // Handle data coming from previous nodes
    const items = this.getInputData();
    let responseData;
    const returnData = [];
    const resource = this.getNodeParameter("resource", 0) as string;
    const operation = this.getNodeParameter("operation", 0) as string;

    // For each item, make an API call to create a contact
    for (let i = 0; i < items.length; i++) {
      if (resource === "patient" && operation === "get") {
        // Get email input
        const patient_id = this.getNodeParameter("id", i) as string;
        const options: OptionsWithUri = {
          headers: {
            Accept: "application/json",
          },
          method: "GET",
          uri: `http://localhost:8103/fhir/R4/Patient/${patient_id}`,
          json: true,
        };
        responseData = await this.helpers.requestWithAuthentication.call(
          this,
          "FhirOAuth2Api",
          options,
        );
        returnData.push(responseData);
      }
    }
    // Map data to n8n data structure
    return [this.helpers.returnJsonArray(returnData)];
  }
}
