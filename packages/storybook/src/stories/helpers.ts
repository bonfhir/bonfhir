/**
 * Build a props object from a flatten, dot-notation list of props.
 */
export function buildArgs(props: any): any {
  const result: Record<string, any> = {};

  for (const key in props) {
    const value = props[key];
    const keys = key.split(".");

    let currentObj = result;
    for (let i = 0; i < keys.length; i++) {
      const currentKey = keys[i];
      if (!currentKey) continue;
      if (!(currentKey in currentObj)) {
        currentObj[currentKey] = {};
      }
      if (i === keys.length - 1) {
        currentObj[currentKey] = value;
      }
      currentObj = currentObj[currentKey];
    }
  }
  return result;
}
