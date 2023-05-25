import { bundleNavigator } from "../r4b";
import { BundleNavigator } from "./bundle-navigator";
import {
  ConcurrencyParameters,
  ConditionalSearchParameters,
  FhirClient,
  FhirClientPatchBody,
  GeneralParameters,
  HistoryParameters,
  normalizePatchBody,
  normalizeSearchParameters,
} from "./fhir-client";
import {
  AnyResource,
  AnyResourceType,
  Bundle,
  ExtractResource,
  Retrieved,
} from "./fhir-types.codegen";

export interface FetchFhirClientOptions {
  baseUrl: string | URL;

  /** The default value for preventConcurrentUpdates. Defaults to false */
  preventConcurrentUpdates?: boolean | null | undefined;

  /**
   * Can be used to set a FHIR version to accept from the server.
   * @see {@link https://hl7.org/fhir/http.html#version-parameter}
   */
  acceptFhirVersion?: string | null | undefined;
}

export class FetchFhirClient implements FhirClient {
  constructor(public options: FetchFhirClientOptions) {}

  public async read<TResourceType extends AnyResourceType>(
    type: TResourceType,
    id: string,
    options?: GeneralParameters | null | undefined
  ): Promise<Retrieved<ExtractResource<TResourceType>> | undefined> {
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
  ): Promise<Retrieved<ExtractResource<TResourceType>> | undefined> {
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
          ConditionalSearchParameters)
      | null
      | undefined
  ): Promise<Retrieved<TResource>> {
    const { preventConcurrentUpdates, ...remainingOptions } = options ?? {};
    const queryString = new URLSearchParams(
      remainingOptions as Record<string, string>
    ).toString();

    const headers: Record<string, string> = {};
    if (
      (preventConcurrentUpdates || this.options.preventConcurrentUpdates) &&
      body.meta?.versionId
    ) {
      headers["If-Match"] = `W/"${body.meta.versionId}"`;
    }

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return (await this.fetch<Retrieved<TResource>>(
      `${body.resourceType}/${body.id}${queryString ? `?${queryString}` : ""}`,
      {
        method: "PUT",
        body: JSON.stringify(body),
        headers,
      }
    ))!;
  }

  public async patch<TResourceType extends AnyResourceType>(
    type: TResourceType,
    id: string,
    body: FhirClientPatchBody<TResourceType>,
    options?:
      | (GeneralParameters &
          ConcurrencyParameters & {
            versionId?: string | null | undefined;
          } & ConditionalSearchParameters)
      | null
      | undefined
  ): Promise<Retrieved<ExtractResource<TResourceType>>> {
    const { preventConcurrentUpdates, versionId, ...remainingOptions } =
      options ?? {};
    const queryString = new URLSearchParams(
      remainingOptions as Record<string, string>
    ).toString();

    const headers: Record<string, string> = {};
    if (
      (preventConcurrentUpdates || this.options.preventConcurrentUpdates) &&
      versionId
    ) {
      headers["If-Match"] = `W/"${versionId}"`;
    }

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return (await this.fetch<
      Retrieved<Retrieved<ExtractResource<TResourceType>>>
    >(`${type}/${id}${queryString ? `?${queryString}` : ""}`, {
      method: "PATCH",
      body: JSON.stringify(normalizePatchBody(type, body)),
      headers,
    }))!;
  }

  public delete(
    resource: Retrieved<AnyResource>,
    options?:
      | (GeneralParameters & ConditionalSearchParameters)
      | null
      | undefined
  ): Promise<void>;
  public delete(
    type: AnyResourceType,
    id: string,
    options?:
      | (GeneralParameters & ConditionalSearchParameters)
      | null
      | undefined
  ): Promise<void>;
  public async delete(
    type: AnyResourceType | Retrieved<AnyResource>,
    id?:
      | string
      | null
      | undefined
      | (GeneralParameters & ConditionalSearchParameters),
    options?:
      | (GeneralParameters & ConditionalSearchParameters)
      | null
      | undefined
  ): Promise<void> {
    if (typeof type !== "string") {
      return this.delete(
        type.resourceType,
        type.id,
        id as
          | null
          | undefined
          | (GeneralParameters & ConditionalSearchParameters)
      );
    }

    const queryString = new URLSearchParams(
      options as Record<string, string>
    ).toString();
    await this.fetch(`${type}/${id}${queryString ? `?${queryString}` : ""}`, {
      method: "DELETE",
    });
  }

  public async history<TResourceType extends AnyResourceType>(
    type?: TResourceType | null | undefined,
    id?: string | null | undefined,
    options?: (GeneralParameters & HistoryParameters) | null | undefined
  ): Promise<Bundle<Retrieved<ExtractResource<TResourceType>>>> {
    const queryString = new URLSearchParams(
      options as Record<string, string>
    ).toString();
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return (await this.fetch<Bundle<Retrieved<ExtractResource<TResourceType>>>>(
      `${[type, id, "_history"].filter(Boolean).join("/")}${
        queryString ? `?${queryString}` : ""
      }`
    ))!;
  }

  public async create<TResource extends AnyResource>(
    body: TResource,
    options?:
      | (GeneralParameters & ConditionalSearchParameters)
      | null
      | undefined
  ): Promise<Retrieved<TResource>> {
    const queryString = new URLSearchParams(
      options as Record<string, string>
    ).toString();

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return (await this.fetch<Retrieved<TResource>>(
      `${body.resourceType}${queryString ? `?${queryString}` : ""}`,
      {
        method: "POST",
        body: JSON.stringify(body),
      }
    ))!;
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
    const queryString = [searchQueryString, optionsQueryString].join("&");
    const response = await this.fetch<
      Bundle<Retrieved<ExtractResource<TResourceType>>>
    >(`${type}${queryString ? `?${queryString}` : ""}`);

    return bundleNavigator(response);
  }

  public async fetch<T = unknown>(
    resource: string | URL,
    init?: Parameters<typeof fetch>[1]
  ): Promise<T | undefined> {
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

    const response = await fetch(targetUrl, {
      ...init,
      headers: {
        Accept: `application/fhir+json${
          this.options.acceptFhirVersion
            ? `; fhirVersion=${this.options.acceptFhirVersion}`
            : ""
        }`,
        "Content-Type": "application/fhir+json",
        ...init?.headers,
      },
    });

    if (response.status === 404) {
      return undefined;
    }

    if (!response.ok) {
      throw new Error(await response.text());
    }

    return (await response.json()) as T;
  }
}
