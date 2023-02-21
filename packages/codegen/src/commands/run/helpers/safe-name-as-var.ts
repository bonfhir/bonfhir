import { ToWords } from "to-words";

const toWords = new ToWords({
  localeCode: "en-US",
});

/**
 * Return a string that can safely be used as a Typescript variable name.
 * Invalid characters are stripped out, and starting numbers are converted by their letter equivalent.
 */
export const safeNameAsVar = (value: string | null | undefined) => {
  const result = value?.replace(/\W/g, "");
  if (!result) {
    return result;
  }

  if (result.startsWith(Number.parseInt(result).toString())) {
    return result.replace(
      Number.parseInt(result).toString(),
      toWords.convert(Number.parseInt(result)).replace(/\W/g, "")
    );
  }

  return result;
};
