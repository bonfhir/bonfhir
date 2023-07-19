/* eslint-disable unicorn/no-null */
import { codeableConcept, now, today } from "@bonfhir/core/r5";
import { FhirValue } from "@bonfhir/ui/r5";
import { Meta } from "@storybook/react";
import { buildArgs } from "../helpers";

/**
 * Renders [FHIR data types](https://hl7.org/fhir/datatypes.html) as string using the core formatter.
 */
const meta = {
  title: "Data Display/FhirValue",
  component: FhirValue,
  tags: ["autodocs"],
  argTypes: {
    type: {
      control: "select",
      description:
        "The FHIR type to render. Will influence the value type and/or the options available.",
      options: [
        "Address",
        "Age",
        "boolean",
        "canonical",
        "code",
        "ContactPoint",
        "Count",
        "date",
        "dateTime",
        "decimal",
        "Distance",
        "Duration",
        "HumanName",
        "id",
        "Identifier",
        "instant",
        "integer",
        "markdown",
        "Money",
        "oid",
        "Period",
        "positiveInt",
        "Quantity",
        "Range",
        "Ratio",
        "Reference",
        "SampledData",
        "string",
        "time",
        "Timing",
        "unsignedInt",
        "uri",
        "url",
        "uuid",
      ],
    },
    options: {
      table: {
        disable: true,
      },
    },
    "options.default": {
      control: "text",
      description: "Default value to display when value is empty or undefined",
    },
    "options.decorator": {
      control: "text",
      description:
        "If the result of the formatter is truthy, this will decorate the result. Use {} as the placeholder for the result of the formatter.",
    },
    "rendererProps.text.fz": {
      control: "select",
      description: "[Mantine] The text size",
      options: ["xs", "sm", "md", "lg", "xl"],
    },
    "rendererProps.text.fw": {
      control: "number",
      description: "[Mantine] The text weight",
    },
    "rendererProps.text.c": {
      control: "text",
      description: "[Mantine] The text color",
    },
    "rendererProps.text.tt": {
      control: "select",
      options: ["capitalize", "uppercase", "lowercase"],
      description: "[Mantine] The text transform",
    },
  } as any,
  render: (props: any) => {
    return <FhirValue {...buildArgs(props)} />;
  },
} satisfies Meta<typeof FhirValue>;

export default meta;

export const Default = {
  args: {
    type: "string",
    value: "Hello, world!",
  },
};

/**
 * Render a FHIR [Address](https://hl7.org/fhir/datatypes.html#Address)
 */
export const Address = {
  args: {
    type: "Address",
    value: [
      {
        use: "home",
        line: ["123 Main St"],
        city: "Anytown",
        country: "US",
        postalCode: "12345",
        state: "CA",
      },
    ],
  },
  argTypes: {
    value: {
      control: "object",
      description: "An address or a list of addresses",
    },
    "options.defaultCountry": {
      control: "text",
      description:
        "Specify the default country to use for addresses that do not have the country info.",
    },
    "options.includeCountry": {
      control: "boolean",
      description:
        "Whether the country should be happened at the end of the address or not. Defaults to false.",
    },
    "options.preferText": {
      control: "boolean",
      description:
        "True to use text if present, false to never use text - defaults to true",
    },
    "options.style": {
      control: "select",
      description: "The style of address to render",
      options: ["standard", "full", "extended"],
    },
    "options.useFilterOrder": {
      control: "object",
      description:
        "When using a list of values: the sort order for the use attribute and the filter to select only specific values. Defaults to [home, work, billing, temp, old, undefined]",
    },
    "options.typeValueSetExpansions": {
      control: "object",
      description: "Expansions to use for the type code",
    },
    "options.useValueSetExpansions": {
      control: "object",
      description: "Expansions to use for the use code",
    },
    "options.lineSeparator": {
      control: "text",
      description:
        'The separator to use to join formatted line addresses. Defaults to ", "',
    },
    "options.listFormatOptions": {
      control: "object",
      description:
        "When using a list of values, the options to pass to the Intl listFormat method.",
    },
    "options.max": {
      control: "number",
      description:
        "When using a list of values, format only the first n (after sorting). Default to Infinity to show all values.",
    },
  },
};

