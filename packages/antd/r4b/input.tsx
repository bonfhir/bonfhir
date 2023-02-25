import { InputProps } from "@bonfhir/ui-components/r4b";
import { Input as AntdInput, InputProps as AntdInputProps } from "antd";
import { ReactElement } from "react";
import { useController } from "react-hook-form";

export function input(props: InputProps<AntdInputProps>): ReactElement | null {
  const { name, control, rules, ...rendererProps } = props;
  const { field } = useController({
    name,
    control,
    rules,
  });
  return (
    <AntdInput
      onChange={field.onChange}
      onBlur={field.onBlur}
      value={field.value}
      name={field.name}
      ref={field.ref}
      {...rendererProps}
    />
  );
}
