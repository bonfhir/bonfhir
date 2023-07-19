import { FhirClient, urlSafeConcat } from "@bonfhir/core/r5";
import {
  FhirSubscription,
  SubscriptionLogger,
  registerSubscriptions,
} from "@bonfhir/subscriptions/r5";
import { NextMiddleware, NextResponse } from "next/server";

export interface FhirSubscriptionsConfig {
  /**
   * The {@link FhirRestfulClient} to use to register subscriptions.
   * If this is a function, it is invoked prior to every handler invocation as well.
   */
  fhirClient: FhirClient | (() => FhirClient | Promise<FhirClient>);

  /** The subscriptions handlers to register. */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  subscriptions: FhirSubscription<any>[];

  /** The API base URL */
  baseUrl: string;

  prefix: string;

  /**
   * The name of the security header used. Defaults to "X-Subscription-Auth"
   */
  securityHeader?: string | null | undefined;

  /** A secret shared between the API and the FHIR subscription use to secure the endpoint. */
  webhookSecret: string;

  /** Logger to use. Defaults to console. */
  logger?: SubscriptionLogger | null | undefined;

  contentType?: string | null | undefined;
}

export function fhirSubscriptions(
  config: FhirSubscriptionsConfig,
): NextMiddleware {
  return async (request) => {
    if (!request.nextUrl.pathname.startsWith(config.prefix)) {
      return NextResponse.next();
    }

    if (
      !request.headers.has(config.securityHeader || "X-Subscription-Auth") ||
      request.headers.get(config.securityHeader || "X-Subscription-Auth") !==
        config.webhookSecret
    ) {
      return new NextResponse(undefined, {
        status: 401,
      });
    }

    const logger = config.logger ?? console;
    const fhirClient =
      typeof config.fhirClient === "function"
        ? await config.fhirClient()
        : config.fhirClient;

    const action = request.nextUrl.pathname.split("/").at(-1);

    if (action === "register") {
      try {
        await registerSubscriptions({
          baseUrl: urlSafeConcat(config.baseUrl, config.prefix),
          fhirClient,
          logger,
          subscriptions: config.subscriptions,
          webhookSecret: config.webhookSecret,
          contentType: config.contentType,
        });
        return new NextResponse(undefined, { status: 204 });
      } catch (error) {
        return new NextResponse(errorToString(error), {
          status: 500,
        });
      }
    }

    const subscription = config.subscriptions.find(
      (sub) => `${sub.endpoint}` === action,
    );

    if (!subscription) {
      return new NextResponse(
        JSON.stringify({
          message: `Unable to find a subscription for ${subscription}`,
        }),
        {
          status: 404,
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
    }

    const resource = await request.json();
    try {
      const result = await subscription.handler({
        fhirClient:
          typeof config.fhirClient === "function"
            ? await config.fhirClient()
            : config.fhirClient,
        resource,
        logger,
      });

      return result == undefined
        ? new NextResponse(undefined, {
            status: 204,
          })
        : new NextResponse(JSON.stringify(result), {
            status: 200,
            headers: {
              "Content-Type": "application/json",
            },
          });
    } catch (error) {
      logger.error(error);
      return new NextResponse(errorToString(error), {
        status: 500,
      });
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
