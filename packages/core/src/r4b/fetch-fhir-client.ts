/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { BundleExecutor } from "./bundle-executor";
import {
  bundleNavigator,
  BundleNavigator,
  WithResolvableReferences,
} from "./bundle-navigator";
import {
  ConcurrencyParameters,
  ConditionalSearchParameters,
  FhirClient,
  FhirClientError,
  FhirClientPatchBody,
  FhirClientSearchParameters,
  GeneralParameters,
  HistoryParameters,
  normalizePatchBody,
  normalizeSearchParameters,
  searchAllPages,
  searchByPage,
} from "./fhir-client";
import {
  AnyResource,
  AnyResourceType,
  Bundle,
  CapabilityStatement,
  ExtractResource,
  OperationOutcome,
  Retrieved,
} from "./fhir-types.codegen";
import {
  ExtractOperationResultType,
  Operation,
  OperationParameters,
} from "./operations.codegen";

/**
 * Allows to set the `Authorization` header to a static value.
 */
export type FetchFhirClientStaticAuthHeaderOptions = string;

/**
 * This function is invoked before each fetch operation to return the value for the
 * `Authorization` header.
 */
export type FetchFhirClientFunctionAuthHeaderOptions = (
  ...args: Parameters<typeof fetch>
) => Promise<string>;

export type FetchFhirClientAuthOptions =
  | FetchFhirClientStaticAuthHeaderOptions
  | FetchFhirClientFunctionAuthHeaderOptions;

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
}

export class FetchFhirClient implements FhirClient {
  constructor(public options: FetchFhirClientOptions) {}

  public async read<TResourceType extends AnyResourceType>(
    type: TResourceType,
    id: string,
    options?: GeneralParameters | null | undefined
  ): Promise<Retrieved<ExtractResource<TResourceType>>> {
    const queryString = new URLSearchParams(
      options as Record<string, string>
    ).toString();
    return this.fetch<Retrieved<ExtractResource<TResourceType>>>(
      `${type}/${id}${queryString ? `?${queryString}` : ""}`
    );
  }

  public async vread<TResourceType extends AnyResourceType>(
    type: TResourceType,
    id: string,
    vid: string,
    options?: GeneralParameters | null | undefined
  ): Promise<Retrieved<ExtractResource<TResourceType>>> {
    const queryString = new URLSearchParams(
      options as Record<string, string>
    ).toString();
    return this.fetch<Retrieved<ExtractResource<TResourceType>>>(
      `${type}/${id}/_history/${vid}${queryString ? `?${queryString}` : ""}`
    );
  }

