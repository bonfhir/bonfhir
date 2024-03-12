import { FhirClient, urlSafeConcat } from "@bonfhir/core/r4b";
import {
  FhirSubscription,
  FhirSubscriptionLogger,
  registerSubscriptions,
} from "@bonfhir/subscriptions/r4b";
import type {
  APIGatewayProxyEventV2,
  APIGatewayProxyResultV2,
  Handler,
} from "aws-lambda";

export interface AwsLambdaFhirSubscriptionsConfig {
  /**
   * The {@link FhirRestfulClient} to use to register subscriptions.
   * If this is a function, it is invoked prior to every handler invocation as well.
   */
  fhirClient: FhirClient | (() => FhirClient | Promise<FhirClient>);

  /** The subscriptions handlers to register. */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  subscriptions: FhirSubscription<any>[];

  /** The API **public** base URL */
  baseUrl: string;

  /**
   * The name of the security header used. Defaults to "X-Subscription-Auth"
   */
  securityHeader?: string | null | undefined;

  /** A secret shared between the API and the FHIR subscription use to secure the endpoint. */
  webhookSecret: string;

  /** Logger to use. Defaults to console. */
  logger?: FhirSubscriptionLogger | null | undefined;

  contentType?: string | null | undefined;
}

export function fhirSubscriptionHandler(
  config: AwsLambdaFhirSubscriptionsConfig,
): Handler<APIGatewayProxyEventV2, APIGatewayProxyResultV2> {
  const logger = config.logger ?? console;
  const securityHeader = config.securityHeader || "x-subscription-auth";

  return async (event) => {
    if (process.env.BONFHIR_SUBSCRIPTIONS_LOG_EVENT) {
      console.log(JSON.stringify(event, undefined, 2));
    }
    const securityHeaderValue = Object.entries(event.headers || {}).find(
      ([key]) => key.toLowerCase() === securityHeader,
    )?.[1];
    if (securityHeaderValue !== config.webhookSecret) {
      // Logging the error
      logger?.warn(
        `Received unauthorized request for ${event.rawPath} (${securityHeader}).`,
      );
      return {
        statusCode: 401,
      };
    }

    const endpoint = event.pathParameters?.["endpoint"]
      ?.split("/")
      .find(Boolean);

    if (!endpoint) {
      return {
        statusCode: 404,
        body: JSON.stringify({
          message: `Missing endpoint path parameter value. Did you forget to add it to the API Gateway path specification? (e.g. /.../{endpoint+})`,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      };
    }

    if (endpoint === "register") {
      const fhirClient =
        typeof config.fhirClient === "function"
          ? await config.fhirClient()
          : config.fhirClient;
      const pathPrefix = event.rawPath.replace("/" + endpoint, "");
      try {
        await registerSubscriptions({
          baseUrl: pathPrefix
            ? urlSafeConcat(config.baseUrl, pathPrefix)
            : config.baseUrl,
          fhirClient,
          logger,
          subscriptions: config.subscriptions,
          webhookSecret: config.webhookSecret,
          contentType: config.contentType,
        });
        return {
          statusCode: 204,
        };
      } catch (error) {
        return {
          statusCode: 500,
          body: errorToString(error),
        };
      }
    }

    const subscription = config.subscriptions.find(
      (sub) => `${sub.endpoint}` === endpoint,
    );

    if (!subscription) {
      return {
        statusCode: 404,
        body: JSON.stringify({
          message: `Unable to find a subscription`,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      };
    }

    if (!event.body) {
      return {
        statusCode: 204,
        body: JSON.stringify({
          message: `Body was not provided, noop for subscription`,
        }),
      };
    }

    const resource = JSON.parse(event.body);

    try {
      await subscription.handler({
        fhirClient:
          typeof config.fhirClient === "function"
            ? await config.fhirClient()
            : config.fhirClient,
        resource,
        logger,
      });

      return {
        statusCode: 200,
        body: JSON.stringify(resource),
        headers: { "Content-Type": "application/fhir+json" },
      };
    } catch (error) {
      logger.error(error);

      return {
        statusCode: 500,
        body: errorToString(error),
      };
    }
  };
}

function errorToString(error: unknown): string {
  if (error instanceof Error) {
    return `${error.message} (${error.stack})`;
  }

  if (typeof error === "string") {
    return error;
  }

  try {
    return JSON.stringify(error);
  } catch {
    return `Unknown error: ${error}`;
  }
}
