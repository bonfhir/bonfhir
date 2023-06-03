import { Checkbox, Input, InputWrapperProps, Stack } from "@mantine/core";
import { useUncontrolled } from "@mantine/hooks";
import { ReactElement, RefAttributes } from "react";

export interface QuickFilterProps
  extends Omit<
    InputWrapperProps & RefAttributes<HTMLDivElement>,
    "children" | "onChange"
  > {
  value?: string[] | undefined;
  defaultValue?: string[] | undefined;
  onChange?: ((value: string[]) => void) | undefined;
  options: Array<[string, string] | string>;
}

export function QuickFilter(props: QuickFilterProps): ReactElement {
  const {
    label,
    options,
    value,
    defaultValue,
    onChange,
    ...checkboxGroupProps
  } = props;
  const optionValues = options.map((x) => (Array.isArray(x) ? x[0] : x));
  const [internalValue, handleChange] = useUncontrolled({
    value,
    defaultValue: defaultValue ?? optionValues,
    finalValue: optionValues,
    onChange,
  });

  const allChecked =
    optionValues.filter((x) => internalValue.includes(x)).length ===
    optionValues.length;
  const indeterminate = internalValue.length > 0 && !allChecked;

  return (
    <Input.Wrapper label={label} {...checkboxGroupProps}>
      <Stack mt="xs" ml="md">
        <Checkbox
          value="all"
          label="All"
          checked={allChecked}
          indeterminate={indeterminate}
          onChange={(event) => {
            event.currentTarget.checked
              ? handleChange(optionValues)
              : handleChange([]);
          }}
        />
        {options.map((x) => {
          const [value, label] = Array.isArray(x) ? x : [x, x];
          return (
            <Checkbox
              key={value}
              value={value}
              label={label}
              checked={internalValue.includes(value)}
              onChange={(event) => {
                event.currentTarget.checked
                  ? handleChange([...internalValue, value])
                  : handleChange(internalValue.filter((x) => x !== value));
              }}
            />
          );
        })}
      </Stack>
    </Input.Wrapper>
  );
}
