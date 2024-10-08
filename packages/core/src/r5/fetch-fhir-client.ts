/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {
  AnyResource,
  AnyResourceType,
  Bundle,
  CapabilityStatement,
  ExtractResource,
  OperationOutcome,
  Reference,
  Retrieved,
  TerminologyCapabilities,
} from "@bonfhir/fhirtypes/r5";
import type { TypedDocumentNode } from "@graphql-typed-document-node/core";
import { print, type ExecutionResult as GraphQLExecutionResult } from "graphql";
import { BundleExecutor } from "./bundle-executor";
import {
  BundleNavigator,
  WithResolvableReferences,
  bundleNavigator,
} from "./bundle-navigator";
import {
  AnyResourceTypeOrCustomResource,
  CustomResourceClass,
  ResourceOf,
  ResourceTypeOf,
  resourceTypeOf,
} from "./extensions";
import {
  ConcurrencyParameters,
  ConditionalSearchParameters,
  CreateOrAction,
  CreateOrResult,
  FhirClient,
  FhirClientError,
  FhirClientPatchBody,
  FhirClientSearchParameters,
  GeneralParameters,
  HistoryParameters,
  Operation,
  createOr,
  hasComplexParameters,
  normalizePatchBody,
  normalizeSearchParameters,
  searchAllPages,
  searchByPage,
} from "./fhir-client";
import { urlSafeConcat } from "./lang-utils";
import { Merger } from "./mergers/index";

/**
 * Allows to set the `Authorization` header to a static value.
 */
export type FetchFhirClientStaticAuthHeaderOptions = string;

export type FetchFhirClientClientCredentialsAuthOptions = {
  tokenUrl: string;
  clientId: string;
  clientSecret: string;
  additionalParameters?: Record<string, string> | null | undefined;
  tokenExpiration?: number | null | undefined;
  tokenExpirationBuffer?: number | null | undefined;
};

/**
 * This function is invoked before each fetch operation to return the value for the
 * `Authorization` header.
 */
export type FetchFhirClientFunctionAuthHeaderOptions = (
  ...args: Parameters<typeof fetch>
) => string | Promise<string> | null | undefined;

export type FetchFhirClientAuthOptions =
  | FetchFhirClientStaticAuthHeaderOptions
  | FetchFhirClientFunctionAuthHeaderOptions
  | FetchFhirClientClientCredentialsAuthOptions;

export interface FetchFhirClientOptions {
  baseUrl: string | URL;

  /** The default value for preventConcurrentUpdates. Defaults to false */
  preventConcurrentUpdates?: boolean | null | undefined;

  /**
   * Can be used to set a FHIR version to accept from the server.
   * @see {@link https://hl7.org/fhir/http.html#version-parameter}
   */
  acceptFhirVersion?: string | null | undefined;

  /**
   * The fetch implementation to use. Defaults to the global fetch.
   */
  fetch?: typeof fetch | null | undefined;

  /**
   * Some options to setup authentication.
   */
  auth?: FetchFhirClientAuthOptions | null | undefined;

  /**
   * Disable the check that prevents the client from making requests to a different origin.
   * This is necessary as some servers tend to redirect to a different origin on pagination
   */
  disableSameOriginCheck?: boolean | null | undefined;

  /**
   * Get notified when a request fails.
   */
  onError?: (response: Response) => void | Promise<void>;
}

export class FetchFhirClient implements FhirClient {
  private _clientCredentialsCache?:
    | {
        accessToken: string;
        expiresAt: number;
        tokenType: string;
      }
    | undefined;

  constructor(public options: FetchFhirClientOptions) {}

