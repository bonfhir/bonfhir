import { FhirClient, GeneralParameters } from "./fhir-client";
import {
  AnyResourceType,
  Bundle,
  BundleEntry,
  ExtractResource,
  Retrieved,
  WithRequired,
} from "./fhir-types.codegen";

export class BundleExecutor {
  private _entryIndex = 0;
  public request: WithRequired<Bundle, "entry">;
  public response: Bundle | undefined;

  constructor(
    public client: Pick<FhirClient, "batch">,
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

  /**
   * Send the batch / transaction for execution to the server.
   */
  public async send(): Promise<void> {
    this.response = await this.client.batch(this.request);
  }

  private _buildFutureRequest<T>(entry: BundleEntry): FutureRequest<T> {
    return {
      executor: this,
      entry,
      entryIndex: this._entryIndex++,
      get sent(): boolean {
        return !!this.executor.response;
      },
      get resource(): T {
        if (!this.executor.response) {
          throw new Error("Request has not been executed yet.");
        }
        if (!this.executor.response.entry?.[this.entryIndex]) {
          throw new Error(
            "Server execution error - unable to find the entry in the response bundle."
          );
        }

        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        return this.executor.response.entry[this.entryIndex]!.resource as T;
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
  entry: BundleEntry;

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