/**
 * Render FHIR [Age]((https://hl7.org/fhir/datatypes.html#Age)
 */
export const Age = {
  args: {
    type: "Age",
    value: {
      code: "a",
      unit: "years",
      system: "http://unitsofmeasure.org",
      value: 10,
    },
  },
  argTypes: {
    "options.expansions": {
      control: "object",
      description: "The ValueSet expansion to use for the code",
    },
    "options.notation": {
      control: "select",
      options: [
        "standard",
        "scientific",
        "engineering",
        "compact-short",
        "compact-long",
        undefined,
      ],
      description: "The notation to use for the value",
    },
    "options.separator": {
      control: "text",
      description: 'Between the number of the unit. Default to " "',
    },
  },
};

/**
 * Render FHIR [boolean]((https://hl7.org/fhir/datatypes.html#boolean)
 */
export const Boolean = {
  args: {
    type: "boolean",
    value: true,
  },
  argTypes: {
    "options.labels.true": {
      control: "text",
      description: "The label to use for true",
    },
    "options.labels.false": {
      control: "text",
      description: "The label to use for false",
    },
    "options.labels.nil": {
      control: "text",
      description: "The label to use for null or undefined",
    },
  },
};

/**
 * Render FHIR [canonical]((https://hl7.org/fhir/datatypes.html#canonical)
 */
export const Canonical = {
  args: {
    type: "canonical",
    value: "http://acme.org",
  },
};

/**
 * Render FHIR [code](https://hl7.org/fhir/datatypes.html#code)
 */
export const Code = {
  args: {
    type: "code",
    value: "female",
  },
  argTypes: {
    "options.expansions": {
      control: "object",
      description: "The ValueSet expansion to use for the code",
    },
  },
};

/**
 * Render FHIR [CodeableConcept](https://hl7.org/fhir/datatypes.html#CodeableConcept)
 */
export const CodeableConcept = {
  args: {
    type: "CodeableConcept",
    value: codeableConcept({
      code: "I",
      system: "http://terminology.hl7.org/CodeSystem/v2-0131",
      display: "Federal Agency",
    }),
  },
  argTypes: {
    "options.expansions": {
      control: "object",
      description: "The ValueSet expansion to use for the code",
    },
    "options.style": {
      control: "select",
      options: ["code", "display", "code-display", "display-code", undefined],
    },
    "options.includeSystem": {
      control: "boolean",
    },
    "options.preferText": {
      control: "boolean",
      description:
        "True to use text if present, false to never use text - defaults to true",
    },
    "options.listFormatOptions": {
      control: "object",
      description:
        "WThe options to pass to the Intl listFormat method when there are multiple codings.",
    },
  },
};

/**
 * Render FHIR [Coding](https://hl7.org/fhir/datatypes.html#Coding)
 */
export const Coding = {
  args: {
    type: "Coding",
    value: {
      system: "http://loinc.org",
      code: "15074-8",
      display: "Glucose [Moles/volume] in Blood",
    },
  },
  argTypes: {
    "options.expansions": {
      control: "object",
      description: "The ValueSet expansion to use for the code",
    },
    "options.style": {
      control: "select",
      options: ["code", "display", "code-display", "display-code", undefined],
    },
    "options.includeSystem": {
      control: "boolean",
    },
  },
};

/**
 * Render FHIR [ContactPoint](https://hl7.org/fhir/datatypes.html#ContactPoint)
 */
export const ContactPoint = {
  args: {
    type: "ContactPoint",
    value: [
      {
        system: "phone",
        value: "(03) 5555 6473",
        use: "work",
        rank: 1,
      },
      {
        system: "phone",
        value: "(03) 3410 5613",
        use: "mobile",
        rank: 2,
      },
    ],
  },
  argTypes: {
    "options.style": {
      control: "select",
      options: ["full", "long", "medium", "short", undefined],
    },
    "options.lineSeparator": {
      control: "text",
      description:
        'The separator to use to join formatted contact point. Defaults to ", "',
    },
    "options.max": {
      control: "number",
      description:
        "When using a list of values, format only the first n (after sorting). Default to Infinity to show all values.",
    },
    "options.useFilterOrder": {
      control: "object",
      description:
        "When using a list of values: the sort order for the use attribute and the filter to select only specific values. Defaults to  [home, work, temp, old, mobile, undefined]",
    },
    "options.listFormatOptions": {
      control: "object",
      description:
        "When using a list of values, the options to pass to the Intl listFormat method.",
    },
    "options.systemExpansions": {
      control: "object",
      description: "The ValueSet expansion to use for the system",
    },
    "options.useExpansions": {
      control: "object",
      description: "The ValueSet expansion to use for the use",
    },
  },
};

