import {
  UseFhirSearchControllerArgs,
  UseFhirSearchControllerValue,
  useFhirSearchController as useFhirSearchControllerBase,
  useURLSearchParamsStateManager,
} from "@bonfhir/react/r4b";
import { usePathname, useRouter, useSearchParams } from "next/navigation.js";

export function useFhirSearchController<
  TSort extends string = string,
  TSearch = unknown,
>(
  scope: string,
  args:
    | Omit<UseFhirSearchControllerArgs<TSort, TSearch>, "stateManager">
    | null
    | undefined,
): UseFhirSearchControllerValue<TSort, TSearch> {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  return useFhirSearchControllerBase<TSort, TSearch>({
    ...args,
    stateManager: useURLSearchParamsStateManager(scope, [
      searchParams as unknown as URLSearchParams,
      (value) => {
        router.push(`${pathname}?${value}`);
      },
    ]),
  });
}

/**
 * @deprecated Use `useFhirSearchController` instead.
 */
export const useFhirSearchControllerNext = useFhirSearchController;
