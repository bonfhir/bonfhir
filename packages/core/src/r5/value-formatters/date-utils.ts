/**
 * @see https://momentjs.com/docs/#/displaying/fromnow/
 * @see https://momentjs.com/docs/#/displaying/tonow/
 */
export function formatRelativeDateTime(
  locale: string | undefined,
  value: Date,
  relativeTo: string | number | Date | null | undefined,
  relativeStyle: "long" | "short" | null | undefined,
  dateOnlyMode = false
) {
  const relativeToDate = relativeTo ? new Date(relativeTo) : new Date();
  const relative = new Intl.RelativeTimeFormat(locale || undefined, {
    style: relativeStyle ?? undefined,
    numeric: "auto",
  });

  if (
    dateOnlyMode &&
    value.getUTCFullYear() === relativeToDate.getUTCFullYear() &&
    value.getUTCMonth() === relativeToDate.getUTCMonth() &&
    value.getUTCDate() === relativeToDate.getUTCDate()
  ) {
    return relative.format(0, "day");
  }

  const diffSec = Math.floor(
    (relativeToDate.getTime() - value.getTime()) / 1000
  );

  // from now
  if (diffSec >= 0) {
    if (diffSec < 44) {
      return relative.format(-diffSec, "seconds");
    } else if (diffSec < 89) {
      return relative.format(-1, "minute");
    } else if (diffSec < 2640) {
      return relative.format(-Math.floor(diffSec / 60), "minutes");
    } else if (diffSec < 5340) {
      return relative.format(-1, "hour");
    } else if (diffSec < 75_600) {
      return relative.format(-Math.floor(diffSec / 3600), "hours");
    } else if (diffSec < 126_000) {
      return relative.format(-1, "day");
    } else if (diffSec < 2_160_000) {
      return relative.format(-Math.floor(diffSec / 86_400), "days");
    } else if (diffSec < 3_888_000) {
      return relative.format(-1, "month");
    } else if (diffSec < 27_561_600) {
      const monthDiff = relativeToDate.getMonth() - value.getMonth();
      const yearDiff = relativeToDate.getFullYear() - value.getFullYear();
      return relative.format(-(monthDiff + yearDiff * 12), "months");
    } else if (diffSec < 47_260_800) {
      return relative.format(-1, "year");
    }

    return relative.format(-Math.floor(diffSec / 31_104_000), "years");
  }

  // in now
  if (diffSec > -44) {
    return relative.format(-diffSec, "seconds");
  } else if (diffSec > -89) {
    return relative.format(-1, "minute");
  } else if (diffSec > -2640) {
    return relative.format(-Math.floor(diffSec / 60), "minutes");
  } else if (diffSec > -5340) {
    return relative.format(-1, "hour");
  } else if (diffSec > -75_600) {
    return relative.format(-Math.floor(diffSec / 3600), "hours");
  } else if (diffSec > -126_000) {
    return relative.format(1, "day");
  } else if (diffSec > -2_160_000) {
    return relative.format(-Math.floor(diffSec / 86_400), "days");
  } else if (diffSec > -3_888_000) {
    return relative.format(1, "month");
  } else if (diffSec > -27_561_600) {
    const monthDiff = relativeToDate.getMonth() - value.getMonth();
    const yearDiff = relativeToDate.getFullYear() - value.getFullYear();
    return relative.format(-(monthDiff + yearDiff * 12), "months");
  } else if (diffSec > -47_260_800) {
    return relative.format(1, "year");
  }

  return relative.format(-Math.floor(diffSec / 31_104_000), "years");
}