/**
 * Render FHIR [Count]((https://hl7.org/fhir/datatypes.html#Count)
 */
export const Count = {
  args: {
    type: "Count",
    value: {
      value: 10,
    },
  },
  argTypes: {
    "options.expansions": {
      control: "object",
      description: "The ValueSet expansion to use for the code",
    },
    "options.notation": {
      control: "select",
      options: [
        "standard",
        "scientific",
        "engineering",
        "compact-short",
        "compact-long",
        undefined,
      ],
      description: "The notation to use for the value",
    },
    "options.separator": {
      control: "text",
      description: 'Between the number of the unit. Default to " "',
    },
  },
};

/**
 * Render FHIR [dateTime]((https://hl7.org/fhir/datatypes.html#dateTime)
 */
export const DateTime = {
  args: {
    type: "dateTime",
    value: now(),
  },
  argTypes: {
    "options.dateStyle": {
      control: "select",
      options: ["full", "long", "medium", "short", "relative", null, undefined],
    },
    "options.timeStyle": {
      control: "select",
      options: ["full", "long", "medium", "short", null, undefined],
    },
    "options.relativeStyle": {
      control: "select",
      options: ["long", "short", null, undefined],
    },
    "options.relativeTo": {
      control: "text",
      description:
        "From when the relative computation happen - defaults to now.",
    },
  },
};

/**
 * Render FHIR [date]((https://hl7.org/fhir/datatypes.html#date)
 */
export const Date = {
  args: {
    type: "date",
    value: today(),
  },
  argTypes: {
    "options.dateStyle": {
      control: "select",
      options: ["full", "long", "medium", "short", "relative", null, undefined],
    },
    "options.relativeStyle": {
      control: "select",
      options: ["long", "short", null, undefined],
    },
    "options.relativeTo": {
      control: "text",
      description:
        "From when the relative computation happen - defaults to now.",
    },
  },
};

/**
 * Render FHIR [decimal]((https://hl7.org/fhir/datatypes.html#decimal)
 */
export const Decimal = {
  args: {
    type: "decimal",
    value: Math.PI,
  },
  argTypes: {
    "options.notation": {
      control: "select",
      options: [
        "standard",
        "scientific",
        "engineering",
        "compact-short",
        "compact-long",
        undefined,
      ],
      description: "The notation to use for the value",
    },
  },
};

/**
 * Render FHIR [Distance]((https://hl7.org/fhir/datatypes.html#Distance)
 */
export const Distance = {
  args: {
    type: "Distance",
    value: {
      code: "m",
      unit: "m",
      system: "http://unitsofmeasure.org",
      value: 10,
    },
  },
  argTypes: {
    "options.expansions": {
      control: "object",
      description: "The ValueSet expansion to use for the code",
    },
    "options.notation": {
      control: "select",
      options: [
        "standard",
        "scientific",
        "engineering",
        "compact-short",
        "compact-long",
        undefined,
      ],
      description: "The notation to use for the value",
    },
    "options.separator": {
      control: "text",
      description: 'Between the number of the unit. Default to " "',
    },
  },
};

/**
 * Render FHIR [Duration]((https://hl7.org/fhir/datatypes.html#Duration)
 */
