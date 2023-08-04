import { TemplateOptions } from "../commands/create";

export interface Template {
  name: string;
  description: string;
  handler: (options: TemplateOptions) => Promise<void>;
}