  public async read<TResourceType extends AnyResourceTypeOrCustomResource>(
    id: Reference<ResourceOf<TResourceType>>,
    options?: GeneralParameters | null | undefined,
  ): Promise<Retrieved<ResourceOf<TResourceType>>>;
  public async read<TResourceType extends AnyResourceTypeOrCustomResource>(
    type: TResourceType,
    id: string | Reference,
    options?: GeneralParameters | null | undefined,
  ): Promise<Retrieved<ResourceOf<TResourceType>>>;
  public async read<TResourceType extends AnyResourceTypeOrCustomResource>(
    type: TResourceType | Reference<ResourceOf<TResourceType>>,
    id: string | Reference | GeneralParameters | null | undefined,
    options?: GeneralParameters | null | undefined,
  ): Promise<Retrieved<ResourceOf<TResourceType>>> {
    if (typeof type === "object") {
      if (!type.reference) {
        throw new Error(`Missing reference value in ${JSON.stringify(type)}`);
      }
      options = id as GeneralParameters | null | undefined;
      [type, id] = type.reference.split("/") as [TResourceType, string];
    }

    if (id && typeof id === "object") {
      if (!(id as Reference).reference) {
        throw new Error(`Missing reference value in ${JSON.stringify(id)}`);
      }
      id = (id as Reference).reference!.split("/")[1];
    }

    const { signal, ...remainingOptions } = options ?? {};
    const queryString = new URLSearchParams(
      remainingOptions as Record<string, string>,
    ).toString();

    return this.fetch(
      `${resourceTypeOf(type)}/${id}${queryString ? `?${queryString}` : ""}`,
      { signal },
      type,
    );
  }

  public async vread<TResourceType extends AnyResourceTypeOrCustomResource>(
    type: TResourceType,
    id: string,
    vid: string,
    options?: GeneralParameters | null | undefined,
  ): Promise<Retrieved<ResourceOf<TResourceType>>> {
    const { signal, ...remainingOptions } = options ?? {};
    const queryString = new URLSearchParams(
      remainingOptions as Record<string, string>,
    ).toString();

    return this.fetch(
      `${resourceTypeOf(type)}/${id}/_history/${vid}${
        queryString ? `?${queryString}` : ""
      }`,
      { signal },
      type,
    );
  }

  public async update<TResource extends AnyResource>(
    body: TResource,
    options?:
      | (GeneralParameters &
          ConcurrencyParameters &
          ConditionalSearchParameters<TResource["resourceType"]>)
      | null
      | undefined,
  ): Promise<Retrieved<TResource>> {
    const { preventConcurrentUpdates, search, signal, ...remainingOptions } =
      options ?? {};
    const searchQueryString = normalizeSearchParameters(
      body.resourceType,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      search as any,
    );
    const optionsQueryString = new URLSearchParams(
      remainingOptions as Record<string, string>,
    ).toString();
    const queryString = [searchQueryString, optionsQueryString]
      .filter(Boolean)
      .join("&");

    const headers: Record<string, string> = {};
    if (
      (preventConcurrentUpdates || this.options.preventConcurrentUpdates) &&
      body.meta?.versionId
    ) {
      headers["If-Match"] = `W/"${body.meta.versionId}"`;
    }

    return this.fetch<Retrieved<TResource>>(
      `${[body.resourceType, body.id].filter(Boolean).join("/")}${
        queryString ? `?${queryString}` : ""
      }`,
      {
        method: "PUT",
        body: JSON.stringify(body),
        headers,
        signal,
      },
      body.constructor,
    );
  }

  public async patch<TResourceType extends AnyResourceTypeOrCustomResource>(
    type: TResourceType,
    id: string,
    body: FhirClientPatchBody<ResourceTypeOf<TResourceType>>,
    options?:
      | (GeneralParameters &
          ConcurrencyParameters & {
            versionId?: string | null | undefined;
          } & ConditionalSearchParameters<ResourceTypeOf<TResourceType>>)
      | null
      | undefined,
  ): Promise<Retrieved<ResourceOf<TResourceType>>> {
    const {
      preventConcurrentUpdates,
      versionId,
      search,
      signal,
      ...remainingOptions
    } = options ?? {};
    const searchQueryString = normalizeSearchParameters(type, search);
    const optionsQueryString = new URLSearchParams(
      remainingOptions as Record<string, string>,
    ).toString();
    const queryString = [searchQueryString, optionsQueryString]
      .filter(Boolean)
      .join("&");

    const headers: Record<string, string> = {};
    if (
      (preventConcurrentUpdates || this.options.preventConcurrentUpdates) &&
      versionId
    ) {
      headers["If-Match"] = `W/"${versionId}"`;
    }

    return this.fetch(
      `${resourceTypeOf(type)}/${id}${queryString ? `?${queryString}` : ""}`,
      {
        method: "PATCH",
        body: JSON.stringify(normalizePatchBody(type, body)),
        headers: {
          ...headers,
          "Content-Type":
            headers?.["Content-Type"] ?? "application/json-patch+json",
        },
        signal,
      },
      type,
    );
  }