export const Duration = {
  args: {
    type: "Duration",
    value: {
      code: "min",
      unit: "min",
      system: "http://unitsofmeasure.org",
      value: 15,
    },
  },
  argTypes: {
    "options.expansions": {
      control: "object",
      description: "The ValueSet expansion to use for the code",
    },
    "options.notation": {
      control: "select",
      options: [
        "standard",
        "scientific",
        "engineering",
        "compact-short",
        "compact-long",
        undefined,
      ],
      description: "The notation to use for the value",
    },
    "options.separator": {
      control: "text",
      description: 'Between the number of the unit. Default to " "',
    },
  },
};

/**
 * Render FHIR [HumanName]((https://hl7.org/fhir/datatypes.html#HumanName)
 */
export const HumanName = {
  args: {
    type: "HumanName",
    value: [
      {
        use: "official",
        family: "Chalmers",
        given: ["Peter", "James"],
      },
      {
        use: "usual",
        given: ["Jim"],
      },
      {
        use: "maiden",
        family: "Windsor",
        given: ["Peter", "James"],
        period: {
          end: "2002",
        },
      },
    ],
  },
  argTypes: {
    "options.style": {
      control: "select",
      options: [
        "full",
        "long",
        "medium",
        "standard",
        "short",
        "shorter",
        undefined,
      ],
    },
    "options.preferText": {
      control: "boolean",
      description:
        "True to use text if present, false to never use text - defaults to true",
    },
    "options.includeUse": {
      control: "boolean",
      description:
        "Whether we should include the use or not. Defaults to false",
    },
    "options.useFilterOrder": {
      control: "object",
      description:
        "When using a list of values: the sort order for the use attribute and the filter to select only specific values. Defaults to [usual, official, temp, nickname, anonymous, old, maiden, undefined]",
    },
    "options.max": {
      control: "number",
      description:
        "When using a list of values, format only the first n (after sorting). Default to Infinity to show all values.",
    },
    "options.listFormatOptions": {
      control: "object",
      description:
        "When using a list of values, the options to pass to the Intl listFormat method.",
    },
    "options.expansions": {
      control: "object",
      description: "Expansions to use for the type use",
    },
  },
};

/**
 * Render FHIR [id]((https://hl7.org/fhir/datatypes.html#id)
 */
export const Id = {
  args: {
    type: "id",
    value: "f84a844c-888b-4330-97e6-a891ef285577",
  },
};

/**
 * Render FHIR [Identifier]((https://hl7.org/fhir/datatypes.html#Identifier)
 */
export const Identifier = {
  args: {
    type: "Identifier",
    value: [
      {
        system: "http://hl7.org/fhir/sid/us-ssn",
        type: {
          coding: [
            {
              code: "SS",
              display: "Social Security Number",
              system: "http://terminology.hl7.org/CodeSystem/v2-0203",
            },
          ],
          text: "Social Security Number",
        },
        value: "999-81-1155",
      },
      {
        system: "https://github.com/synthetichealth/synthea",
        value: "91e630a6-05e9-4ada-9a8e-7d2d1eb22d82",
      },
      {
        system: "http://hospital.smarthealthit.org",
        type: {
          coding: [
            {
              code: "MR",
              display: "Medical Record Number",
              system: "http://terminology.hl7.org/CodeSystem/v2-0203",
            },
          ],
          text: "Medical Record Number",
        },
        value: "91e630a6-05e9-4ada-9a8e-7d2d1eb22d82",
      },
      {
        system: "urn:oid:2.16.840.1.113883.4.3.25",
        type: {
          coding: [
            {
              code: "DL",
              display: "Driver's License",
              system: "http://terminology.hl7.org/CodeSystem/v2-0203",
            },
          ],
          text: "Driver's License",
        },
        value: "S99941325",
      },
      {
        system:
          "http://standardhealthrecord.org/fhir/StructureDefinition/passportNumber",
        type: {
          coding: [
            {
              code: "PPN",
              display: "Passport Number",
              system: "http://terminology.hl7.org/CodeSystem/v2-0203",
            },
          ],
          text: "Passport Number",
        },
        value: "X72769294X",
      },
    ],
  },
  argTypes: {
    "options.style": {
      control: "select",
      options: ["full", "long", "medium", "short", "value", undefined],
    },
    "options.systemsLabels": {
      control: "object",
      description: "A dictionary of system as key, and system labels as value",
    },
    "options.useFilterOrder": {
      control: "object",
      description:
        "When using a list of values: the sort order for the use attribute and the filter to select only specific values. Defaults to [usual, official, temp, secondary, old, undefined]",
    },
    "options.systemFilterOrder": {
      control: "object",
      description:
        "When using a list of values: the sort order for the use attribute and the filter to select only specific values. No default (no order and none filtered out)",
    },
    "options.max": {
      control: "number",
      description:
        "When using a list of values, format only the first n (after sorting). Default to Infinity to show all values.",
    },
    "options.listFormatOptions": {
      control: "object",
      description:
        "When using a list of values, the options to pass to the Intl listFormat method.",
    },
    "options.expansions": {
      control: "object",
      description: "Expansions to use for the type use",
    },
  },
};

