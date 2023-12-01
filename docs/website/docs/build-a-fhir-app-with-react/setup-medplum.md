---
sidebar_position: 2
title: Setup Medplum
description: Use Medplum as a FHIR backend for development
---

# Setup Medplum

BonFHIR can connect to any FHIR-based API. For local development, BonFHIR is designed to easily setup and connect to [Medplum](https://www.medplum.com/) as a backend.

1. Install and start [Docker Engine](https://docs.docker.com/engine/install/)
2. In your project directory, start a [development-ready MedPlum](https://github.com/bonfhir/medplum-devbox) instance. **This is for development only and not for production use.**

   ```
   npm run start-fhir-server
   ```

3. Once the server is ready, open http://localhost:8100 and login using the default credentials:

   - Username: `admin@example.com`
   - Password: `medplum_admin`

4. Import FHIR sample data into Medplum. This command will ask to install another package: **@bonfhir/cli**

   ```
   npm run add-sample-data
   ```

5. Verify that patient data appears in MedPlum at http://localhost:8100/Patient