  public delete(
    resource: Retrieved<AnyResource>,
    options?: GeneralParameters | null | undefined,
  ): Promise<void>;
  public delete(
    type: AnyResourceType,
    id: string,
    options?: GeneralParameters | null | undefined,
  ): Promise<void>;
  public async delete(
    type: AnyResourceType | Retrieved<AnyResource>,
    id?: string | null | undefined | GeneralParameters,
    options?: GeneralParameters | null | undefined,
  ): Promise<void> {
    if (typeof type !== "string") {
      return this.delete(
        type.resourceType,
        type.id,
        id as null | undefined | GeneralParameters,
      );
    }

    const { signal, ...remainingOptions } = options ?? {};
    const queryString = new URLSearchParams(
      remainingOptions as Record<string, string>,
    ).toString();
    await this.fetch(`${type}/${id}${queryString ? `?${queryString}` : ""}`, {
      method: "DELETE",
      signal,
    });
  }

  public history<TResource extends AnyResource>(
    resource: Retrieved<TResource>,
    options?: (GeneralParameters & HistoryParameters) | null | undefined,
  ): Promise<BundleNavigator<Retrieved<TResource>>>;
  public history<TResourceType extends AnyResourceTypeOrCustomResource>(
    type?: TResourceType | null | undefined,
    id?: string | null | undefined,
    options?: (GeneralParameters & HistoryParameters) | null | undefined,
  ): Promise<BundleNavigator<Retrieved<ResourceOf<TResourceType>>>>;
  public async history<TResourceType extends AnyResourceType>(
    type?: TResourceType | Retrieved<AnyResource> | null | undefined,
    id?: string | (GeneralParameters & HistoryParameters) | null | undefined,
    options?: (GeneralParameters & HistoryParameters) | null | undefined,
  ): Promise<BundleNavigator<Retrieved<ExtractResource<TResourceType>>>> {
    if (type && typeof type !== "string") {
      return (await this.history(
        type.resourceType,
        type.id,
        id as (GeneralParameters & HistoryParameters) | null | undefined,
      )) as BundleNavigator<Retrieved<ExtractResource<TResourceType>>>;
    }

    const { signal, ...remainingOptions } = options ?? {};
    const queryString = new URLSearchParams(
      remainingOptions as Record<string, string>,
    ).toString();

    return bundleNavigator(
      await this.fetch<Bundle<Retrieved<ExtractResource<TResourceType>>>>(
        `${[type, id, "_history"].filter(Boolean).join("/")}${
          queryString ? `?${queryString}` : ""
        }`,
        { signal },
      ),
    );
  }

  public async create<TResource extends AnyResource>(
    body: TResource,
    options?:
      | (GeneralParameters &
          ConditionalSearchParameters<TResource["resourceType"]>)
      | null
      | undefined,
  ): Promise<Retrieved<TResource>> {
    const { search, signal, ...remainingOptions } = options ?? {};
    const searchQueryString = normalizeSearchParameters(
      body.resourceType,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      search as any,
    );
    const optionsQueryString = new URLSearchParams(
      remainingOptions as Record<string, string>,
    ).toString();
    const queryString = [searchQueryString, optionsQueryString]
      .filter(Boolean)
      .join("&");

    return this.fetch<Retrieved<TResource>>(
      `${body.resourceType}${queryString ? `?${queryString}` : ""}`,
      {
        method: "POST",
        body: JSON.stringify(body),
        signal,
      },
      body.constructor,
    );
  }

