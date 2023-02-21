import { exec } from "node:child_process";
import { readFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { promisify } from "node:util";

const execAsync = promisify(exec);

describe("codegen", () => {
  describe("run", () => {
    it("process data and templates", async () => {
      const cli = "yarn dev";
      const thisDirName = dirname(fileURLToPath(import.meta.url));
      const data = join(thisDirName, "__fixtures__", "data", "*.json");
      const templates = join(thisDirName, "__fixtures__", "templates", "*.hbs");
      const helper = join(
        thisDirName,
        "__fixtures__",
        "templates",
        "test-helper.js"
      );
      await execAsync(
        `${cli} run -d ${data} -t ${templates} --helpers "${helper}" -p "prettier --write %files%"`,
        {
          cwd: thisDirName,
        }
      );

      const loadedResult = await readFile(
        join(thisDirName, "__fixtures__", "templates", "result.ts"),
        "utf8"
      );
      expect(loadedResult).toMatchSnapshot();
    }, 60_000);
  });
});
