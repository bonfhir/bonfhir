import { codeableConcept } from "@bonfhir/core/r5";
import { useFhirForm } from "@bonfhir/ui-mantine/r5";
import { FhirInput } from "@bonfhir/ui/r5";
import { Box, Button, Group, Stack } from "@mantine/core";
import { Meta } from "@storybook/react";
import { buildArgs } from "../helpers";

/**
 * Renders [FHIR data types](https://hl7.org/fhir/datatypes.html) as inputs.
 */
const meta = {
  title: "Inputs/FhirInput",
  component: FhirInput,
  tags: ["autodocs"],
  args: {
    label: "Label",
  },
  argTypes: {
    type: {
      control: "select",
      description:
        "The FHIR type to render. Will influence the value type and/or the options available.",
      options: [
        "boolean",
        "ContactPoint",
        "dateTime",
        "instant",
        "date",
        "HumanName",
        "Identifier",
        "markdown",
        "decimal",
        "integer",
        "integer64",
        "positiveInt",
        "unsignedInt",
        "Resource",
        "Reference",
        "string",
        "canonical",
        "id",
        "oid",
        "uri",
        "url",
        "uuid",
        "code",
        "Coding",
        "CodeableConcept",
        "time",
      ],
    },
    label: {
      control: "text",
      description: "The label to display above the input.",
    },
    description: {
      control: "text",
      description: "A description for the input.",
    },
    error: {
      control: "text",
      description: "An error message to display below the input.",
    },
    required: {
      control: "boolean",
      description: "Indicate that the input is required",
    },
    disabled: {
      control: "boolean",
      description: "Disable the input",
    },
  } as any,
  render: (props: any) => {
    const form = useFhirForm();
    return (
      <form
        onSubmit={form.onSubmit((values) => {
          const value = JSON.stringify(values.value, undefined, 2);
          alert(value);
          console.log("value", value);
        })}
      >
        <Stack>
          <Box maw={800}>
            <FhirInput {...buildArgs(props)} {...form.getInputProps("value")} />
          </Box>
          <Group mt="md">
            <Button type="submit" compact variant="outline">
              Submit
            </Button>
            <Button
              compact
              variant="outline"
              color="red"
              onClick={() => form.reset()}
            >
              Reset
            </Button>
          </Group>
        </Stack>
      </form>
    );
  },
} satisfies Meta<typeof FhirInput>;

export default meta;

export const Default = {
  args: {
    type: "string",
  },
};

/**
 * Render FHIR [boolean]((https://hl7.org/fhir/datatypes.html#boolean) input.
 */
export const Boolean = {
  args: {
    type: "boolean",
  },
  argTypes: {
    mode: {
      control: "select",
      options: ["switch", "checkbox"],
    },
  },
};

/**
 * Render FHIR [canonical]((https://hl7.org/fhir/datatypes.html#canonical) input.
 */
export const Canonical = {
  args: {
    type: "canonical",
  },
  argTypes: {
    placeholder: {
      control: "text",
    },
  },
};

/**
 * Render FHIR [code](https://hl7.org/fhir/datatypes.html#code) input.
 */
export const Code = {
  args: {
    type: "code",
    source: "http://hl7.org/fhir/ValueSet/contact-point-use",
    mode: "select",
  },
  argTypes: {
    placeholder: {
      control: "text",
    },
    mode: {
      control: "select",
      options: ["select", "radio", "segmented"],
    },
    source: {
      control: "object",
      description:
        "Source can either be an array of expanded values, a query result, or the URL of a ValueSet",
    },
  },
};

/**
 * Render FHIR [CodeableConcept](https://hl7.org/fhir/datatypes.html#CodeableConcept) input.
 */
export const CodeableConcept = {
  args: {
    type: "CodeableConcept",
    source: "http://hl7.org/fhir/ValueSet/contact-point-use",
    mode: "select",
  },
  argTypes: {
    placeholder: {
      control: "text",
    },
    mode: {
      control: "select",
      options: ["select", "radio", "segmented"],
    },
    source: {
      control: "object",
      description:
        "Source can either be an array of expanded values, a query result, or the URL of a ValueSet",
    },
  },
};

/**
 * Render FHIR [Coding](https://hl7.org/fhir/datatypes.html#Coding) input.
 */
export const Coding = {
  args: {
    type: "Coding",
    source: "http://hl7.org/fhir/ValueSet/contact-point-use",
    mode: "select",
  },
  argTypes: {
    placeholder: {
      control: "text",
    },
    mode: {
      control: "select",
      options: ["select", "radio", "segmented"],
    },
    source: {
      control: "object",
      description:
        "Source can either be an array of expanded values, a query result, or the URL of a ValueSet",
    },
  },
};

/**
 * Render FHIR [ContactPoint]((https://hl7.org/fhir/datatypes.html#ContactPoint) input.
 */
export const ContactPoint = {
  args: {
    type: "ContactPoint",
  },
  argTypes: {
    mode: {
      control: "select",
      options: ["full", "simple"],
    },
  },
};

/**
 * Render FHIR [dateTime]((https://hl7.org/fhir/datatypes.html#dateTime) input.
 */
export const DateTime = {
  args: {
    type: "dateTime",
  },
  argTypes: {
    placeholder: {
      control: "text",
    },
  },
};

/**
 * Render FHIR [date]((https://hl7.org/fhir/datatypes.html#date) input.
 */
export const Date = {
  args: {
    type: "date",
  },
  argTypes: {
    placeholder: {
      control: "text",
    },
  },
};

/**
 * Render FHIR [decimal]((https://hl7.org/fhir/datatypes.html#decimal) input.
 */
