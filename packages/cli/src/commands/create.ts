import inquirer from "inquirer";
import { CommandModule } from "yargs";
import writeLogo from "../ascii-logo";
import { Templates } from "../templates";
import {
  FhirServerChoices,
  FhirServerType,
  FhirServerTypes,
} from "../templates/utils/fhir-servers";
import {
  PackageManager,
  PackageManagerHandler,
  PackageManagers,
} from "../templates/utils/package-manager";

export interface CommandOption {
  name?: string;
  template?: string;
  packageManager?: string;
  fhirServer?: FhirServerType;
}

export default <CommandModule<unknown, CommandOption>>{
  command: "create",
  describe: "Create a new project using a template",
  builder: {
    name: {
      type: "string",
      alias: "n",
      describe: "The name of the project",
    },
    template: {
      type: "string",
      alias: "t",
      choices: Templates.map((t) => t.name),
      describe: "The template to use",
    },
    "package-manager": {
      type: "string",
      alias: "p",
      choices: PackageManagers,
      describe: "The package manager to use",
    },
    "fhir-server": {
      type: "string",
      alias: "f",
      choices: FhirServerTypes,
      describe: "The local FHIR Server to include",
    },
  },
  handler: async (options) => {
    writeLogo();

    const answers: Required<CommandOption> = await inquirer.prompt(
      [
        {
          name: "name",
          message: "What is the name of the project? (no spaces, only dashes)",
          validate: (input) => /^[\w-]+$/.test(input),
        },
        {
          name: "template",
          type: "list",
          message: "Which template do you want to use?",
          choices: Templates.map((t) => ({
            value: t.name,
            name: `${t.name}: ${t.description}`,
          })),
          validate: (input) => Templates.some((t) => t.name === input),
        },
        {
          name: "packageManager",
          type: "list",
          message: "Which package manager do you want to use?",
          choices: PackageManagers,
          validate: (input) => PackageManagers.includes(input),
        },
        {
          name: "fhirServer",
          type: "list",
          message: "Which development FHIR Server do you want to include?",
          choices: FhirServerChoices,
          default: "medplum",
          validate: (input) => FhirServerTypes.includes(input),
          when(answers) {
            return ["playground", "vite", "lambda"].includes(answers.template);
          },
        },
      ],
      options,
    );

    const template = Templates.find((t) => t.name === answers.template);
    if (!template) {
      throw new Error(`Template ${answers.template} not found`);
    }

    await template.handler({
      ...answers,
      cwd: answers.name,
      packageManager: new PackageManagerHandler(
        answers.packageManager as PackageManager,
      ),
    });
  },
};

export interface TemplateOptions
  extends Omit<Required<CommandOption>, "packageManager" | "fhirServer"> {
  cwd: string;
  packageManager: PackageManagerHandler;
  fhirServer: FhirServerType | undefined;
}
