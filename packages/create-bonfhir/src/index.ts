import { create } from "@bonfhir/cli";
import yargs from "yargs";

// This package is essentially a wrapper around the @bonfhir/cli create command to support a more natural CLI experience
yargs()
  .command(create)
  .demandCommand(1)
  .version(process.env.PACKAGE_VERSION || "local")
  .parse(["create", ...process.argv.slice(2)]);
