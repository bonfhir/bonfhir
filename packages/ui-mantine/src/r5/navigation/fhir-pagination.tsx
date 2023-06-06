import { FhirPaginationRendererProps } from "@bonfhir/ui/r5";
import {
  Group,
  GroupProps,
  Pagination,
  PaginationRootProps,
} from "@mantine/core";
import { ReactElement } from "react";

export function MantineFhirPagination(
  props: FhirPaginationRendererProps<MantineFhirPaginationProps>
): ReactElement | null {
  return (
    <Pagination.Root
      total={props.totalPages}
      value={props.pageNumber}
      onFirstPage={() => props.onPageChange?.(props.data?.linkUrl("first"), 1)}
      onNextPage={() =>
        props.onPageChange?.(props.data?.linkUrl("next"), props.pageNumber + 1)
      }
      onPreviousPage={() =>
        props.onPageChange?.(
          props.data?.linkUrl("previous"),
          props.pageNumber - 1
        )
      }
      onLastPage={() =>
        props.onPageChange?.(props.data?.linkUrl("last"), props.totalPages)
      }
      {...props.rendererProps?.root}
    >
      <Group spacing="xs" position="center" {...props.rendererProps?.group}>
        <Pagination.First />
        <Pagination.Previous />
        {props.renderedTextTemplate}
        <Pagination.Next />
        <Pagination.Last />
      </Group>
    </Pagination.Root>
  );
}

export interface MantineFhirPaginationProps {
  root?: PaginationRootProps | null | undefined;
  group?: GroupProps | null | undefined;
}
