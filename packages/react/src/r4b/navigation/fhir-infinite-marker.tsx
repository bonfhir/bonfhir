import { UseInfiniteQueryResult } from "@tanstack/react-query";
import { ReactElement } from "react";
import { useFhirUIContext } from "../context";

export interface FhirInfiniteMarkerProps<TRendererProps = any> {
  query: Pick<UseInfiniteQueryResult, "hasNextPage" | "fetchNextPage">;
  rendererProps?: TRendererProps;
}

/**
 * This is a marker component that can be used to indicate the end of the currently loaded data for an infinite list.
 *
 * To be used in conjunction with `useFhirInfiniteSearch`.
 */
export function FhirInfiniteMarker<TRendererProps = any>(
  props: FhirInfiniteMarkerProps<TRendererProps>,
): ReactElement | null {
  const { applyDefaultProps, render } = useFhirUIContext();
  props = applyDefaultProps("FhirInfiniteMarker", props);

  return render<FhirInfiniteMarkerRendererProps>("FhirInfiniteMarker", props);
}

export type FhirInfiniteMarkerRendererProps<TRendererProps = any> =
  FhirInfiniteMarkerProps<TRendererProps>;

export type FhirInfiniteMarkerRenderer = (
  props: FhirInfiniteMarkerRendererProps,
) => ReactElement | null;
