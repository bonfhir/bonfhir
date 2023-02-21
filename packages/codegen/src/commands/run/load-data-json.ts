import fg from "fast-glob";
import { ListrTask } from "listr";
import { readFile } from "node:fs/promises";
import { parse as pathParse } from "node:path";
import { Context } from "./context";

/**
 * This task loads data file as JSON
 * From the `Config.dataJson` property to `Context.data`.
 */
export const LoadDataJsonTask: ListrTask<Context> = {
  title: "Load data JSON files",
  task: async (ctx, task) => {
    const allDataJsonFiles = await fg(ctx.config.dataJson);
    for (const entry of allDataJsonFiles) {
      const filenameWithoutExtension = pathParse(entry).name;
      const fileContent = JSON.parse(await readFile(entry, "utf8"));
      ctx.data[filenameWithoutExtension] = fileContent;
    }

    task.title += `: ${Object.keys(ctx.data).length} files(s) loaded.`;
  },
};
