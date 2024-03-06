import {
  INode,
  INodeProperties,
  IRequestOptionsSimplified,
  NodeApiError,
  RequestHelperFunctions,
  jsonParse,
  type ICredentialDataDecryptedObject,
  type IExecuteFunctions,
} from "n8n-workflow";
import type { OptionsWithUri } from "request-promise-native";

export const credentials = [
  {
    name: "httpBasicAuth",
    required: true,
    displayOptions: {
      show: {
        authentication: ["basicAuth"],
      },
    },
  },
  {
    name: "httpCustomAuth",
    required: true,
    displayOptions: {
      show: {
        authentication: ["customAuth"],
      },
    },
  },
  {
    name: "httpDigestAuth",
    required: true,
    displayOptions: {
      show: {
        authentication: ["digestAuth"],
      },
    },
  },
  {
    name: "httpHeaderAuth",
    required: true,
    displayOptions: {
      show: {
        authentication: ["headerAuth"],
      },
    },
  },
  {
    name: "httpQueryAuth",
    required: true,
    displayOptions: {
      show: {
        authentication: ["queryAuth"],
      },
    },
  },
  {
    name: "oAuth1Api",
    required: true,
    displayOptions: {
      show: {
        authentication: ["oAuth1"],
      },
    },
  },
  {
    name: "oAuth2Api",
    required: true,
    displayOptions: {
      show: {
        authentication: ["oAuth2"],
      },
    },
  },
];

export const authenticationField: INodeProperties = {
  displayName: "Authentication",
  name: "authentication",
  type: "options",
  options: [
    {
      name: "Basic Auth",
      value: "basicAuth",
    },
    {
      name: "Custom Auth",
      value: "customAuth",
    },
    {
      name: "Digest Auth",
      value: "digestAuth",
    },
    {
      name: "Header Auth",
      value: "headerAuth",
    },
    {
      name: "None",
      value: "none",
    },
    {
      name: "OAuth1",
      value: "oAuth1",
    },
    {
      name: "OAuth2",
      value: "oAuth2",
    },
    {
      name: "Query Auth",
      value: "queryAuth",
    },
  ],
  default: "none",
  description: "The way to authenticate",
};

export interface GenericAuthParameters {
  httpBasicAuth?: ICredentialDataDecryptedObject | undefined;
  httpDigestAuth?: ICredentialDataDecryptedObject | undefined;
  httpCustomAuth?: ICredentialDataDecryptedObject | undefined;
  httpHeaderAuth?: ICredentialDataDecryptedObject | undefined;
  httpQueryAuth?: ICredentialDataDecryptedObject | undefined;
  oAuth1Api?: ICredentialDataDecryptedObject | undefined;
  oAuth2Api?: ICredentialDataDecryptedObject | undefined;
}

export async function getAuthParameters(
  node: Pick<IExecuteFunctions, "getCredentials">,
): Promise<GenericAuthParameters> {
  const result: GenericAuthParameters = {};

  try {
    result.httpBasicAuth = await node.getCredentials("httpBasicAuth");
  } catch {
    // Do nothing
  }
  try {
    result.httpCustomAuth = await node.getCredentials("httpCustomAuth");
  } catch {
    // Do nothing
  }
  try {
    result.httpDigestAuth = await node.getCredentials("httpDigestAuth");
  } catch {
    // Do nothing
  }
  try {
    result.httpHeaderAuth = await node.getCredentials("httpHeaderAuth");
  } catch {
    // Do nothing
  }
  try {
    result.httpQueryAuth = await node.getCredentials("httpQueryAuth");
  } catch {
    // Do nothing
  }
  try {
    result.oAuth1Api = await node.getCredentials("oAuth1Api");
  } catch {
    // Do nothing
  }
  try {
    result.oAuth2Api = await node.getCredentials("oAuth2Api");
  } catch {
    // Do nothing
  }

  return result;
}

export async function requestWithAuth(
  node: { helpers: RequestHelperFunctions; getNode(): INode },
  requestOptions: OptionsWithUri,
  authParameters: GenericAuthParameters,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): Promise<any> {
  if (authParameters.httpBasicAuth !== undefined) {
    requestOptions.auth = {
      user: authParameters.httpBasicAuth.user as string,
      pass: authParameters.httpBasicAuth.password as string,
    };
  }
  if (authParameters.httpHeaderAuth !== undefined) {
    requestOptions.headers = {
      ...requestOptions.headers,
      [authParameters.httpHeaderAuth.name as string]:
        authParameters.httpHeaderAuth.value,
    };
  }
  if (authParameters.httpQueryAuth !== undefined) {
    if (!requestOptions.qs) {
      requestOptions.qs = {};
    }
    requestOptions.qs[authParameters.httpQueryAuth.name as string] =
      authParameters.httpQueryAuth.value;
  }
  if (authParameters.httpDigestAuth !== undefined) {
    requestOptions.auth = {
      user: authParameters.httpDigestAuth.user as string,
      pass: authParameters.httpDigestAuth.password as string,
      sendImmediately: false,
    };
  }
  if (authParameters.httpCustomAuth !== undefined) {
    const customAuth = jsonParse<IRequestOptionsSimplified>(
      (authParameters.httpCustomAuth.json as string) || "{}",
      { errorMessage: "Invalid Custom Auth JSON" },
    );
    if (customAuth.headers) {
      requestOptions.headers = {
        ...requestOptions.headers,
        ...customAuth.headers,
      };
    }
    if (customAuth.body) {
      requestOptions.body = {
        ...requestOptions.body,
        ...customAuth.body,
      };
    }
    if (customAuth.qs) {
      requestOptions.qs = { ...requestOptions.qs, ...customAuth.qs };
    }
  }

  let response;

  if (authParameters.oAuth1Api) {
    response = await node.helpers.requestOAuth1.call(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      node as any,
      "oAuth1Api",
      requestOptions,
    );
  } else if (authParameters.oAuth2Api) {
    response = await node.helpers.requestOAuth2.call(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      node as any,
      "oAuth2Api",
      requestOptions,
      {
        tokenType: "Bearer",
      },
    );
  } else {
    response = await node.helpers.request(requestOptions);
  }

  if (!response) {
    throw new NodeApiError(node.getNode(), {
      message:
        "No response returned - It might indicate an authentication issue",
    });
  }

  if (response.resourceType === "OperationOutcome") {
    console.error(response);
    throw new NodeApiError(node.getNode(), response, {
      message: response.issue
        ?.map(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (issue: any) =>
            `${issue.severity}: [${issue.code}] ${issue.diagnostics}`,
        )
        .join(", "),
    });
  }
  return response;
}