  public async update<TResource extends AnyResource>(
    body: TResource,
    options?:
      | (GeneralParameters &
          ConcurrencyParameters &
          ConditionalSearchParameters<TResource["resourceType"]>)
      | null
      | undefined
  ): Promise<Retrieved<TResource>> {
    const { preventConcurrentUpdates, search, ...remainingOptions } =
      options ?? {};
    const searchQueryString = normalizeSearchParameters(
      body.resourceType,
      search
    );
    const optionsQueryString = new URLSearchParams(
      remainingOptions as Record<string, string>
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
      }
    );
  }

  public async patch<TResourceType extends AnyResourceType>(
    type: TResourceType,
    id: string,
    body: FhirClientPatchBody<TResourceType>,
    options?:
      | (GeneralParameters &
          ConcurrencyParameters & {
            versionId?: string | null | undefined;
          } & ConditionalSearchParameters<TResourceType>)
      | null
      | undefined
  ): Promise<Retrieved<ExtractResource<TResourceType>>> {
    const { preventConcurrentUpdates, versionId, search, ...remainingOptions } =
      options ?? {};
    const searchQueryString = normalizeSearchParameters(type, search);
    const optionsQueryString = new URLSearchParams(
      remainingOptions as Record<string, string>
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

    return this.fetch<Retrieved<Retrieved<ExtractResource<TResourceType>>>>(
      `${type}/${id}${queryString ? `?${queryString}` : ""}`,
      {
        method: "PATCH",
        body: JSON.stringify(normalizePatchBody(type, body)),
        headers,
      }
    );
  }

  public delete(
    resource: Retrieved<AnyResource>,
    options?: GeneralParameters | null | undefined
  ): Promise<void>;
  public delete(
    type: AnyResourceType,
    id: string,
    options?: GeneralParameters | null | undefined
  ): Promise<void>;
  public async delete(
    type: AnyResourceType | Retrieved<AnyResource>,
    id?: string | null | undefined | GeneralParameters,
    options?: GeneralParameters | null | undefined
  ): Promise<void> {
    if (typeof type !== "string") {
      return this.delete(
        type.resourceType,
        type.id,
        id as null | undefined | GeneralParameters
      );
    }

    const queryString = new URLSearchParams(
      options as Record<string, string>
    ).toString();
    await this.fetch(`${type}/${id}${queryString ? `?${queryString}` : ""}`, {
      method: "DELETE",
    });
  }

  public history<TResource extends AnyResource>(
    resource: Retrieved<TResource>,
    options?: (GeneralParameters & HistoryParameters) | null | undefined
  ): Promise<BundleNavigator<Retrieved<TResource>>>;
  public history<TResourceType extends AnyResourceType>(
    type?: TResourceType | null | undefined,
    id?: string | null | undefined,
    options?: (GeneralParameters & HistoryParameters) | null | undefined
  ): Promise<BundleNavigator<Retrieved<ExtractResource<TResourceType>>>>;
  public async history<TResourceType extends AnyResourceType>(
    type?: TResourceType | Retrieved<AnyResource> | null | undefined,
    id?: string | (GeneralParameters & HistoryParameters) | null | undefined,
    options?: (GeneralParameters & HistoryParameters) | null | undefined
  ): Promise<BundleNavigator<Retrieved<ExtractResource<TResourceType>>>> {
    if (type && typeof type !== "string") {
      return (await this.history(
        type.resourceType,
        type.id,
        id as (GeneralParameters & HistoryParameters) | null | undefined
      )) as BundleNavigator<Retrieved<ExtractResource<TResourceType>>>;
    }

    const queryString = new URLSearchParams(
      options as Record<string, string>
    ).toString();

    return bundleNavigator(
      await this.fetch<Bundle<Retrieved<ExtractResource<TResourceType>>>>(
        `${[type, id, "_history"].filter(Boolean).join("/")}${
          queryString ? `?${queryString}` : ""
        }`
      )
    );
  }

  public async create<TResource extends AnyResource>(
    body: TResource,
    options?:
      | (GeneralParameters &
          ConditionalSearchParameters<TResource["resourceType"]>)
      | null
      | undefined
  ): Promise<Retrieved<TResource>> {
    const { search, ...remainingOptions } = options ?? {};
    const searchQueryString = normalizeSearchParameters(
      body.resourceType,
      search
    );
    const optionsQueryString = new URLSearchParams(
      remainingOptions as Record<string, string>
    ).toString();
    const queryString = [searchQueryString, optionsQueryString]
      .filter(Boolean)
      .join("&");

    return this.fetch<Retrieved<TResource>>(
      `${body.resourceType}${queryString ? `?${queryString}` : ""}`,
      {
        method: "POST",
        body: JSON.stringify(body),
      }
    );
  }

  public async search<TResourceType extends AnyResourceType>(
    type?: TResourceType | null | undefined,
    parameters?: FhirClientSearchParameters<TResourceType> | null | undefined,
    options?: GeneralParameters | null | undefined
  ): Promise<BundleNavigator<Retrieved<ExtractResource<TResourceType>>>> {
    const searchQueryString = normalizeSearchParameters(type, parameters);
    const optionsQueryString = new URLSearchParams(
      options as Record<string, string>
    ).toString();
    const queryString = [searchQueryString, optionsQueryString]
      .filter(Boolean)
      .join("&");
    const response = await this.fetch<
      Bundle<Retrieved<ExtractResource<TResourceType>>>
    >(`${type || ""}${queryString ? `?${queryString}` : ""}`);

    return bundleNavigator(response);
  }

  public async searchOne<TResourceType extends AnyResourceType>(
    type?: TResourceType | null | undefined,
    parameters?: FhirClientSearchParameters<TResourceType> | null | undefined,
    options?: GeneralParameters | null | undefined
  ): Promise<
    WithResolvableReferences<Retrieved<ExtractResource<TResourceType>>>
  > {
    const navigator = await this.search<TResourceType>(
      type,
      parameters,
      options
    );
    return navigator.searchMatchOne<ExtractResource<TResourceType>>();
  }

  public async searchByPage<TResourceType extends AnyResourceType>(
    type: TResourceType | null | undefined,
    search: FhirClientSearchParameters<TResourceType>,
    fn: (
      nav: BundleNavigator<Retrieved<ExtractResource<TResourceType>>>
    ) => unknown | Promise<unknown>
  ): Promise<void> {
    return searchByPage(this, type, search, fn);
  }

  public async searchAllPages<TResourceType extends AnyResourceType>(
    type: TResourceType | null | undefined,
    search: FhirClientSearchParameters<TResourceType>
  ): Promise<BundleNavigator<ExtractResource<TResourceType>>> {
    return searchAllPages(this, type, search);
  }

  public async capabilities(
    mode?: "full" | "normative" | "terminology" | null | undefined
  ): Promise<CapabilityStatement> {
    return this.fetch<CapabilityStatement>(
      `metadata${mode ? `?mode=${mode}` : ""}`
    );
  }

  public batch(): BundleExecutor;
  public batch(
    body: Bundle & { type: "batch" },
    options?: GeneralParameters | null | undefined
  ): Promise<Bundle>;
  public batch(
    body?: Bundle & { type: "batch" },
    options?: GeneralParameters | null | undefined
  ): Promise<Bundle> | BundleExecutor {
    if (!body) {
      return new BundleExecutor(this, "batch");
    }

    const queryString = new URLSearchParams(
      options as Record<string, string>
    ).toString();

    return this.fetch<Bundle>(queryString ? `?${queryString}` : "", {
      method: "POST",
      body: JSON.stringify(body),
    });
  }

  public transaction(): BundleExecutor;
  public transaction(
    body: Bundle & { type: "transaction" },
    options?: GeneralParameters | null | undefined
  ): Promise<Bundle>;
  public transaction(
    body?: Bundle & { type: "transaction" },
    options?: GeneralParameters | null | undefined
  ): Promise<Bundle> | BundleExecutor {
    if (!body) {
      return new BundleExecutor(this, "transaction");
    }

    const queryString = new URLSearchParams(
      options as Record<string, string>
    ).toString();

    return this.fetch<Bundle>(queryString ? `?${queryString}` : "", {
      method: "POST",
      body: JSON.stringify(body),
    });
  }

  public execute<TOperation extends Operation>(
    operation: TOperation
  ): Promise<ExtractOperationResultType<TOperation>>;
  public execute<TOperationResult>(
    operation: OperationParameters
  ): Promise<TOperationResult>;
  public async execute<
    TOperationResult,
    TOperation extends Operation<TOperationResult>
  >(operation: TOperation | OperationParameters): Promise<TOperationResult> {
    const operationParameters = (operation as Operation<TOperationResult>)
      .getParameters
      ? (operation as Operation<TOperationResult>).getParameters()
      : (operation as OperationParameters);
    const prefix = [
      operationParameters.resourceType,
      operationParameters.resourceId,
    ]
      .filter(Boolean)
      .join("/");
    const queryString =
      !operationParameters.affectsState &&
      operationParameters.parameters &&
      Object.values(operationParameters.parameters).length > 0
        ? new URLSearchParams(
            operationParameters.parameters as Record<string, string>
          ).toString()
        : undefined;
    return this.fetch<TOperationResult>(
      `${prefix ? `${prefix}/` : ""}${operationParameters.operation}${
        queryString ? `?${queryString}` : ""
      }`,
      {
        method: operationParameters.affectsState ? "POST" : "GET",
        body:
          operationParameters.affectsState && operationParameters.parameters
            ? JSON.stringify(operationParameters.parameters)
            : undefined,
      }
    );
  }

  public async fetch<T = unknown>(
    resource: string | URL,
    init?: Parameters<typeof fetch>[1]
  ): Promise<T> {
    let targetUrl = typeof resource === "string" ? resource : resource.href;

    if (
      /^(?:[a-z]+:)?\/\//.test(targetUrl) &&
      !targetUrl.startsWith(this.options.baseUrl?.toString())
    ) {
      throw new Error(
        `Unable to fetch ${targetUrl} as it is not part of the baseUrl ${this.options.baseUrl}`
      );
    } else {
      targetUrl = new URL(targetUrl, this.options.baseUrl).toString();
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
      finalInit.headers["Authorization"] =
        typeof this.options.auth === "function"
          ? await this.options.auth(targetUrl, finalInit)
          : this.options.auth;
    }

    const response = await (this.options.fetch || fetch)(targetUrl, finalInit);

    if (!response.ok) {
      // We clone the response to allow the use code to re-read the body if need be.
      const clonedResponse = response.clone();
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
    return responseText ? JSON.parse(responseText) : undefined;
  }
}
