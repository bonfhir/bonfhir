import { InputProps } from "@bonfhir/ui-components/r4b";
import { Input as AntdInput, InputProps as AntdInputProps } from "antd";
import { ReactElement } from "react";

export function input(props: InputProps<AntdInputProps>): ReactElement | null {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { options, field, meta, helpers, ...rendererProps } = props;
  return (
    <AntdInput
      onChange={field.onChange}
      onBlur={field.onBlur}
      value={field.value}
      name={field.name}
      placeholder={options?.placeholder ?? undefined}
      minLength={options?.minLength ?? undefined}
      maxLength={options?.maxLength ?? undefined}
      {...rendererProps}
    />
  );
}
