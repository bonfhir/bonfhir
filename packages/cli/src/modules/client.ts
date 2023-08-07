import {
  FetchFhirClient as FetchFhirClientR4b,
  FhirClient as FhirClientR4b,
} from "@bonfhir/core/r4b";
import { FetchFhirClient as FetchFhirClientR5 } from "@bonfhir/core/r5";
import { ListrTask } from "listr2";
import { CommandBuilder } from "yargs";
import {
  FhirVersionCommandBuilder,
  FhirVersionCommandOptions,
} from "./fhir-version";

export interface ClientCommandOptions extends FhirVersionCommandOptions {
  baseUrl: string;
  authHeader?: string;
  authTokenUrl?: string;
  authClientId?: string;
  authClientSecret?: string;
  skipConnectivityTest?: boolean;
}

export const ClientCommandBuilder: CommandBuilder<
  unknown,
  ClientCommandOptions
> = {
  ...FhirVersionCommandBuilder,
  "base-url": {
    type: "string",
    demandOption: true,
    describe: "The base URL of the FHIR server to use",
  },
  "auth-header": {
    type: "string",
    describe: "The value to use as an Authorization header",
  },
  "auth-token-url": {
    type: "string",
    describe: "The URL to use to obtain an OAuth2 token (client credential)",
  },
  "auth-client-id": {
    type: "string",
    describe:
      "The client ID to use to obtain an OAuth2 token (client credential)",
  },
  "auth-client-secret": {
    type: "string",
    describe:
      "The client secret to use to obtain an OAuth2 token (client credential)",
  },
  "skip-connectivity-test": {
    type: "boolean",
    default: false,
    describe: "Skip the server connectivity test prior to running the command",
  },
};

export interface ClientCommandContext {
  options: ClientCommandOptions;
  client: FhirClientR4b;
}

export function ClientConnectTask<
  TContext extends ClientCommandContext,
>(): ListrTask<TContext> {
  return {
    title: "Connecting to FHIR server",
    task: async (context) => {
      context.client = buildClient(context.options);
      if (!context.options.skipConnectivityTest) {
        await context.client.search("Patient", (search) => search._count(1));
      }
    },
  };
}

export function buildClient(options: ClientCommandOptions): FhirClientR4b {
  switch (options.fhir) {
    case "r4b": {
      return new FetchFhirClientR4b({
        baseUrl: options.baseUrl,
        auth:
          options.authHeader ||
          (options.authTokenUrl
            ? {
                tokenUrl: options.authTokenUrl!,
                clientId: options.authClientId!,
                clientSecret: options.authClientSecret!,
              }
            : undefined),
      });
    }
    case "r5": {
      return new FetchFhirClientR5({
        baseUrl: options.baseUrl,
        auth:
          options.authHeader ||
          (options.authTokenUrl
            ? {
                tokenUrl: options.authTokenUrl!,
                clientId: options.authClientId!,
                clientSecret: options.authClientSecret!,
              }
            : undefined),
      }) as unknown as FhirClientR4b;
    }
  }

  throw new Error(`Unsupported FHIR version: ${options.fhir}`);
}
