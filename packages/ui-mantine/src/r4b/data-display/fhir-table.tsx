import { FhirTableRendererProps } from "@bonfhir/ui/r4b";
import {
  LoadingOverlay,
  LoadingOverlayProps,
  Table,
  TableProps,
} from "@mantine/core";
import { ReactElement } from "react";

export function MantineFhirTable(
  props: FhirTableRendererProps<MantineFhirTableProps>
): ReactElement | null {
  return (
    <>
      <LoadingOverlay
        visible={props.loading}
        {...props.rendererProps?.loadingOverlay}
      />
      <Table {...props.rendererProps?.table}></Table>
    </>
  );
}

export interface MantineFhirTableProps {
  loadingOverlay?: LoadingOverlayProps | null | undefined;
  table?: TableProps | null | undefined;
}
