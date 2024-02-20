---
sidebar_position: 1
title: Setup the environment
description: Use docker compose to start a FHIR Server, a n8n instance and a development SMTP server
---

:::note

Make sure to install and start [Docker](https://docs.docker.com/desktop/), and that it has sufficient resources
allocated prior to following this tutorial.

:::

### Create and start the environment

In a directory somewhere, create the following `docker-compose.yml` file:

```yaml title="docker-compose.yml"
version: "3.1"

services:
  fhir-server:
    image: ghcr.io/bonfhir/medplum-devbox:latest
    ports:
      - "8100:8100"
      - "8103:8103"

  workflow:
    image: docker.n8n.io/n8nio/n8n
    ports:
      - "5678:5678"
    environment:
      WEBHOOK_URL: http://workflow:5678/

  smtp:
    image: rnwood/smtp4dev
    ports:
      - "8080:80"
```

Then head over to your terminal and run the following command in the same folder:

```bash
docker compose up
```

This will start the a complete docker environment with:

- a [Medplum development instance](https://github.com/bonfhir/medplum-devbox)
  - identified by the host `fhir-server` inside the docker network
  - accessible from localhost on port 8100 for the UI, and 8103 for the API
- a [n8n development instance](https://docs.n8n.io/hosting/installation/docker/)
  - identified by the host `workflow` inside the docker network
  - accessible from the localhost on port 5678 for the UI
- a [development SMTP server](https://github.com/rnwood/smtp4dev) that allows to test email sending capabilities
  - identified by the host `smtp` inside the docker network
  - SMTP port 25 is open to receive email sending requests, with no authentication
  - accessible from the localhost on port 8080 for the UI

### Login to all the services

Wait until all containers have started (you should see a pause in the see of messages that appeared on the screen).

Then login to the various services to see if everything works:

- http://localhost:8100 to login to medplum

  - username: `admin@example.com`
  - password: `medplum_admin`
  - project: Default

- http://localhost:8080 to access the SMTP server console and see sent messages (should be empty at the moment)

- http://localhost:5678 to access the n8n instance
  - complete the "Set up owner account" step and you should be greated with an empty workflow definition

Congratulations! You are ready to design your first workflow!