/**
 * Render FHIR [instant]((https://hl7.org/fhir/datatypes.html#instant)
 */
export const Instant = {
  args: {
    type: "instant",
    value: now(),
  },
  argTypes: {
    "options.dateStyle": {
      control: "select",
      options: ["full", "long", "medium", "short", "relative", null, undefined],
    },
    "options.timeStyle": {
      control: "select",
      options: ["full", "long", "medium", "short", null, undefined],
    },
    "options.relativeStyle": {
      control: "select",
      options: ["long", "short", null, undefined],
    },
    "options.relativeTo": {
      control: "text",
      description:
        "From when the relative computation happen - defaults to now.",
    },
  },
};

/**
 * Render FHIR [integer]((https://hl7.org/fhir/datatypes.html#integer)
 */
export const Integer = {
  args: {
    type: "decimal",
    value: 42,
  },
  argTypes: {
    "options.notation": {
      control: "select",
      options: [
        "standard",
        "scientific",
        "engineering",
        "compact-short",
        "compact-long",
        undefined,
      ],
      description: "The notation to use for the value",
    },
  },
};

/**
 * Render FHIR [integer64]((https://hl7.org/fhir/datatypes.html#integer64)
 */
export const Integer64 = {
  args: {
    type: "integer64",
    value: "42",
  },
  argTypes: {
    "options.notation": {
      control: "select",
      options: [
        "standard",
        "scientific",
        "engineering",
        "compact-short",
        "compact-long",
        undefined,
      ],
      description: "The notation to use for the value",
    },
  },
};

/**
 * Render FHIR [markdown]((https://hl7.org/fhir/datatypes.html#markdown)
 */
