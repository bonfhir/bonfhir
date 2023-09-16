import {
  UseFhirSearchControllerArgs,
  UseFhirSearchControllerValue,
  useFhirSearchController,
  useURLSearchParamsStateManager,
} from "@bonfhir/react/r5";
import { usePathname, useRouter, useSearchParams } from "next/navigation.js";

export function useFhirSearchControllerNext<
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
  return useFhirSearchController<TSort, TSearch>({
    ...args,
    stateManager: useURLSearchParamsStateManager(scope, [
      searchParams as unknown as URLSearchParams,
      (value) => {
        router.push(`${pathname}?${value}`);
      },
    ]),
  });
}