  public async createOr<TResource extends AnyResource>(
    action: Exclude<CreateOrAction, "merge">,
    resource: TResource,
    search?:
      | FhirClientSearchParameters<TResource["resourceType"]>
      | null
      | undefined,
  ): Promise<CreateOrResult<Retrieved<TResource>>>;
  public async createOr<TResource extends AnyResource>(
    action: "merge",
    resource: TResource,
    search?:
      | FhirClientSearchParameters<TResource["resourceType"]>
      | null
      | undefined,
    mergers?: Array<Merger> | null | undefined,
  ): Promise<CreateOrResult<Retrieved<TResource>>>;
  public async createOr<TResource extends AnyResource>(
    action: CreateOrAction,
    resource: TResource,
    search?:
      | FhirClientSearchParameters<TResource["resourceType"]>
      | null
      | undefined,
    mergers?: Array<Merger> | null | undefined,
  ): Promise<CreateOrResult<Retrieved<TResource>>>;
  public async createOr<TResource extends AnyResource>(
    action: CreateOrAction,
    resource: TResource,
    search?:
      | FhirClientSearchParameters<TResource["resourceType"]>
      | null
      | undefined,
    mergers?: Array<Merger> | null | undefined,
  ): Promise<CreateOrResult<Retrieved<TResource>>> {
    return createOr(this, action, resource, search, mergers);
  }

  public save<TResource extends AnyResource>(
    body: TResource,
    options?:
      | (GeneralParameters &
          ConcurrencyParameters &
          ConditionalSearchParameters<TResource["resourceType"]>)
      | null
      | undefined,
  ): Promise<Retrieved<TResource>> {
    return body.id?.trim()
      ? this.update(body, options)
      : this.create(body, options);
  }

  public async search<TResourceType extends AnyResourceTypeOrCustomResource>(
    type?: TResourceType | null | undefined,
    parameters?:
      | FhirClientSearchParameters<ResourceTypeOf<TResourceType>>
      | null
      | undefined,
    options?: GeneralParameters | null | undefined,
  ): Promise<BundleNavigator<Retrieved<ResourceOf<TResourceType>>>> {
    const searchQueryString = normalizeSearchParameters(type, parameters);
    const { signal, ...remainingOptions } = options ?? {};
    const optionsQueryString = new URLSearchParams(
      remainingOptions as Record<string, string>,
    ).toString();
    const queryString = [searchQueryString, optionsQueryString]
      .filter(Boolean)
      .join("&");

    const response = await this.fetch<
      Bundle<Retrieved<ResourceOf<TResourceType>>>
    >(`${resourceTypeOf(type) || ""}${queryString ? `?${queryString}` : ""}`, {
      signal,
    });

    return bundleNavigator(
      response,
      typeof type === "string" ? undefined : (type as CustomResourceClass),
    ) as BundleNavigator<Retrieved<ResourceOf<TResourceType>>>;
  }

  public async searchOne<TResourceType extends AnyResourceTypeOrCustomResource>(
    type?: TResourceType | null | undefined,
    parameters?:
      | FhirClientSearchParameters<ResourceTypeOf<TResourceType>>
      | null
      | undefined,
    options?: GeneralParameters | null | undefined,
  ): Promise<WithResolvableReferences<Retrieved<ResourceOf<TResourceType>>>> {
    const navigator = await this.search<TResourceType>(
      type as TResourceType,
      parameters,
      options,
    );
    return navigator.searchMatchOne<ResourceOf<TResourceType>>();
  }

  public async searchByPage<
    TResourceType extends AnyResourceTypeOrCustomResource,
  >(
    type: TResourceType | null | undefined,
    search:
      | FhirClientSearchParameters<ResourceTypeOf<TResourceType>>
      | null
      | undefined,
    fn: (
      nav: BundleNavigator<Retrieved<ResourceOf<TResourceType>>>,
    ) => unknown | Promise<unknown>,
    options?: GeneralParameters | null | undefined,
  ): Promise<void> {
    return searchByPage(this, type, search, fn, options);
  }

  public async searchAllPages<
    TResourceType extends AnyResourceTypeOrCustomResource,
  >(
    type: TResourceType | null | undefined,
    search?:
      | FhirClientSearchParameters<ResourceTypeOf<TResourceType>>
      | null
      | undefined,
    options?: GeneralParameters | null | undefined,
  ): Promise<BundleNavigator<ResourceOf<TResourceType>>> {
    return searchAllPages(this, type, search, options);
  }

