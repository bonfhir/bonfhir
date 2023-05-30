import { v4 as uuid } from "uuid";
import {
  BundleNavigator,
  WithResolvableReferences,
  bundleNavigator,
} from "./bundle-navigator.js";
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
} from "./fhir-client.js";
import {
  AnyResource,
  AnyResourceType,
  Binary,
  Bundle,
  BundleEntry,
  CapabilityStatement,
  ExtractResource,
  Reference,
  Resource,
  Retrieved,
  WithRequired,
  isResource,
} from "./fhir-types.codegen.js";
import {
  ExtractOperationResultType,
  Operation,
  OperationParameters,
} from "./operations.codegen.js";
import { reference } from "./references.codegen.js";

export class BundleExecutor {
  private _entryIndex = 0;
  public request: WithRequired<Bundle, "entry">;
  public response: Bundle | undefined;

  constructor(
    public client: Pick<FhirClient, "batch" | "transaction">,
    type: "batch" | "transaction"
  ) {
    this.request = {
      resourceType: "Bundle",
      type,
      entry: [],
    };
  }

  public read<TResourceType extends AnyResourceType>(
    type: TResourceType,
    id: string,
    options?: GeneralParameters | null | undefined
  ): FutureRequest<Retrieved<ExtractResource<TResourceType>>> {
    const queryString = new URLSearchParams(
      options as Record<string, string>
    ).toString();
    const entry: BundleEntry = {
      request: {
        method: "GET",
        url: `${type}/${id}${queryString ? `?${queryString}` : ""}`,
      },
    };
    this.request.entry.push(entry);
    return this._buildFutureRequest(entry);
  }

  public vread<TResourceType extends AnyResourceType>(
    type: TResourceType,
    id: string,
    vid: string,
    options?: GeneralParameters | null | undefined
  ): FutureRequest<Retrieved<ExtractResource<TResourceType>>> {
    const queryString = new URLSearchParams(
      options as Record<string, string>
    ).toString();
    const entry: BundleEntry = {
      request: {
        method: "GET",
        url: `${type}/${id}/_history/${vid}${
          queryString ? `?${queryString}` : ""
        }`,
      },
    };
    this.request.entry.push(entry);
    return this._buildFutureRequest(entry);
  }

