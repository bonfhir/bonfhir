import { readFile, writeFile } from "node:fs/promises";

export async function modifyJsonFile<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  T = Record<string, any>,
>(filePath: string, modifyCallback: (data: T) => T) {
  try {
    const data = await readFile(filePath, "utf8");
    const jsonParsedFile: T = JSON.parse(data);
    const modifiedData = modifyCallback(jsonParsedFile);
    const updatedStringFile = JSON.stringify(modifiedData, undefined, 2);
    await writeFile(filePath, updatedStringFile, "utf8");
  } catch (error) {
    console.error(`Error reading or writing the ${filePath} file:`, error);
  }
}
