import { FhirPaginationRendererProps } from "@bonfhir/react/r4b";
import {
  Group,
  GroupProps,
  Pagination,
  PaginationRootProps,
} from "@mantine/core";
import { ReactElement } from "react";

export function MantineFhirPagination(
  props: FhirPaginationRendererProps<MantineFhirPaginationProps>,
): ReactElement | null {
  return (
    <Pagination.Root
      classNames={{
        control: props.className,
      }}
      styles={{
        control: props.style,
      }}
      total={props.totalPages}
      value={props.pageNumber}
      disabled={props.totalPages === 0}
      onFirstPage={() => props.onPageChange?.(props.data?.linkUrl("first"), 1)}
      onNextPage={() =>
        props.onPageChange?.(props.data?.linkUrl("next"), props.pageNumber + 1)
      }
      onPreviousPage={() =>
        props.onPageChange?.(
          props.data?.linkUrl("previous"),
          props.pageNumber - 1,
        )
      }
      onLastPage={() =>
        props.onPageChange?.(props.data?.linkUrl("last"), props.totalPages)
      }
      {...props.rendererProps?.root}
    >
      <Group gap="xs" justify="center" {...props.rendererProps?.group}>
        <Pagination.First
          disabled={!props.data?.linkUrl("first") || props.pageNumber <= 1}
        />
        <Pagination.Previous />
        {props.renderedTextTemplate}
        <Pagination.Next disabled={!props.data?.linkUrl("next")} />
        <Pagination.Last disabled={!props.data?.linkUrl("last")} />
      </Group>
    </Pagination.Root>
  );
}

export interface MantineFhirPaginationProps {
  root?: PaginationRootProps | null | undefined;
  group?: GroupProps | null | undefined;
}
