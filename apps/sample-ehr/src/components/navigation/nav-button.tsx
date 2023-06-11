import { useFhirUIContext } from "@bonfhir/ui/r4b";
import { Button, ButtonProps } from "@mantine/core";
import { ReactElement } from "react";

export interface NavButtonProps extends ButtonProps {
  target: string;
}

export function NavButton(props: NavButtonProps): ReactElement {
  const { onNavigate } = useFhirUIContext();

  const { target, ...buttonProps } = props;

  return (
    <Button
      onClick={() => onNavigate?.({ target, aux: false })}
      onAuxClick={() => {
        onNavigate?.({ target, aux: true });
      }}
      {...buttonProps}
    />
  );
}