  public update<TResource extends AnyResource>(
    body: TResource,
    options?:
      | (GeneralParameters &
          ConcurrencyParameters &
          ConditionalSearchParameters<TResource["resourceType"]>)
      | null
      | undefined
  ): FutureRequestWithReference<Retrieved<TResource>> {
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

    const fullUrl = `urn:uuid:${uuid()}`;
    const entry: BundleEntry = {
      fullUrl,
      resource: body,
      request: {
        method: "PUT",
        url: `${[body.resourceType, body.id].filter(Boolean).join("/")}${
          queryString ? `?${queryString}` : ""
        }`,
        ifMatch:
          preventConcurrentUpdates && body.meta?.versionId
            ? `W/"${body.meta.versionId}"`
            : undefined,
      },
    };
    this.request.entry.push(entry);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const futureRequest: any = this._buildFutureRequest(entry);
    futureRequest.reference = reference({
      ...body,
      id: fullUrl,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any);
    return futureRequest;
  }

  public patch<TResourceType extends AnyResourceType>(
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
  ): FutureRequest<Retrieved<ExtractResource<TResourceType>>> {
    const { preventConcurrentUpdates, versionId, search, ...remainingOptions } =
      options ?? {};
    const searchQueryString = normalizeSearchParameters(type, search);
    const optionsQueryString = new URLSearchParams(
      remainingOptions as Record<string, string>
    ).toString();
    const queryString = [searchQueryString, optionsQueryString]
      .filter(Boolean)
      .join("&");

    const entry: BundleEntry = {
      resource: <Binary>{
        resourceType: "Binary",
        contentType: "application/json-patch+json",
        data: btoa(JSON.stringify(normalizePatchBody(type, body))),
      },
      request: {
        method: "PATCH",
        url: `${type}/${id}${queryString ? `?${queryString}` : ""}`,
        ifMatch:
          preventConcurrentUpdates && versionId
            ? `W/"${versionId}"`
            : undefined,
      },
    };
    this.request.entry.push(entry);
    return this._buildFutureRequest(entry);
  }

  public delete(
    resource: Retrieved<AnyResource>,
    options?: GeneralParameters | null | undefined
  ): FutureRequest<void>;
  public delete(
    type: AnyResourceType,
    id: string,
    options?: GeneralParameters | null | undefined
  ): FutureRequest<void>;
  public delete(
    type: AnyResourceType | Retrieved<AnyResource>,
    id?: string | null | undefined | GeneralParameters,
    options?: GeneralParameters | null | undefined
  ): FutureRequest<void> {
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

    const entry: BundleEntry = {
      request: {
        method: "DELETE",
        url: `${type}/${id}${queryString ? `?${queryString}` : ""}`,
      },
    };
    this.request.entry.push(entry);
    return this._buildFutureRequest(entry);
  }

  public history<TResource extends AnyResource>(
    resource: Retrieved<TResource>,
    options?: (GeneralParameters & HistoryParameters) | null | undefined
  ): FutureRequest<BundleNavigator<Retrieved<TResource>>>;
  public history<TResourceType extends AnyResourceType>(
    type?: TResourceType | null | undefined,
    id?: string | null | undefined,
    options?: (GeneralParameters & HistoryParameters) | null | undefined
  ): FutureRequest<BundleNavigator<Retrieved<ExtractResource<TResourceType>>>>;
  public history<TResourceType extends AnyResourceType>(
    type?: TResourceType | Retrieved<AnyResource> | null | undefined,
    id?: string | (GeneralParameters & HistoryParameters) | null | undefined,
    options?: (GeneralParameters & HistoryParameters) | null | undefined
  ): FutureRequest<BundleNavigator<Retrieved<ExtractResource<TResourceType>>>> {
    if (type && typeof type !== "string") {
      return this.history(
        type.resourceType,
        type.id,
        id as (GeneralParameters & HistoryParameters) | null | undefined
      ) as FutureRequest<
        BundleNavigator<Retrieved<ExtractResource<TResourceType>>>
      >;
    }

    const queryString = new URLSearchParams(
      options as Record<string, string>
    ).toString();

    const entry: BundleEntry = {
      request: {
        method: "GET",
        url: `${[type, id, "_history"].filter(Boolean).join("/")}${
          queryString ? `?${queryString}` : ""
        }`,
      },
    };
    this.request.entry.push(entry);
    return this._buildFutureRequest(entry, (x) => bundleNavigator(x));
  }

  public create<TResource extends AnyResource>(
    body: TResource,
    options?:
      | (GeneralParameters &
          ConditionalSearchParameters<TResource["resourceType"]>)
      | null
      | undefined
  ): FutureRequestWithReference<Retrieved<TResource>> {
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

    const fullUrl = `urn:uuid:${uuid()}`;
    const entry: BundleEntry = {
      fullUrl,
      resource: body,
      request: {
        method: "POST",
        url: `${body.resourceType}${queryString ? `?${queryString}` : ""}`,
      },
    };
    this.request.entry.push(entry);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const futureRequest: any = this._buildFutureRequest(entry);
    futureRequest.reference = reference({
      ...body,
      id: fullUrl,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any);
    return futureRequest;
  }

  public search<TResourceType extends AnyResourceType>(
    type?: TResourceType | null | undefined,
    parameters?: FhirClientSearchParameters<TResourceType> | null | undefined,
    options?: GeneralParameters | null | undefined
  ): FutureRequest<BundleNavigator<Retrieved<ExtractResource<TResourceType>>>> {
    const searchQueryString = normalizeSearchParameters(type, parameters);
    const optionsQueryString = new URLSearchParams(
      options as Record<string, string>
    ).toString();
    const queryString = [searchQueryString, optionsQueryString]
      .filter(Boolean)
      .join("&");

    const entry: BundleEntry = {
      request: {
        method: "GET",
        url: `${type || ""}${queryString ? `?${queryString}` : ""}`,
      },
    };
    this.request.entry.push(entry);
    return this._buildFutureRequest(entry, (x) => bundleNavigator(x));
  }

  public searchOne<TResourceType extends AnyResourceType>(
    type?: TResourceType | null | undefined,
    parameters?: FhirClientSearchParameters<TResourceType> | null | undefined,
    options?: GeneralParameters | null | undefined
  ): FutureRequest<
    WithResolvableReferences<Retrieved<ExtractResource<TResourceType>>>
  > {
    const searchQueryString = normalizeSearchParameters(type, parameters);
    const optionsQueryString = new URLSearchParams(
      options as Record<string, string>
    ).toString();
    const queryString = [searchQueryString, optionsQueryString]
      .filter(Boolean)
      .join("&");

    const entry: BundleEntry = {
      request: {
        method: "GET",
        url: `${type || ""}${queryString ? `?${queryString}` : ""}`,
      },
    };
    this.request.entry.push(entry);
    return this._buildFutureRequest(entry, (x) =>
      bundleNavigator(x).searchMatchOne()
    );
  }

  public capabilities(
    mode?: "full" | "normative" | "terminology" | null | undefined
  ): FutureRequest<CapabilityStatement> {
    const entry: BundleEntry = {
      request: {
        method: "GET",
        url: `metadata${mode ? `?mode=${mode}` : ""}`,
      },
    };
    this.request.entry.push(entry);
    return this._buildFutureRequest(entry);
  }

  public execute<TOperation extends Operation>(
    operation: TOperation
  ): FutureRequest<ExtractOperationResultType<TOperation>>;
  public execute<TOperationResult>(
    operation: OperationParameters
  ): FutureRequest<TOperationResult>;
  public execute<
    TOperationResult,
    TOperation extends Operation<TOperationResult>
  >(
    operation: TOperation | OperationParameters
  ): FutureRequest<TOperationResult> {
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

    const entry: BundleEntry = {
      resource:
        operationParameters.affectsState && operationParameters.parameters
          ? (operationParameters.parameters as Resource)
          : undefined,
      request: {
        method: operationParameters.affectsState ? "POST" : "GET",
        url: `${prefix ? `${prefix}/` : ""}${operationParameters.operation}${
          queryString ? `?${queryString}` : ""
        }`,
      },
    };
    this.request.entry.push(entry);
    return this._buildFutureRequest(entry);
  }

  /**
   * Send the batch / transaction for execution to the server.
   */
  public async send(): Promise<void> {
    if (this.request.type === "transaction") {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      this.response = await this.client.transaction(this.request as any);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this.response = await this.client.batch(this.request as any);
  }

  private _buildFutureRequest<T>(
    requestEntry: BundleEntry,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    wrapResource?: (resource: any) => any
  ): FutureRequest<T> {
    return {
      executor: this,
      requestEntry,
      entryIndex: this._entryIndex++,
      get sent(): boolean {
        return !!this.executor.response;
      },
      get responseEntry(): BundleEntry | undefined {
        return this.executor.response?.entry?.[this.entryIndex];
      },
      get resource(): T {
        if (!this.executor.response) {
          throw new Error("Request has not been executed yet.");
        }
        if (!this.responseEntry) {
          throw new Error(
            "Server execution error - unable to find the entry in the response bundle."
          );
        }

        if (this.responseEntry.resource) {
          return (
            wrapResource
              ? wrapResource(this.responseEntry.resource)
              : this.responseEntry.resource
          ) as T;
        }

        throw new FhirClientError(
          Number(this.responseEntry.response?.status),
          isResource("OperationOutcome", this.responseEntry.response?.outcome)
            ? this.responseEntry.response?.outcome
            : undefined,
          { responseEntry: this.responseEntry }
        );
      },
    };
  }
}

export interface FutureRequest<T> {
  /**
   * The executor that created this request and is responsible for its execution.
   */
  executor: BundleExecutor;

  /**
   * The bundle entry that will be used to execute this request.
   */
  requestEntry: BundleEntry;

  /**
   * The bundle entry that was returned in the response.
   */
  responseEntry?: BundleEntry | undefined;

  /**
   * The index of the entry in the bundle.
   */
  entryIndex: number;

  /**
   * Whether this request has been sent to the server for execution.
   */
  sent: boolean;

  /**
   * The result of the request, only available if the request has been executed.
   * Throw if the request has not been executed.
   */
  resource: T;
}

export interface FutureRequestWithReference<T extends Resource>
  extends FutureRequest<T> {
  requestEntry: WithRequired<BundleEntry, "fullUrl">;
  /** A temporary reference inside the bundle that can be used inside the batch or transaction. */
  reference: Reference<T>;
}
