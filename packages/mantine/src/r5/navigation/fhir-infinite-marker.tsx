import { FhirInfiniteMarkerRendererProps } from "@bonfhir/react/r5";
import { ReactElement, createElement, useEffect, useId, useRef } from "react";

export function MantineFhirInfiniteMarker(
  props: FhirInfiniteMarkerRendererProps<MantineFhirInfiniteMarkerProps>,
): ReactElement | null {
  const id = useId();
  const observerRef = useRef<IntersectionObserver | undefined>(undefined);

  useEffect(() => {
    const target: HTMLElement | null = document.querySelector(
      `#${CSS.escape(id)}`,
    );
    if (!target) {
      return;
    }
    observerRef.current = new IntersectionObserver((entries) => {
      if (entries.some((e) => e.isIntersecting && props.query.hasNextPage)) {
        props.query.fetchNextPage();
      }
    }, props.rendererProps?.intersectionObserverOptions ?? FHIR_INFINITE_MARKER_INTERSECTION_OBSERVER_DEFAULT_OPTIONS);
    observerRef.current.observe(target);
    return () => {
      observerRef.current?.disconnect();
    };
  }, [id, props.query.hasNextPage, props.query.fetchNextPage]);

  if (props.rendererProps?.component) {
    return createElement(props.rendererProps.component, { ...props, id });
  }

  return <div id={id} />;
}

export interface MantineFhirInfiniteMarkerProps {
  intersectionObserverOptions?: IntersectionObserverInit;
  component: React.ElementType;
}

export const FHIR_INFINITE_MARKER_INTERSECTION_OBSERVER_DEFAULT_OPTIONS: IntersectionObserverInit =
  {
    root: null,
    rootMargin: "0px",
    threshold: 1,
  };
