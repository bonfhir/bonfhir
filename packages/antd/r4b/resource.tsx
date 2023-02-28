import { ResourceProps } from "@bonfhir/ui-components/r4b";
import { Select as AntdSelect, SelectProps as AntdSelectProps } from "antd";
import { ReactElement } from "react";

export function resource(
  props: ResourceProps<AntdSelectProps>
): ReactElement | null {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { options, field, meta, helpers, onSearch, items, ...rendererProps } =
    props;
  return (
    <AntdSelect
      showSearch
      placeholder={options?.placeholder ?? undefined}
      onChange={field.onChange}
      onBlur={field.onBlur}
      value={field.value}
      onSearch={onSearch}
      options={items}
      {...rendererProps}
    />
  );
}
