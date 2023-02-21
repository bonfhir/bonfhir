/* eslint-disable @typescript-eslint/no-explicit-any */
import { FhirResource } from "fhir/r4";
import cloneDeep from "lodash/cloneDeep";
import isEqual from "lodash/isEqual";
import isNil from "lodash/isNil";
import { narrative } from "./narratives";
import { isDomainResource } from "./types";

/**
 * Recursively deep-merge 2 resources, taking care of duplicating entry elements using their ids.
 * The narrative is re-generated if need be.
 */
export function merge<TResource extends FhirResource>(
  args: MergeArgs<TResource> & {
    /**
     * Custom `Narrative` generator. If not provided, a default narrative generator is used.
     */
    narrativeGenerator?: typeof narrative | null | undefined;
  }
): MergeResult<TResource> {
  const { narrativeGenerator, ...mergeArgs } = args;
  const result = mergeFhirResources(mergeArgs);

  if (result[1] && result[0] && isDomainResource(result[0])) {
    result[0].text = (narrativeGenerator || narrative)(result[0]);
  }

  return result;
}

/**
 * The result of a merge operation.
 * The first element is the resource, the second is a boolean indicating whether the final resource is different
 * than the original resource.
 */
export type MergeResult<T> = [T, boolean];

export interface HasId {
  id: string;
}

export function isHasId(value: unknown): value is HasId {
  return (
    typeof value === "object" && typeof (value as HasId)["id"] === "string"
  );
}

export interface MergeArgs<T> {
  current: T | null | undefined;
  incoming: T | null | undefined;
}

/**
 * Recursively deep-merge current and incoming, taking care of duplicating entry elements using their ids.
 */
export function mergeFhirResources<T>({
  current,
  incoming,
}: MergeArgs<T>): MergeResult<T> {
  if (isNil(current)) {
    return [cloneDeep(incoming) as T, true];
  }

  const result: MergeResult<T> = [cloneDeep(current), false];

  if (isNil(incoming)) {
    return result;
  }

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  for (const [incomingKey, incomingValue] of Object.entries(incoming!) as [
    keyof T,
    unknown
  ][]) {
    const mergeResult = mergeFhirValues({
      current: current[incomingKey],
      incoming: incomingValue,
    });
    result[1] = result[1] || mergeResult[1];
    result[0][incomingKey] = mergeResult[0] as any;
  }

  return result;
}

export function mergeFhirResourcesArrays<T>({
  current,
  incoming,
}: MergeArgs<T[]>): MergeResult<T[]> {
  if (isNil(current)) {
    return [cloneDeep(incoming) as T[], true];
  }

  const result: MergeResult<T[]> = [cloneDeep(current), false];

  if (isNil(incoming)) {
    return result;
  }

  for (const incomingValue of incoming) {
    const currentEntryIndex = current.findIndex((x) => {
      if (isHasId(incomingValue)) {
        return isHasId(x) && x.id === incomingValue.id;
      }

      return isEqual(x, incomingValue);
    });
    const currentEntry =
      currentEntryIndex >= 0 ? current[currentEntryIndex] : undefined;

    if (!currentEntry) {
      result[1] = true;
      result[0].push(incomingValue);
      continue;
    }

    const mergeResult = mergeFhirValues({
      current: currentEntry,
      incoming: incomingValue,
    });
    result[1] = result[1] || mergeResult[1];
    if (isNil(mergeResult[0])) {
      result[0].splice(currentEntryIndex, 1);
    } else {
      result[0].splice(currentEntryIndex, 1, mergeResult[0]);
    }
  }

  return result;
}

function mergeFhirValues<T = any>({
  current,
  incoming,
}: MergeArgs<T>): MergeResult<T> {
  if (isNil(current)) {
    return [cloneDeep(incoming) as T, true];
  }

  if (Array.isArray(current)) {
    if (!Array.isArray(incoming)) {
      throw new TypeError("Can't merge a non-array value into an array.");
    }

    return mergeFhirResourcesArrays({ current, incoming }) as MergeResult<T>;
  }

  if (typeof current === "object") {
    return mergeFhirResources({
      current: current,
      incoming: incoming,
    });
  }

  return [incoming as T, !isEqual(current, incoming)];
}
