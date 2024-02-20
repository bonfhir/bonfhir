---
sidebar_position: 3
title: Send emails from CommunicationRequest
description: Design your first workflow to send emails from CommunicationRequest
---

We are now ready to create a workflow.

Our objective is to create a workflow that will send emails when a [CommunicationRequest](https://hl7.org/fhir/communicationrequest.html)
is created.

Here are our assumptions:

- the workflow only works when the `status` is `active` and the `medium` is `email`
- it is invoked using a [FHIR Subscription](https://hl7.org/fhir/subscription.html)
- it collects the first configured email of each recipient
- uses the first `payload` content as a subject, and the second as the email body
- updates the `CommunicationRequest.status` to `complete` once emails have been sent

### Create a test patient

Head over to Medplum (http://localhost:8100) and create a sample Patient - you can choose `New...` and `JSON` and paste the following sample patient:

```json
{
  "resourceType": "Patient",
  "name": [
    {
      "given": ["John"],
      "family": "Doe"
    }
  ],
  "telecom": [
    {
      "system": "email",
      "use": "home",
      "value": "john.doe@example.com"
    },
    {
      "system": "phone",
      "use": "mobile",
      "value": "202-555-0136"
    }
  ]
}
```

![Medplum Patient](/img/docs/n8n/medplum-patient.png)

Take note of the resource id - this will be used later.

### Create the trigger

Head over to [n8n](http://localhost:5678) and add a first step - this should be "bonFHIR / Trigger / On FHIR Subscription" (in "On app event")

![Add bonFHIR Trigger](/img/docs/n8n/add-bonfhir-trigger.png)

Use the following settings:

- Authentication: "Basic Auth"
- Credentials: Create new credentials with:
  - User: `f54370de-eaf3-4d81-a17e-24860f667912`
  - Password: `75d8e7d06bf9283926c51d5f461295ccf0b69128e983b6ecdd5a9c07506895de`
- Base URL: `http://fhir-server:8103/fhir/R4`
- Resource Type: `CommunicationRequest`
- Search Criteria: `status=active&medium=email`
- Reason: `Send emails from CommunicationRequest`
- Shared Secret: _leave as is_
- Payload: `application/fhir+json`

![Medplum Auth credentials](/img/docs/n8n/medplum-auth-credentials.png)
![n8n CR trigger configuration](/img/docs/n8n/n8n-cr-trigger-configuration.png)

### Retrieve test Subscription data

1. Press the "Test step" button; this will create the FHIR subscription in Medplum, and have n8n start listening to incoming requests

2. Head over to medplum (http://localhost:8100/CommunicationRequest) and create a sample CommunicationRequest - you can choose `New...` and `JSON` and paste the following data:

```json
{
  "resourceType": "CommunicationRequest",
  "status": "active",
  "medium": [
    {
      "coding": [
        {
          "system": "http://terminology.hl7.org/CodeSystem/v3-ParticipationMode",
          "code": "EMAILWRIT",
          "display": "email"
        }
      ]
    }
  ],
  "subject": {
    "reference": "Patient/<patientid created at step 1>",
    "display": "John Doe"
  },
  "recipient": [
    {
      "reference": "Patient/<patientid created at step 1>",
      "display": "John Doe"
    }
  ],
  "payload": [
    {
      "contentString": "About your appointment"
    },
    {
      "contentString": "This is a confirmation for your appointment on Thursday."
    }
  ]
}
```

3. Get back to n8n. If everything went well, you should see the CommunicationRequest received in the output and the test stopped

![CR received output](/img/docs/n8n/cr-received-output.png)

:::info

If nothing happened, it is probably because you entered the trigger information incorrectly.  
Please verify all the information and retry.

You can check that the FHIR subscription is created properly in Medplum when you press on the "Test step" by heading
to http://localhost:8100/Subscription. The registration automatically disappears when the test is stopped.

:::

### Retrieve recipients emails

Press "Back to canvas" on the upper left corner and add a new step by clicking on the "+" sign at the far right of the design surface:

- Now is a good time to Save your workflow by clicking "Save" on the upper-right corner
- Add a new "bonFHIR" node with the action "Resolve FHIR references"
- Use the following settings:
  - Authentication: "Basic Auth"
  - Credentials: Select the previously created credentials
  - Base URL: `http://fhir-server:8103/fhir/R4`
  - Operation: Resolve
  - Reference: Drag the root `recipient` attribute on the left to the field; it should appear as `{{ $json.recipient }}`
  - FHIR Path: `telecom.where(system='email').first()`
- Press "Test step"

You should see the email extracted. Notice how we could use a [FHIR Path](https://hl7.org/fhirpath/N1/) expression to look for the email

![Resolve email references](/img/docs/n8n/resolve-email-references.png)

### Send emails

Press "Back to canvas" on the upper left corner and add a new step by clicking on the "+" sign at the far right of the design surface:

![Workflow email step 2](/img/docs/n8n/workflow-email-step-2.png)

- Now is a good time to Save your workflow by clicking "Save" on the upper-right corner
- Add a new "Send Email" action
- Use the following settings:
  - Credentials: Create new credentials:
    - Leave User and Password blanks
    - Host: `smtp`
    - Port: 25
    - SSL/TLS: Off
  - From Email: `admin@fhir-server.local`
  - To Email: drag the root `value` attribute on the left to the field; it should appear as `{{ $json.value }}`
  - Subject: on the left, select the "bonFHIR Trigger" output, and drag the **first** Payload `contentString` to the field; it should appear as `{{ $('bonFHIR Trigger').item.json.payload[0].contentString }}`
  - Email Format: `Text`
  - Text: on the left, select the "bonFHIR Trigger" output, and drag the **second** Payload `contentString` to the field; it should appear as `{{ $('bonFHIR Trigger').item.json.payload[1].contentString }}`
- Press "Test step"

![SMTP Credentials](/img/docs/n8n/smtp-credentials.png)
![SMTP Output](/img/docs/n8n/smtp-output.png)

You should see the output of the SMTP server being rendered.

Head over to the SMTP server UI (http://localhost:8080/) and you should see the email has it was sent.

![Sent email](/img/docs/n8n/sent-email.png)

:::tip

If you want to remove the n8n footer from the email, simply add an Option to the SMTP action named "Append n8n Attribution"
and set it to false.

:::

### Update the CommunicationRequest status

Press "Back to canvas" on the upper left corner and add a new step by clicking on the "+" sign at the far right of the design surface:

![Workflow email step 3](/img/docs/n8n/workflow-email-step-3.png)

- Now is a good time to Save your workflow by clicking "Save" on the upper-right corner
- Add a new "bonFHIR Patch a FHIR Resource" action
- Use the following settings:
  - Authentication: "Basic Auth"
  - Credentials: Select the previously created credentials
  - Base URL: `http://fhir-server:8103/fhir/R4`
  - Operation: Patch
  - Resource Type: `CommunicationRequest`
  - ID: on the left, select the "bonFHIR Trigger" output, and drag the root `id` attribute to the field; it should appear as `{{ $('bonFHIR Trigger').item.json.id }}`
  - Specify Patch Body: Using Fields Below
  - Patch Parameters: press "Add Parameter" and then:
    - Op: `Add`
    - From: _leave empty_
    - Path: `/status`
    - Value `completed` (You can ignore the error status that might pop)
- Press "Test step"

![Update CR Output](/img/docs/n8n/update-cr-output.png)

You should see the output of the update marking the CommunicationRequest as being `completed`.
If you head over to Medplum (http://localhost:8100/CommunicationRequest), you can confirm that is has been updated.

### 🚀 Save the workflow and active it!

We are almost done.

Press "Back to canvas" on the upper left corner and save your workflow.
Then, toggle the "Inactive/Active" to "active in the upper right corner.

![Workflow email step 4](/img/docs/n8n/workflow-email-step-4.png)

Heading over to Medplum Subscriptions, (http://localhost:8100/Subscription), you will see the subscription being created.

### Final result

You can now test your worklow by creating CommuncationRequest with various recipients and content!
Check the various workflow executions to see how it gets executed.

![Workflow executions](/img/docs/n8n/workflow-executions.png)

Here is the final workflow exported if you want to import it on your own instance:

<a target="\_blank" href="/workflows/n8n-workflow-send-emails.json">n8n-workflow-send-emails.json</a>

:::info

If you choose to import the workflow, you will still need to setup the credentials for each step.

:::