export const Markdown = {
  args: {
    type: "markdown",
    value: `
    ---
__Advertisement :)__

- __[pica](https://nodeca.github.io/pica/demo/)__ - high quality and fast image
  resize in browser.
- __[babelfish](https://github.com/nodeca/babelfish/)__ - developer friendly
  i18n with plurals support and easy syntax.

You will like those projects!

---

# h1 Heading 8-)
## h2 Heading
### h3 Heading
#### h4 Heading
##### h5 Heading
###### h6 Heading


## Horizontal Rules

___

---

***


## Typographic replacements

Enable typographer option to see result.

(c) (C) (r) (R) (tm) (TM) (p) (P) +-

test.. test... test..... test?..... test!....

!!!!!! ???? ,,  -- ---

"Smartypants, double quotes" and 'single quotes'


## Emphasis

**This is bold text**

__This is bold text__

*This is italic text*

_This is italic text_

~~Strikethrough~~


## Blockquotes


> Blockquotes can also be nested...
>> ...by using additional greater-than signs right next to each other...
> > > ...or with spaces between arrows.


## Lists

Unordered

+ Create a list by starting a line with \`+\`, \`-\`, or \`*\`
+ Sub-lists are made by indenting 2 spaces:
  - Marker character change forces new list start:
    * Ac tristique libero volutpat at
    + Facilisis in pretium nisl aliquet
    - Nulla volutpat aliquam velit
+ Very easy!

Ordered

1. Lorem ipsum dolor sit amet
2. Consectetur adipiscing elit
3. Integer molestie lorem at massa


1. You can use sequential numbers...
1. ...or keep all the numbers as \`1.\`

Start numbering with offset:

57. foo
1. bar


## Code

Inline \`code\`

Indented code

    // Some comments
    line 1 of code
    line 2 of code
    line 3 of code


Block code "fences"

\`\`\`
Sample text here...
\`\`\`

Syntax highlighting

\`\`\` js
var foo = function (bar) {
  return bar++;
};

console.log(foo(5));
\`\`\`

## Tables

| Option | Description |
| ------ | ----------- |
| data   | path to data files to supply the data that will be passed into templates. |
| engine | engine to be used for processing templates. Handlebars is the default. |
| ext    | extension to be used for dest files. |

Right aligned columns

| Option | Description |
| ------:| -----------:|
| data   | path to data files to supply the data that will be passed into templates. |
| engine | engine to be used for processing templates. Handlebars is the default. |
| ext    | extension to be used for dest files. |


## Links

[link text](http://dev.nodeca.com)

[link with title](http://nodeca.github.io/pica/demo/ "title text!")

Autoconverted link https://github.com/nodeca/pica (enable linkify to see)


## Images

![Minion](https://octodex.github.com/images/minion.png)
![Stormtroopocat](https://octodex.github.com/images/stormtroopocat.jpg "The Stormtroopocat")

Like links, Images also have a footnote style syntax

![Alt text][id]

With a reference later in the document defining the URL location:

[id]: https://octodex.github.com/images/dojocat.jpg  "The Dojocat"


## Plugins

The killer feature of \`markdown-it\` is very effective support of
[syntax plugins](https://www.npmjs.org/browse/keyword/markdown-it-plugin).


### [Emojies](https://github.com/markdown-it/markdown-it-emoji)

> Classic markup: :wink: :crush: :cry: :tear: :laughing: :yum:
>
> Shortcuts (emoticons): :-) :-( 8-) ;)

see [how to change output](https://github.com/markdown-it/markdown-it-emoji#change-output) with twemoji.


### [Subscript](https://github.com/markdown-it/markdown-it-sub) / [Superscript](https://github.com/markdown-it/markdown-it-sup)

- 19^th^
- H~2~O


### [<ins>](https://github.com/markdown-it/markdown-it-ins)

++Inserted text++


### [<mark>](https://github.com/markdown-it/markdown-it-mark)

==Marked text==


### [Footnotes](https://github.com/markdown-it/markdown-it-footnote)

Footnote 1 link[^first].

Footnote 2 link[^second].

Inline footnote^[Text of inline footnote] definition.

Duplicated footnote reference[^second].

[^first]: Footnote **can have markup**

    and multiple paragraphs.

[^second]: Footnote text.


### [Definition lists](https://github.com/markdown-it/markdown-it-deflist)

Term 1

:   Definition 1
with lazy continuation.

Term 2 with *inline markup*

:   Definition 2

        { some code, part of Definition 2 }

    Third paragraph of definition 2.

_Compact style:_

Term 1
  ~ Definition 1

Term 2
  ~ Definition 2a
  ~ Definition 2b


### [Abbreviations](https://github.com/markdown-it/markdown-it-abbr)

This is HTML abbreviation example.

It converts "HTML", but keep intact partial entries like "xxxHTMLyyy" and so on.

*[HTML]: Hyper Text Markup Language

### [Custom containers](https://github.com/markdown-it/markdown-it-container)

::: warning
*here be dragons*
:::

    `,
    options: {
      style: "html",
    },
  },
  argTypes: {
    "options.style": {
      control: "select",
      options: ["original", "bareString", "html", null, undefined],
    },
  },
};

/**
 * Render FHIR [Money]((https://hl7.org/fhir/datatypes.html#Money)
 */
export const Money = {
  args: {
    type: "Money",
    value: {
      value: 40,
      currency: "USD",
    },
  },
  argTypes: {
    "options.currencyDisplay": {
      control: "select",
      options: ["symbol", "narrowSymbol", "code", "name", undefined],
    },
    "options.currencySign": {
      control: "select",
      options: ["accounting", "standard", undefined],
    },
    "options.notation": {
      control: "select",
      options: [
        "standard",
        "scientific",
        "engineering",
        "compact-short",
        "compact-long",
        undefined,
      ],
      description: "The notation to use for the value",
    },
  },
};

