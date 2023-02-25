import isEqual from "lodash/isEqual";
import { useEffect, useRef } from "react";

export function useMemoCompare<T>(
  next: T,
  compare: (previous: T | undefined, next: T) => boolean = isEqual
) {
  const previousRef = useRef<T | undefined>();
  const previous = previousRef.current;
  const isEqual = compare(previous, next);

  useEffect(() => {
    if (!isEqual) {
      previousRef.current = next;
    }
  });

  return isEqual ? previous : next;
}
