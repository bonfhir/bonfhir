---
sidebar_position: 2
title: Setup a local FHIR Server
description: Use Medplum as a local FHIR backend for development
---

BonFHIR can connect to any FHIR-based API. For local development, BonFHIR provides an easy setup and connect experience with [Medplum](https://www.medplum.com/) as a backend.

1. Install and start [Docker](https://docs.docker.com/desktop/)
2. In your project directory, start a [development-ready MedPlum](https://github.com/bonfhir/medplum-devbox) instance. **This is for development only and not for production use.**

   ```bash npm2yarn
   npm run start-fhir-server
   ```

3. Once the server is ready (it may take up to a minute the first time), open http://localhost:8100 and login using the default credentials:

   - Username: `admin@example.com`
   - Password: `medplum_admin`
   - Project: Default
