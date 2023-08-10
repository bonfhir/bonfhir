import {
  AnyResource,
  FhirClient,
  Retrieved,
  Subscription,
  build,
  urlSafeConcat,
} from "@bonfhir/core/r4b";

export interface FhirSubscription<TResource extends AnyResource = AnyResource> {
  /** The Subscription selection criteria. */
  criteria: Subscription["criteria"];

  /** The Subscription reason (to document is on the server). */
  reason: Subscription["reason"];

  /** The Subscription endpoint to hit (webhook url). */
  endpoint: string;

  /** The subscription handler. */
  handler: FhirSubscriptionHandler<TResource>;
}

export type FhirSubscriptionHandler<
  TResource extends AnyResource = AnyResource,
> = (
  args: FhirSubscriptionHandlerArgs<TResource>,
) => Promise<FhirSubscriptionHandlerResult>;

export interface FhirSubscriptionHandlerArgs<
  TResource extends AnyResource = AnyResource,
> {
  fhirClient: FhirClient;

  /** The resource that matches the subscription. */
  resource: Retrieved<TResource>;

  /** The configured logger. */
  logger:
    | Pick<typeof console, "debug" | "info" | "warn" | "error">
    | null
    | undefined;
}

export type FhirSubscriptionHandlerResult =
  | void
  | Promise<void>
  | object
  | Promise<object>;

export type SubscriptionLogger = Pick<
  typeof console,
  "debug" | "info" | "warn" | "error"
>;

export interface RegisterSubscriptionsArgs {
  fhirClient: FhirClient;

  logger: SubscriptionLogger;

  /** The API base URL */
  baseUrl: string;

  /** The subscription payload, a.k.a. MIME type. Defaults to application/fhir+json */
  contentType?: Subscription["channel"]["payload"] | null | undefined;

  /** A secret shared between the API and the FHIR subscription use to secure the endpoint. */
  webhookSecret: string;

  /**
   * The name of the security header used. Defaults to "X-Subscription-Auth"
   */
  securityHeader?: string | null | undefined;

  /** The list of subscriptions to register */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  subscriptions: FhirSubscription<any>[];
}

/**
 * Create the Subscriptions for the webhooks.
 */
export async function registerSubscriptions({
  contentType,
  baseUrl,
  fhirClient,
  logger,
  subscriptions,
  securityHeader,
  webhookSecret,
}: RegisterSubscriptionsArgs) {
  logger.info("Registering subscriptions...");

  for (const subscription of subscriptions) {
    try {
      const subscriptionUrl = urlSafeConcat(baseUrl, subscription.endpoint);
      const existingSubscriptionSearch = await fhirClient.search(
        "Subscription",
        (search) => search.url(subscriptionUrl),
      );
      const existingSubscription =
        existingSubscriptionSearch.bundle.entry?.[0]?.resource;

      const securityHeaderValue = `${
        securityHeader || "X-Subscription-Auth"
      }: ${webhookSecret}`;

      if (existingSubscription) {
        if (
          existingSubscription.criteria !== subscription.criteria ||
          existingSubscription.reason !== subscription.reason ||
          existingSubscription.channel?.payload !==
            (contentType ?? "application/fhir+json") ||
          !existingSubscription.channel?.header?.includes(securityHeaderValue)
        ) {
          await fhirClient.update({
            ...existingSubscription,
            reason: subscription.reason,
            criteria: subscription.criteria,
            channel: {
              ...existingSubscription.channel,
              payload: contentType ?? "application/fhir+json",
              header: [
                ...(existingSubscription.channel?.header || []),
                securityHeaderValue,
              ],
            },
          });
        }
      } else {
        await fhirClient.create(
          build("Subscription", {
            status: "active",
            reason: subscription.reason,
            criteria: subscription.criteria,
            channel: {
              type: "rest-hook",
              endpoint: subscriptionUrl,
              payload: contentType ?? "application/fhir+json",
              header: [securityHeaderValue],
            },
          }),
        );
      }

      logger.debug(
        `Subscription ${subscription.reason} for ${subscription.criteria} on ${subscription.endpoint} registered.`,
      );
    } catch (error) {
      logger.error(
        `Error while registering subscription ${subscription.reason} on ${subscription.endpoint}`,
        error,
      );

      throw error;
    }
  }
}
