/**
 * Configuration for the run command.
 */
export interface Config {
  dataJson: string;
  templates: string;
  postProcessing: string[] | undefined;
  helpers: string | undefined;
  header: string | undefined;
}

/**
 * Shared context for all tasks in the run command.
 * This is also the context passed to each template when rendered.
 */
export interface Context {
  /**
   * The initial command configuration.
   */
  config: Config;

  /**
   * The parsed data files.
   */
  data: Record<string, unknown>;

  /**
   * The full path of each template file.
   */
  templates: string[];

  /**
   * The full path of each written files (from templates).
   * This can be different than templates, as templates can run nothing, or produce multiple files.
   */
  writtenFiles: string[];

  /**
   * The loaded helpers module. Will be injected as Handlebars helpers.
   */
  helpers?: object | undefined;
}
