/* eslint-disable @typescript-eslint/no-non-null-assertion */
import Listr, { ListrTask } from "listr";
import chunk from "lodash/chunk";
import { exec } from "node:child_process";
import { promisify } from "node:util";
import { Context } from "./context";

const execAsync = promisify(exec);

const GLOBAL_POST_PROCESSING_CHUNK_SIZE = 100;
const EXEC_MAX_BUFFER_SIZE = 1024 * 1000 * 10;

/**
 * Run command lines instructions after the template generation.
 * Commands can either be global (using the `%files%`) or per-file (using the `%file%` token).
 * `%files%` is executed in chunks if there are too many templates.
 */
export const PostProcessingTask: ListrTask<Context> = {
  title: "Post processing files",
  task: async (ctx) => {
    const globalPostProcessingTasks = ctx.config.postProcessing!.filter(
      (x) => !x.includes("%file%")
    );
    for (const globalPostProcessingTask of globalPostProcessingTasks) {
      const fileChunks = chunk(
        ctx.writtenFiles,
        GLOBAL_POST_PROCESSING_CHUNK_SIZE
      );
      for (const fileChunk of fileChunks) {
        await execAsync(
          globalPostProcessingTask.replace(/%files%/g, fileChunk.join(" ")),
          {
            maxBuffer: EXEC_MAX_BUFFER_SIZE,
          }
        );
      }
    }

    if (ctx.config.postProcessing!.some((x) => x.includes("%file%"))) {
      return new Listr<Context>(
        ctx.writtenFiles
          .filter((x) => x.includes("%file%"))
          .map((element) => CreatePostProcessingAFileTask(element))
      );
    }
  },
  skip: (ctx) => !ctx.config.postProcessing?.length,
};

function CreatePostProcessingAFileTask(filePath: string): ListrTask<Context> {
  return {
    title: `Post-processing ${filePath}`,
    task: async (ctx) => {
      for (const command of ctx.config.postProcessing!.filter((x) =>
        x.includes("%file%")
      )) {
        await execAsync(command.replace(/%file%/g, filePath), {
          maxBuffer: EXEC_MAX_BUFFER_SIZE,
        });
      }
    },
  };
}