  /**
   * Execute a [$graph operation](http://hl7.org/fhir/R4B/resource-operation-graph.html) to retrieve an entire graph
   * of resources.
   */
  public async graph<TResourceType extends AnyResourceTypeOrCustomResource>(
    graph: string,
    resourceType?: TResourceType | null | undefined,
    resourceId?: string | null | undefined,
  ): Promise<BundleNavigator<Retrieved<ResourceOf<TResourceType>>>> {
    const result = await this.execute<Bundle>({
      operation: "$graph",
      resourceType: resourceTypeOf(resourceType),
      resourceId,
      parameters: {
        resourceType: "Parameters",
        parameter: [
          {
            name: "graph",
            valueUri: graph,
          },
        ],
      },
      affectsState: false,
    });

    return bundleNavigator(
      result,
      resourceType == undefined || typeof resourceType === "string"
        ? undefined
        : (resourceType as CustomResourceClass),
    ) as BundleNavigator<Retrieved<ResourceOf<TResourceType>>>;
  }

  /* eslint-disable @typescript-eslint/no-explicit-any */
  public async graphql<TResult = any>(
    query: string,
    variables?: Record<string, any>,
    operationName?: string | null | undefined,
  ): Promise<TResult>;
  public async graphql<TResult = any, TVariables = Record<string, any>>(
    query: TypedDocumentNode<TResult, TVariables>,
    variables?: TVariables,
  ): Promise<TResult>;
  public async graphql<TResult = any, TVariables = Record<string, any>>(
    query: string | TypedDocumentNode<TResult, TVariables>,
    variables?: TVariables,
    operationName?: string | null | undefined,
  ): Promise<TResult> {
    const response = await this.graphqlResult<TResult, TVariables>(
      query,
      variables,
      operationName,
    );

    if (response.errors?.length) {
      throw new FhirClientError(
        200,
        undefined,
        {
          query,
          variables,
          operationName,
          data: response.data,
          errors: response.errors,
          extensions: response.extensions,
        },
        "GraphQL request failed. See errors property for details.",
      );
    }

    return response.data!;
  }

