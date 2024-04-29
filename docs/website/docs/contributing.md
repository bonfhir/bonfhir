---
sidebar_position: 10
title: Contributing to bonFHIR
---

bonFHIR is an open-source project and we welcome contributors.  
Here are a few guidelines.

## Ways to contribute

### Found a bug?

- **Ensure the bug was not already reported** by searching on GitHub under [Issues](https://github.com/bonfhir/bonfhir/issues).

- If you're unable to find an open issue addressing the problem, [open a new one](https://github.com/bonfhir/bonfhir/issues/new). Be sure to include a **title and clear description**, as much relevant information as possible, and a **code sample** or an **executable test case** demonstrating the expected behavior that is not occurring.

### Fix a bug or improve the documentation?

- Open a new GitHub pull request with the patch.
- Ensure the PR description clearly describes the problem and solution. Include the relevant issue number if applicable.
- Don't forget to include the appropriate changeset description (see below for more details)
- Please monitor the CI build result and fix any problems. A good way to do it is to first open a **Draft** PR so that the build can run, prior to mark it ready for review
- Once your PR is merged, your contributions will be publicly visible on the packages CHANGELOG.

### Add a new feature or change an existing one?

- If the change is small enough, you can try your luck with opening a PR - see the [patch instructions](#fix-a-bug-or-improve-the-documentation) above.
- Otherwise, please [create a new discussion](https://github.com/bonfhir/bonfhir/discussions), explains your intended changes, and be prepared to be asked for code snippets or POCs 🙂

## Get started - running the bonFHIR solution

bonFHIR is a monorepo that contains all the bonFHIR packages, websites and documentation.  
The monorepo uses [`pnpm`](https://pnpm.io) as a package manager, and [`turborepo`](https://turbo.build/repo) as the build system.

### Pre-requisites

- [Node LTS](https://nodejs.org/en/download)
- [pnpm](https://pnpm.io/installation)
- [Docker](https://docs.docker.com/desktop/)
- Visual Studio Code - optional, but recommended - there are recommended extensions on the repo that you might want to install as well

### Build, run the checks, and run the tests

- Clone the repository
- `pnpm install`
- `pnpm build` - run the build for all packages
- `pnpm check` - run the quality checks for all packages (prettier, eslint, and type checking)
- `pnpm test` - run the unit tests for all packages
- `pnpm all` - run `build`, `check` and `test`

### Run the sample apps

Samples apps are in the `apps` directory.

1. Build all the packages in the monorepo

2. Start the local FHIR Server:

- `pnpm fhir:start-server`
  - after a bit of time, this starts a local [MedPlum Instance](https://medplum.com) accessible at http://localhost:8100
    - login with admin@example.com / medplum_admin
    - select the "Default" project
- `pnpm fhir:add-sample-data` - this kicks-off a sample data import (synthetic patients) into the local FHIR server so that you have valid FHIR data to work with

3. Run the apps using `pnpm dev` in their respective directory.

## Develop in bonFHIR

### Where to write new code?

bonFHIR is meant to be compatible with multiple FHIR versions at the same time (currently R4B and R5).
The way this works for _most_ packages is:

- you should write your code and tests in the `src/r5` directory
  - to run the tests without having to rebuild all the time, you can simply scope your test runner using `pnpm run test src/r5 --watch`
- when running the `pnpm build` component for the package, all files from `src/r5` are copied to `src/r4b`, and the FHIR path is substituted to the appropriate version prior to the package being bundled

> Code written in `r4b`` is squashed during the build, so you **will loose** it when the build commands run.

### Code generator

Some projects includes code generation sourced from the official FHIR definition files.  
In that case, the `@bonfhir/codegen` is used to run the files in the `templates` directory and produce artifacts in the `src/r4b` and `src/r5` directories.

### Bundling and cross-project references

The `pnpm build` command runs the template generation, copy files over from `src/r5`, and then launches [rollup](https://rollupjs.org/)
to bundle the code into the different versions (R4B, R5, CJS, ESM...) into the `dist/` directory.  
bonFHIR dependencies are excluded from the bundling - some dev dependencies may get bundled in.

Local package references work by using pnpm workspace references to the `package.json` file, that itself references the `dist` directory.  
What that means is that the code from one package uses the _bundled_ version of the code from its dependencies, not the source code directly.
Most of the packages include a `pnpm dev` script that should automatically re-build the package when a file change
so it is easier to support cross-package development.

### Changesets - versioning packages

You should **never** change a package version manually.
The monorepo uses [changesets](https://github.com/changesets/changesets) to manage the release and versioning process.

When commiting your changes, please ensure that you have a _clean commit history_, and that each individual commit contains:

- a unit of change (that will appear as a item in the changelog of each package)
- a changeset file containing a description of those changes, along with the versionning information

To generate a changeset file, simpy run the `pnpm changeset` command at the root of the repo.  
This generates a new file in the `.changeset` folder. Make sure to commit this file along with the changes so they are associated.

A PR can contain multiple such commits. Be mindful of the PR sizes though, as larger PR tend to be vry hard to review.  
You may get ask to break it down, and clean-up your git history.

After the PR is merged, a new PR is generated - entitled "Version Package", that will in turn version and publish new packages once it is merged.
That's how bonFHIR is released. As a contributor, you should **not** merge the "Version Package" PR.

> To get a PR to build properly without a package version changed (for exemple a change to the website or documentation)
> use the `pnpm changeset --empty` command to generate an empty changeset.

### A good commit

See for example https://github.com/bonfhir/bonfhir/commit/acda6629c0af50ce5824501a9f01b1dc595e0dda.  
A good commit should:

- contains all the changes related to the linked issue, but no more
- include all FHIR version changes at the same time (e.g. `src/r4b` and `src/r5`)
- update relevant unit-tests pertinent to the changes, and make sure code is covered appropriately
- passes all `pnpm check` and `pnpm test` scripts - so it conforms with the prettier, eslint and type check requirements
- contains the relevant documentation update
- update the storybook stories if they are impacted
- has a valid changeset with an appropriate description and link to the source issue

> A good practice prior to commit is to run the `pnpm all` command at the root of the monorepo.
> This builds, checks and tests all packages to ensure that everything is good prior to the CI run.

## Maintain version consistency across package dependencies

bonFHIR is maintained as a monorepo using [turbo](https://turbo.build/) and [pnpm](https://pnpm.io/).

Some packages have common dependencies. As a good practice, we want to ensure that all dependencies in the monorepo have
the same version - what that means is that if `@bonfhir/react` and `@bonfhir/mantine` both have a dependency on the `react`
package, we want to make sure that version is the same; maintain version consistency across package depndencies.

There are 2 moments in the maintenance of the packages where this is important:

- when adding new dependencies
- when updating dependencies

### Adding dependencies

_This is true as well when creating new packages._
When adding new dependencies to a package, we want to make sure to use the same version of the package if another bonFHIR
package already uses the same dependency.

In order to achieve this:

1. always check in the monorepo if another package already uses that same dependency, by using the `pnpm packages:lookup` command

   ```bash
   pnpm packages:lookup left-pad
   ```

2. If the previous command returns nothing, then simply add the dependency as usual.

3. If it does, please lookupthe version specifier in the `package.json` file where it is present, and use the same when adding it

:::info[Walkthrough]

Let's imagine that we need to add the `remarkable` package as a dependency of `@bonfhir/react`.

1. Lookup existing information

```bash
pnpm packages:lookup remarkable

> bonfhir@ packages:lookup bonfhir/bonfhir
> pnpm why -r "remarkable"

Legend: production dependency, optional only, dev only

@bonfhir/core@2.19.2 bonfhir/bonfhir/packages/core

devDependencies:
remarkable 2.0.1
```

2. Found it! It is used by the `@bonfhir/core` package. Let's look at the `package.json` file:

```json
{
  "name": "@bonfhir/core",
  "version": "2.19.2",
  "description": "Core FHIR resources and utilities for BonFHIR",
  //...
  "devDependencies": {
    //...
    "remarkable": "^2.0.1"
    //...
  }
  //...
}
```

3. Install with the same version moniker:

```bash
pnpm add remarkable@^2.0.1
```

:::

### Updating dependencies

Always update dependencies from the root of the monorepo, to ensure that all packages are updated equally.

To identify outdated dependencies, first run:

```bash
pnpm packages:outdated
```

This creates a file named `outdated.log` that can be opened in your editor - e.g. `code outdated.log`.
This file lists all the dependencies across the monorepo that have an update available, with the projects that use them.

Identify the packages you want to update, and then run the `pnpm packages:update` command:

```bash
pnpm packages:update turbo rollup '@mantine/*' '@tabler/*'
```

> Notice how multiple packages can be specified, whether different names or with the same npm organization.

This process ensure that all projects are updated with the same version, and that the monorepo stay consistent.