/**
 * Render FHIR [oid]((https://hl7.org/fhir/datatypes.html#oid)
 */
export const Oid = {
  args: {
    type: "oid",
    value: "urn:oid:1.2.3.4.5",
  },
};

/**
 * Render FHIR [Period]((https://hl7.org/fhir/datatypes.html#Period)
 */
export const Period = {
  args: {
    type: "Period",
    value: {
      start: "2001-05-06",
      end: "2002-01-10",
    },
  },
  argTypes: {
    "options.dateStyle": {
      control: "select",
      options: ["full", "long", "medium", "short", "relative", null, undefined],
    },
    "options.timeStyle": {
      control: "select",
      options: ["full", "long", "medium", "short", null, undefined],
    },
    "options.relativeStyle": {
      control: "select",
      options: ["long", "short", null, undefined],
    },
    "options.relativeTo": {
      control: "text",
      description:
        "From when the relative computation happen - defaults to now.",
    },
  },
};

/**
 * Render FHIR [positiveInt]((https://hl7.org/fhir/datatypes.html#positiveInt)
 */
export const PositiveInt = {
  args: {
    type: "positiveInt",
    value: 42,
  },
  argTypes: {
    "options.notation": {
      control: "select",
      options: [
        "standard",
        "scientific",
        "engineering",
        "compact-short",
        "compact-long",
        undefined,
      ],
      description: "The notation to use for the value",
    },
  },
};

/**
 * Render FHIR [Quantity]((https://hl7.org/fhir/datatypes.html#Quantity)
 */
export const Quantity = {
  args: {
    type: "Quantity",
    value: {
      value: "40000",
      comparator: ">",
      unit: "ug/L",
      system: "http://unitsofmeasure.org",
      code: "ug",
    },
  },
  argTypes: {
    "options.expansions": {
      control: "object",
      description: "The ValueSet expansion to use for the code",
    },
    "options.notation": {
      control: "select",
      options: [
        "standard",
        "scientific",
        "engineering",
        "compact-short",
        "compact-long",
        undefined,
      ],
      description: "The notation to use for the value",
    },
    "options.separator": {
      control: "text",
      description: 'Between the number of the unit. Default to " "',
    },
  },
};

/**
 * Render FHIR [Range]((https://hl7.org/fhir/datatypes.html#Range)
 */
export const Range = {
  args: {
    type: "Range",
    value: {
      low: {
        value: "1.6",
        unit: "m",
      },
      high: {
        value: "1.9",
        unit: "m",
      },
    },
  },
  argTypes: {
    "options.expansions": {
      control: "object",
      description: "The ValueSet expansion to use for the code",
    },
    "options.notation": {
      control: "select",
      options: [
        "standard",
        "scientific",
        "engineering",
        "compact-short",
        "compact-long",
        undefined,
      ],
      description: "The notation to use for the value",
    },
    "options.quantitySeparator": {
      control: "text",
      description: 'Between the number of the unit. Default to " "',
    },
    "options.rangeSeparator": {
      control: "text",
      description: 'Default to "…"',
    },
  },
};

/**
 * Render FHIR [RatioRange]((https://hl7.org/fhir/datatypes.html#RatioRange)
 */
export const RatioRange = {
  args: {
    type: "RatioRange",
    value: {
      lowNumerator: {
        value: 103.5,
        unit: "US$",
        code: "USD",
        system: "urn:iso:std:iso:4217",
      },
      highNumerator: {
        value: 210.99,
        unit: "US$",
        code: "USD",
        system: "urn:iso:std:iso:4217",
      },
      denominator: {
        value: 1,
        unit: "day",
        code: "day",
        system: "http://unitsofmeasure.org",
      },
    },
  },
  argTypes: {
    "options.numeratorExpansions": {
      control: "object",
      description: "The ValueSet expansion to use for the numerator",
    },
    "options.denominatorExpansions": {
      control: "object",
      description: "The ValueSet expansion to use for the numerator",
    },
    "options.notation": {
      control: "select",
      options: [
        "standard",
        "scientific",
        "engineering",
        "compact-short",
        "compact-long",
        undefined,
      ],
      description: "The notation to use for the value",
    },
    "options.quantitySeparator": {
      control: "text",
      description: 'Between the number of the unit. Default to " "',
    },
    "options.rangeSeparator": {
      control: "text",
      description: 'Default to "…"',
    },
    "options.denominatorSeparator": {
      control: "text",
    },
    "options.reduceSingleDenominator": {
      control: "boolean",
      description:
        "If set to true, denominator with a value of 1 will not output the value. e.g. 15 g / 1 ml => 13 g/ml",
    },
  },
};

