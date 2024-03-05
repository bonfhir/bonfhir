---
sidebar_position: 2
title: Create a FHIR Implementation Guide with IG Toolbox
description: Document your implementation data model
---

This guide will walk you through creating a [FHIR Implementation Guide (IG)](https://www.hl7.org/fhir/implementationguide.html)
using [bonFHIR's IG Toolbox](https://github.com/bonfhir/ig-toolbox) docker image.

This guide is also available in video:

<p style={{textAlign: "center"}}>
  <iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/tgUZ1Et4fvM" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
</p>

## Why create an Implementation Guide?

We do recommend that you create and maintain a FHIR IG for your FHIR Implementation.  
It provides the following benefits:

- document your own usage of FHIR, in a format that is familiar with FHIR practitioners
- create artifacts (structure definitions, computable resources, terminology, etc...) that you can import and use directly
  within your FHIR server for validation and retrieval of data

![IG Venn Diagram](/img/docs/ig_venn.svg)

_Image courtesy of FSH School_

Here are some resources to learn more about how to create IGs:

- [FSH Language overview](https://hl7.org/fhir/uv/shorthand/)
- [FSH Language reference](https://hl7.org/fhir/uv/shorthand/reference.html)
- [FSH School](https://fshschool.org/), and more specifically the [Seminar](https://fshschool.org/courses/fsh-seminar/) and the [deep dive](https://fshschool.org/courses/fsh-seminar/04-deep-dive-with-fsh.html)

## What is the IG Toolbox?

bonFHIR's IG toolbox helps with maintaining the suite of tools required to author and generate IGs,
so you can focus on _writing_ the IG, not figuring out how to setup you tools and workstation.

You don't need to install anything.  
The only thing you need is [Docker installed](https://www.docker.com/products/docker-desktop/),
and we do recommend that you use [Visual Studio Code](https://code.visualstudio.com/) to edit the IG.

## Get Started

Initialize your implementation guide using [SUSHI](https://fshschool.org/docs/sushi/):

```shell
docker run -it --rm -v .:/workspaces ghcr.io/bonfhir/ig-toolbox sushi init
```

This will create the [Project structure](https://fshschool.org/docs/sushi/project/).

Open it with Visual Studio Code.

![IG VS Code](/img/docs/ig_vscode.png)

## (Optional) - Create a dev container

:::info

This step is optional, but we do recommend you do it.  
It will enhance your editing experience within Visual Studio Code by providing:

- Syntax highlighting and completion
- Tasks and Shortcuts to build your IG.

:::

In your project directory, run the following command to create the dev container and vs code config files:

```shell
docker run -it --rm -v .:/workspaces ghcr.io/bonfhir/ig-toolbox add-vscode-files
```

Then install the Dev Containers extension if you don't already have it.

![IG VS Code](/img/docs/ig_vscode_devcontainer.png)

Once installed, simply click the "Reopen in Container" button to re-launch Visual Studio Code inside the dev container.

## Edit the IG

You can now create FSH files and resources for your IG.

A few scripts can help you:

### Add a new profile

Run the following command to create a new resource profile and corresponding Markdown documentation:

```shell
docker run -it --rm -v .:/workspaces ghcr.io/bonfhir/ig-toolbox add-profile <profile-name>
```

This creates a new fsh file with the profile, and a corresponding markdown file in the `pagecontent` section.

:::tip

If you are using the VS Code devcontainer setup at step 2, you can simply use the command palette and run the task "Add new profile"

:::

### Add a new diagram

Implementation Guides can contain diagrams created using [PlantUML](https://plantuml.com/).  
Run the following command to create a new class diagram that can be used to represent relationships between resources:

```shell
docker run -it --rm -v .:/workspaces ghcr.io/bonfhir/ig-toolbox add-fhir-resource-diagram <diagram-name>
```

This create a new plantUML file in the `images-source` folder, and output the syntax to include in markdown files to include the diagram in the documentation.

:::tip

If you are using the VS Code devcontainer setup at step 2, you can simply use the command palette and run the task "Add new diagram".

Also - you can preview the diagram in realtime by running the "PlantUML: Preview Current Diagram".

:::

## Build the IG using SUSHI

This step is a quick process that can:

- validate that your fsh is valid
- and create the FHIR artifacts

To run the build, use the following command:

```shell
docker run -it --rm -v .:/workspaces ghcr.io/bonfhir/ig-toolbox sushi
```

:::tip

If you are using the VS Code devcontainer setup at step 2, you can simply use the default build command, or run the "Run SUSHI" task.

:::

## Run the IG Publisher

This is the final build that will produce all the artifacts associated with a published IG.

In order to run it you must first download the IG publisher (this only need to be done once):

```shell
docker run -it --rm -v .:/workspaces ghcr.io/bonfhir/ig-toolbox ./_updatePublisher.sh -y
```

:::tip

If you are using the VS Code devcontainer setup at step 2, you can simply use the "Update IG Publisher" task.

:::

Then, run the IG Publisher:

```shell
docker run -it --rm -v .:/workspaces ghcr.io/bonfhir/ig-toolbox ./_genonce.sh
```

:::tip

If you are using the VS Code devcontainer setup at step 2, you can simply use the "Run IG Publisher" task.

:::

Once executed, you will find the resulting IG in the `output` folder.
Open the `output/index.html` file in your browser to browse your implementation guide.

![IG Example](/img/docs/ig_example.png)
