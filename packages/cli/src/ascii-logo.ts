/**
 * Prints ASCII bonFHIR logo
 */
export default function writeLogo(
  logFn: (typeof console)["log"] | undefined = console.log,
) {
  logFn("\n");
  logFn(
    "       |\\         _                    _____  _   _  ___  ____        |\\",
  );
  logFn(
    "       | V\\      | |__    ___   _ __  |  ___|| | | ||_ _||  _ \\       | V\\",
  );
  logFn(
    "    \\  /  / \\    | '_ \\  / _ \\ | '_ \\ | |_   | |_| | | | | |_) |   \\  /  / \\",
  );
  logFn(
    "    |\\/   \\_|\\   | |_) || (_) || | | ||  _|  |  _  | | | |  _ <    |\\/   \\_|\\",
  );
  logFn(
    "     \\_______/   |_.__/  \\___/ |_| |_||_|    |_| |_||___||_| \\_\\    \\_______/",
  );
  logFn("\n");
}