export const Decimal = {
  args: {
    type: "decimal",
  },
  argTypes: {
    min: {
      control: "number",
    },
    max: {
      control: "number",
    },
    step: {
      control: "number",
    },
    precision: {
      control: "number",
    },
  },
};

/**
 * Render FHIR [HumanName]((https://hl7.org/fhir/datatypes.html#HumanName) input.
 */
export const HumanName = {
  args: {
    type: "HumanName",
  },
  argTypes: {
    mode: {
      control: "select",
      options: ["full", "simple"],
    },
    defaultUse: {
      control: "text",
    },
    separator: {
      control: "text",
      description:
        "The separator to use to separate values on repeating fields.",
    },
  },
};

/**
 * Render FHIR [id]((https://hl7.org/fhir/datatypes.html#id) input.
 */
export const Id = {
  args: {
    type: "id",
  },
  argTypes: {
    placeholder: {
      control: "text",
    },
  },
};

/**
 * Render FHIR [Identifier]((https://hl7.org/fhir/datatypes.html#Identifier) input.
 */
export const Identifier = {
  args: {
    type: "Identifier",
    identifiers: [
      {
        system: "http://hl7.org/fhir/sid/us-ssn",
        label: "SSN",
        type: codeableConcept({
          code: "SS",
          display: "Social Security number",
          system: "http://terminology.hl7.org/CodeSystem/v2-0203",
        }),
        processValue: (value: any) => value.replaceAll(/\W/g, ""),
      },
      {
        system: "http://hl7.org/fhir/sid/us-mbi",
        label: "MBI",
        type: codeableConcept({
          code: "MC",
          display: "Patient's Medicare number",
          system: "http://terminology.hl7.org/CodeSystem/v2-0203",
        }),
        processValue: (value: any) => value.replaceAll(/\W/g, ""),
      },
    ],
  },
  argTypes: {
    mode: {
      control: "select",
      options: ["full", "simple"],
    },
    defaultUse: {
      control: "text",
    },
  },
};

/**
 * Render FHIR [instant]((https://hl7.org/fhir/datatypes.html#instant) input.
 */
export const Instant = {
  args: {
    type: "instant",
  },
  argTypes: {
    placeholder: {
      control: "text",
    },
  },
};

/**
 * Render FHIR [integer]((https://hl7.org/fhir/datatypes.html#integer) input.
 */
export const Integer = {
  args: {
    type: "integer",
  },
  argTypes: {
    min: {
      control: "number",
    },
    max: {
      control: "number",
    },
    step: {
      control: "number",
    },
  },
};

/**
 * Render FHIR [markdown]((https://hl7.org/fhir/datatypes.html#markdown) input.
 */
export const Markdown = {
  args: {
    type: "markdown",
  },
  argTypes: {
    placeholder: {
      control: "text",
    },
  },
};

/**
 * Render FHIR [oid]((https://hl7.org/fhir/datatypes.html#oid) input.
 */
export const Oid = {
  args: {
    type: "oid",
  },
  argTypes: {
    placeholder: {
      control: "text",
    },
  },
};

/**
 * Render FHIR [positiveInt]((https://hl7.org/fhir/datatypes.html#positiveInt) input.
 */
export const PositiveInt = {
  args: {
    type: "positiveInt",
  },
  argTypes: {
    min: {
      control: "number",
    },
    max: {
      control: "number",
    },
    step: {
      control: "number",
    },
  },
};

/**
 * Render FHIR [Reference](https://hl7.org/fhir/references.html#Reference) input.
 */
export const Reference = {
  args: {
    type: "Reference",
    resourceType: "Organization",
  },
  argTypes: {
    resourceType: {
      control: "text",
    },
  },
};

/**
 * Render FHIR [Resources](https://hl7.org/fhir/resourcelist.html) input.
 */
export const Resource = {
  args: {
    type: "Resource",
    resourceType: "Organization",
  },
  argTypes: {
    resourceType: {
      control: "text",
    },
  },
};

/**
 * Render FHIR [string]((https://hl7.org/fhir/datatypes.html#string) input.
 */
export const String = {
  args: {
    type: "string",
  },
  argTypes: {
    placeholder: {
      control: "text",
    },
  },
};

/**
 * Render FHIR [time]((https://hl7.org/fhir/datatypes.html#time) input.
 */
export const Time = {
  args: {
    type: "time",
  },
  argTypes: {
    placeholder: {
      control: "text",
    },
  },
};

/**
 * Render FHIR [unsignedInt]((https://hl7.org/fhir/datatypes.html#unsignedInt) input.
 */
export const UnsignedInt = {
  args: {
    type: "unsignedInt",
  },
  argTypes: {
    min: {
      control: "number",
    },
    max: {
      control: "number",
    },
    step: {
      control: "number",
    },
  },
};

/**
 * Render FHIR [uri]((https://hl7.org/fhir/datatypes.html#uri) input.
 */
export const Uri = {
  args: {
    type: "uri",
  },
  argTypes: {
    placeholder: {
      control: "text",
    },
  },
};

/**
 * Render FHIR [url]((https://hl7.org/fhir/datatypes.html#url) input.
 */
export const Url = {
  args: {
    type: "url",
  },
  argTypes: {
    placeholder: {
      control: "text",
    },
  },
};
/**
 * Render FHIR [uuid]((https://hl7.org/fhir/datatypes.html#uuid) input.
 */
export const Uuid = {
  args: {
    type: "uuid",
  },
  argTypes: {
    placeholder: {
      control: "text",
    },
  },
};