  public async graphqlResult<TResult = any>(
    query: string,
    variables?: Record<string, any>,
    operationName?: string | null | undefined,
  ): Promise<GraphQLExecutionResult<TResult>>;
  public async graphqlResult<TResult = any, TVariables = Record<string, any>>(
    query: TypedDocumentNode<TResult, TVariables>,
    variables?: TVariables,
  ): Promise<GraphQLExecutionResult<TResult>>;
  public async graphqlResult<TResult = any, TVariables = Record<string, any>>(
    query: string | TypedDocumentNode<TResult, TVariables>,
    variables?: TVariables,
    operationName?: string | null | undefined,
  ): Promise<GraphQLExecutionResult<TResult>>;
  public async graphqlResult<TResult = any, TVariables = Record<string, any>>(
    query: string | TypedDocumentNode<TResult, TVariables>,
    variables?: TVariables,
    operationName?: string | null | undefined,
  ): Promise<GraphQLExecutionResult<TResult>> {
    if (typeof query !== "string") {
      query = print(query);
    }

    return await this.fetch<GraphQLExecutionResult<TResult>>("$graphql", {
      method: "POST",
      body: JSON.stringify({
        query,
        variables,
        operationName,
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
  }
  /* eslint-enable @typescript-eslint/no-explicit-any */

  public async capabilities(
    mode?: "full" | "normative" | null | undefined,
  ): Promise<CapabilityStatement>;
  public async capabilities(
    mode: "terminology",
  ): Promise<TerminologyCapabilities>;
  public async capabilities(
    mode?: "full" | "normative" | "terminology" | null | undefined,
  ): Promise<CapabilityStatement | TerminologyCapabilities> {
    return this.fetch(`metadata${mode ? `?mode=${mode}` : ""}`);
  }

  public batch(): BundleExecutor;
  public batch(
    body: Bundle,
    options?: GeneralParameters | null | undefined,
  ): Promise<Bundle>;
  public batch(
    body?: Bundle,
    options?: GeneralParameters | null | undefined,
  ): Promise<Bundle> | BundleExecutor {
    if (!body) {
      return new BundleExecutor(this, "batch");
    }

    const { signal, ...remainingOptions } = options ?? {};
    const queryString = new URLSearchParams(
      remainingOptions as Record<string, string>,
    ).toString();

    return this.fetch<Bundle>(queryString ? `?${queryString}` : "", {
      method: "POST",
      body: JSON.stringify(body),
      signal,
    });
  }

  public transaction(): BundleExecutor;
  public transaction(
    body: Bundle,
    options?: GeneralParameters | null | undefined,
  ): Promise<Bundle>;
  public transaction(
    body?: Bundle,
    options?: GeneralParameters | null | undefined,
  ): Promise<Bundle> | BundleExecutor {
    if (!body) {
      return new BundleExecutor(this, "transaction");
    }

    const { signal, ...remainingOptions } = options ?? {};
    const queryString = new URLSearchParams(
      remainingOptions as Record<string, string>,
    ).toString();

    return this.fetch<Bundle>(queryString ? `?${queryString}` : "", {
      method: "POST",
      body: JSON.stringify(body),
      signal,
    });
  }

  public execute<TOperationResult>(
    operation: Operation,
  ): Promise<TOperationResult> {
    const prefix = [operation.resourceType, operation.resourceId]
      .filter(Boolean)
      .join("/");
    const parameters = Array.isArray(operation.parameters)
      ? ({
          resourceType: "Parameters",
          parameter: operation.parameters,
        } as const)
      : operation.parameters;
    const affectsState = operation.affectsState ?? true;
    const useGet = !affectsState && !hasComplexParameters(parameters);
    const queryString =
      useGet && parameters?.parameter?.length
        ? new URLSearchParams(
            parameters.parameter.reduce(
              (acc, cur) => {
                acc[cur.name] = Object.entries(cur).find(
                  ([key, val]) => key.startsWith("value") && val != undefined,
                )?.[1];
                return acc;
              },
              {} as Record<string, string>,
            ),
          ).toString()
        : undefined;
    return this.fetch<TOperationResult>(
      `${prefix ? `${prefix}/` : ""}${operation.operation}${
        queryString ? `?${queryString}` : ""
      }`,
      {
        method: useGet ? "GET" : "POST",
        body: !useGet && parameters ? JSON.stringify(parameters) : undefined,
      },
    );
  }

  public async fetchPage<TResource extends AnyResource>(
    resource: string | URL,
    init?: Parameters<typeof fetch>[1],
  ): Promise<BundleNavigator<Retrieved<TResource>>>;
  fetchPage<TCustomResourceClass extends CustomResourceClass>(
    resource: string | URL,
    init?: Parameters<typeof fetch>[1],
    customType?: TCustomResourceClass | null | undefined,
  ): Promise<BundleNavigator<Retrieved<InstanceType<TCustomResourceClass>>>>;
  public async fetchPage<TResource extends AnyResource>(
    resource: string | URL,
    init?: Parameters<typeof fetch>[1],
    customType?: CustomResourceClass | null | undefined,
  ): Promise<BundleNavigator<Retrieved<TResource>>> {
    const response = await this.fetch<Bundle<Retrieved<TResource>>>(
      resource,
      init,
    );
    if (response.resourceType !== "Bundle") {
      throw new FhirClientError(
        undefined,
        undefined,
        {
          resource,
          response,
        },
        `Page response for ${resource} does not appear to be a bundle - ${response.resourceType}`,
      );
    }

    return bundleNavigator(
      response,
      customType || undefined,
    ) as BundleNavigator<Retrieved<TResource>>;
  }

  public async fetch<T = unknown>(
    resource: string | URL,
    init?: Parameters<typeof fetch>[1],
    customType?:
      | string
      // eslint-disable-next-line @typescript-eslint/ban-types
      | Function
      | null
      | undefined,
  ): Promise<T> {
    let targetUrl = typeof resource === "string" ? resource : resource.href;

    if (/^(?:[a-z]+:)?\/\//.test(targetUrl)) {
      if (
        !this.options.disableSameOriginCheck &&
        !targetUrl.startsWith(this.options.baseUrl?.toString())
      ) {
        throw new Error(
          `Unable to fetch ${targetUrl} as it is not part of the baseUrl ${this.options.baseUrl}`,
        );
      }
    } else {
      targetUrl = urlSafeConcat(this.options.baseUrl, targetUrl);
    }

    const finalInit = {
      ...init,
      headers: {
        Accept: `application/fhir+json${
          this.options.acceptFhirVersion
            ? `; fhirVersion=${this.options.acceptFhirVersion}`
            : ""
        }`,
        "Content-Type": "application/fhir+json",
        ...init?.headers,
      } as Record<string, string>,
    };

    if (!finalInit.headers.Authorization && this.options.auth) {
      const authHeader = await this.getAuthorizationHeader(
        targetUrl,
        finalInit,
      );
      if (authHeader) {
        finalInit.headers["Authorization"] = authHeader;
      }
    }

    const response = await (this.options.fetch || fetch)(targetUrl, finalInit);

    if (!response.ok) {
      // We clone the response to allow the user code to re-read the body if need be.
      const clonedResponse = response.clone();
      if (this.options.onError) {
        const clonedResponse2 = response.clone();
        await this.options.onError(clonedResponse2);
      }
      let operationOutcome: OperationOutcome | undefined;
      try {
        const tryOperationOutcome = (await response.json()) as OperationOutcome;
        if (tryOperationOutcome?.resourceType === "OperationOutcome") {
          operationOutcome = tryOperationOutcome;
        }
      } catch {
        // We ignore the deserialization error and return the original error.
      }
      throw new FhirClientError(clonedResponse.status, operationOutcome, {
        response: clonedResponse,
      });
    }

    const responseText = await response.text();
    const parsedResponse = responseText ? JSON.parse(responseText) : undefined;
    if (customType && typeof customType !== "string") {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      return new customType(parsedResponse);
    }
    return parsedResponse;
  }

  private async getAuthorizationHeader(
    targetUrl: string,
    init: RequestInit,
  ): Promise<string | undefined> {
    if (!this.options.auth) {
      return;
    }

    if (typeof this.options.auth === "string") {
      return this.options.auth;
    }

    if (typeof this.options.auth === "function") {
      return (await this.options.auth(targetUrl, init)) || undefined;
    }

    if (typeof this.options.auth === "object") {
      if (
        this._clientCredentialsCache &&
        this._clientCredentialsCache.expiresAt > Date.now()
      ) {
        return `${this._clientCredentialsCache.tokenType} ${this._clientCredentialsCache.accessToken}`;
      }
      const tokenSearchParams = new URLSearchParams({
        grant_type: "client_credentials",
        client_id: this.options.auth.clientId,
        client_secret: this.options.auth.clientSecret,
        ...this.options.auth.additionalParameters,
      });

      const tokenResponse = await fetch(this.options.auth.tokenUrl, {
        method: "POST",
        body: tokenSearchParams.toString(),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

      if (!tokenResponse.ok) {
        throw new FhirClientError(tokenResponse.status, undefined, {
          kind: "client_credentials_error",
          response: tokenResponse,
        });
      }

      const parsedTokenResponse = (await tokenResponse.json()) as {
        access_token: string;
        expires_in?: number;
        token_type?: string;
      };
      this._clientCredentialsCache = {
        accessToken: parsedTokenResponse.access_token,
        expiresAt:
          Date.now() +
          ((parsedTokenResponse.expires_in ||
            (this.options.auth.tokenExpiration ?? 3600)) -
            (this.options.auth.tokenExpirationBuffer ?? 360)) *
            1000,
        tokenType: parsedTokenResponse.token_type || "Bearer",
      };
      return `${this._clientCredentialsCache.tokenType} ${this._clientCredentialsCache.accessToken}`;
    }

    throw new Error("Invalid auth configuration");
  }
}
