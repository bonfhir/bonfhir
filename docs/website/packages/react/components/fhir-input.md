---
title: <FhirInput />
---

The `<FhirInput />` is the equivalent of the [`<FhirValue />`](/packages/react/components/fhir-value), but for forms input components.

It is a [React Controlled component](https://react.dev/learn/sharing-state-between-components#controlled-and-uncontrolled-components) that can take many forms dependening on the Data type it needs to manipulate.

The big benefit is that it works with FHIR types natively. For example:

- date, dateTime et all are formatter properly for FHIR
- there is no empty string - empty strings are always undefined
- terminology is supported, as well as references and resources search
- composite data types are also supported: `Identifier`, `HumanName`, `Address`, `ContactPoint`...

Although it can be use with a simple `useState` as shown below, it should probably be used with a form hook / system for maximum flexibility.

## Example usage

```tsx
const [name, setName] = useState<string | undefined>();
const [identifier, setIdentifier] = useState<Identifier | undefined>();
const [maritalStatus, setMaritalStatus] = useState<
  CodeableConcept | undefined
>();
const [patientRef, setPatientRef] = useState<Reference<Patient> | undefined>();

return (
  <>
    <FhirInput
      type="string"
      value={name}
      onChange={setName}
      label="Name"
      placeholder="Name"
      required
    />
    <FhirInput
      type="Identifier"
      value={identifier}
      onChange={setIdentifier}
      label="Identifier"
      mode="simple"
      required
    />
    <FhirInput
      type="CodeableConcept"
      value={maritalStatus}
      onChange={setMaritalStatus}
      label="Marital Status"
      source="http://hl7.org/fhir/ValueSet/marital-status"
      mode="radio"
    />
    <FhirInput
      type="Reference"
      resourceType="Patient"
      value={patientRef}
      onChange={setPatientRef}
    />
  </>
);
```

Each `type` has its own set of options that you can explore.

## Preview

<iframe src="https://bonfhir.dev/storybook/iframe.html?args=&id=bonfhir-inputs-fhirinput--default&viewMode=story" width="100%" />

<iframe src="https://bonfhir.dev/storybook/iframe.html?args=&id=bonfhir-inputs-fhirinput--codeable-concept&viewMode=story" width="100%" />

<iframe src="https://bonfhir.dev/storybook/iframe.html?args=&id=bonfhir-inputs-fhirinput--identifier&viewMode=story" width="100%" />

<iframe src="https://bonfhir.dev/storybook/iframe.html?args=&id=bonfhir-inputs-fhirinput--reference&viewMode=story" width="100%" />
