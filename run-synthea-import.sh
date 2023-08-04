#!/bin/sh
pnpm --filter @bonfhir/cli run dev import --source synthea-sample --fhir r4b --base-url http://localhost:8103/fhir/R4/ --auth-token-url http://localhost:8103/oauth2/token --auth-client-id f54370de-eaf3-4d81-a17e-24860f667912 --auth-client-secret 75d8e7d06bf9283926c51d5f461295ccf0b69128e983b6ecdd5a9c07506895de
