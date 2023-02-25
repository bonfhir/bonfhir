/* eslint-disable @typescript-eslint/no-unused-vars */
import { ValueRendererProps } from "@bonfhir/ui-components/r4b";
import { Typography, TypographyProps } from "antd";
import { ReactElement } from "react";

export function value(
  props: ValueRendererProps<TypographyProps>
): ReactElement | null {
  const {
    type,
    value,
    options,
    dataTypeAdapter,
    valueSetExpandQuery,
    formatted,
    ...rendererProps
  } = props;
  return <Typography.Text {...rendererProps}>{formatted}</Typography.Text>;
}
