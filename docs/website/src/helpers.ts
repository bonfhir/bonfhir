export function classnames(classNames: string[] | string): string {
  if (Array.isArray(classNames)) {
    return classNames.filter((item) => item).join(" ");
  }
  return classNames;
}
