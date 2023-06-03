import { Checkbox, CheckboxGroupProps, Stack } from "@mantine/core";
import { ReactElement } from "react";

export interface QuickFilterProps extends Omit<CheckboxGroupProps, "children"> {
  label?: string | undefined;
  options: Array<[string, string] | string>;
}

export function QuickFilter(props: QuickFilterProps): ReactElement {
  const { label, options, ...checkboxGroupProps } = props;

  return (
    <Checkbox.Group
      defaultValue={["all"]}
      label={label}
      {...checkboxGroupProps}
    >
      <Stack mt="xs" ml="md">
        <Checkbox value="all" label="All" />
        {options.map((x) => {
          const [value, label] = Array.isArray(x) ? x : [x, x];
          return <Checkbox key={value} value={value} label={label} />;
        })}
      </Stack>
    </Checkbox.Group>
  );
}