/**
 * Render FHIR [Ratio]((https://hl7.org/fhir/datatypes.html#Ratio)
 */
export const Ratio = {
  args: {
    type: "Ratio",
    value: {
      numerator: {
        value: 103.5,
        unit: "US$",
        code: "USD",
        system: "urn:iso:std:iso:4217",
      },
      denominator: {
        value: 1,
        unit: "day",
        code: "day",
        system: "http://unitsofmeasure.org",
      },
    },
  },
  argTypes: {
    "options.numeratorExpansions": {
      control: "object",
      description: "The ValueSet expansion to use for the numerator",
    },
    "options.denominatorExpansions": {
      control: "object",
      description: "The ValueSet expansion to use for the numerator",
    },
    "options.notation": {
      control: "select",
      options: [
        "standard",
        "scientific",
        "engineering",
        "compact-short",
        "compact-long",
        undefined,
      ],
      description: "The notation to use for the value",
    },
    "options.quantitySeparator": {
      control: "text",
      description: 'Between the number of the unit. Default to " "',
    },
    "options.denominatorSeparator": {
      control: "text",
    },
    "options.reduceSingleDenominator": {
      control: "boolean",
      description:
        "If set to true, denominator with a value of 1 will not output the value. e.g. 15 g / 1 ml => 13 g/ml",
    },
  },
};

/**
 * Render FHIR [Reference](https://hl7.org/fhir/references.html#Reference)
 */
export const Reference = {
  args: {
    type: "Reference",
    value: {
      reference: "Patient/123",
      type: "Patient",
      display: "John Doe",
    },
  },
};

/**
 * Render FHIR [string](https://hl7.org/fhir/datatypes.html#string)
 */
export const String = {
  args: {
    type: "string",
    value: "Hello, world!",
  },
  argTypes: {
    "options.truncate.length": {
      control: "number",
      description: "The maximum string length",
    },
    "options.truncate.separator": {
      control: "text",
      description: "The separator pattern to truncate to.",
    },
    "options.truncate.suffix": {
      control: "text",
      description: 'The string to indicate text is omitted. Defaults to "..."',
    },
  },
};

/**
 * Render FHIR [time]((https://hl7.org/fhir/datatypes.html#time)
 */
export const Time = {
  args: {
    type: "time",
    value: "11:30:00",
  },
  argTypes: {
    "options.timeStyle": {
      control: "select",
      options: ["full", "long", "medium", "short", null, undefined],
    },
  },
};

/**
 * Render FHIR [unsignedInt]((https://hl7.org/fhir/datatypes.html#unsignedInt)
 */
export const UnsignedInt = {
  args: {
    type: "unsignedInt",
    value: 42,
  },
  argTypes: {
    "options.notation": {
      control: "select",
      options: [
        "standard",
        "scientific",
        "engineering",
        "compact-short",
        "compact-long",
        undefined,
      ],
      description: "The notation to use for the value",
    },
  },
};

/**
 * Render FHIR [uri]((https://hl7.org/fhir/datatypes.html#uri)
 */
export const Uri = {
  args: {
    type: "uri",
    value: "https://hl7.org/fhir",
  },
};

/**
 * Render FHIR [url]((https://hl7.org/fhir/datatypes.html#url)
 */
export const Url = {
  args: {
    type: "url",
    value: "https://hl7.org/fhir",
  },
};

/**
 * Render FHIR [uuid]((https://hl7.org/fhir/datatypes.html#uuid)
 */
export const Uuid = {
  args: {
    type: "uuid",
    value: "urn:uuid:c757873d-ec9a-4326-a141-556f43239520",
  },
};
