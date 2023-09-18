import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FhirInputStringRendererProps } from "@bonfhir/react/r5";
import { ReactElement, useId } from "react";

export function ShadcnFhirInputString(
  props: FhirInputStringRendererProps<ShadcnFhirInputStringProps>,
): ReactElement | null {
  const id = useId();
  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor={id}>{props.label}</Label>
      <Input
        type="text"
        id={id}
        placeholder={props.placeholder ?? undefined}
        value={props.value ?? ""}
        disabled={Boolean(props.disabled)}
        onChange={(evt) =>
          props.onChange?.(evt.currentTarget.value || undefined)
        }
      />
    </div>
  );
}

export type ShadcnFhirInputStringProps = Record<string, never>;
