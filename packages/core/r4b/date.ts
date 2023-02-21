let fakedSystemTime: Date | undefined;

/**
 * Returns a UTC date representing the current timestamp.
 * Can be overloaded by using the setSystemTime method.
 *
 * Remarks: we chose to use this instead of a patching / fake approach (e.g. jest.setSystemTime) because doing so
 * increase the test compilation time significantly. This is simpler, easier, and works just as well.
 */
export const utcNow = (): Date => fakedSystemTime || new Date();

/**
 * Override the system time returned by utcNow with a fixed value.
 */
export const setSystemTime = (
  date: Date | string | number | null | undefined
) => {
  if (!date) {
    fakedSystemTime = undefined;
    return;
  }

  fakedSystemTime = new Date(date);
};
