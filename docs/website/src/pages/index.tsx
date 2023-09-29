import React from "react";
import Link from "@docusaurus/Link";
import Layout from "@theme/Layout";
import CodeBlock from "@theme/CodeBlock";
import SvgGears from "@site/static/img/home/gears.svg";
import SvgArrowsCircle from "@site/static/img/home/arrows_circle.svg";
import SvgBusinessMane from "@site/static/img/home/business_man.svg";
import SvgComputerBooks from "@site/static/img/home/computer_books.svg";

import styles from "./index.module.css";

export default function Home(): JSX.Element {
  return (
    <Layout description="A collection of projects and libraries to help implement FHIR-based products and solutions.">
      <HomepageHeader />
      <main>
        <Benefits />
        <GetStarted />
        <FeaturedPackages />
        <GetInTouch />
      </main>
    </Layout>
  );
}

function HomepageHeader() {
  return (
    <header className={styles.heroBanner}>
      <div>
        <div>
          <div className={styles.verticalStack}>
            <h1>Accelerate the creation of FHIR apps</h1>
            <div className={styles.heroSubtitle}>
              <em>FHIR is awesome.</em> Let's face it though, getting started
              and creating a FHIR solution can be quite daunting. Let BonFHIR
              help!
            </div>
            <div>
              <div>
                <Link className={styles.learnMore} to="/">
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div style={{ textAlign: "center" }}>
          <img src="https://placehold.co/600x450/png" alt="BonFHIR" />
        </div>
      </div>
    </header>
  );
}

function Benefits() {
  return (
    <div className={styles.benefits}>
      <div>
        <h2>Benefits of our Toolkit</h2>
      </div>
      <div className={styles.benefitsContainer}>
        <div className={styles.benefitItem}>
          <SvgGears role="img" />
          <h4>Open Source</h4>
          <p>Our open source software is publicly accessible to anyone.</p>
        </div>
        <div className={styles.benefitItem}>
          <SvgBusinessMane role="img" />
          <h4>Simplify FHIR Usage</h4>
          <p>
            Bonfhir provides building blocks to help get started quickly.
            Implementing FHIR solution is easier & faster.
          </p>
        </div>
        <div className={styles.benefitItem}>
          <SvgArrowsCircle role="img" />
          <h4>Customizable</h4>
          <p>
            Take full control over the ability to design your own application.
            <em>No more annoying screens from your EHR.</em>
          </p>
        </div>
      </div>
    </div>
  );
}

function GetStarted() {
  return (
    <div className={styles.getStarted}>
      <div>
        <div className={styles.leftColumn}>
          <div>
            <h2>How can you learn?</h2>
          </div>
          <div>
            <p>
              We provide you with a library of tutorials and templates for a
              smooth onboarding and quick setup. Learn to design your own
              customizable applications.{" "}
            </p>
          </div>
          <div>
            <Link to="/">Get Started</Link>
          </div>
        </div>
        <div className={styles.rightColumn}>
          <SvgComputerBooks role="img" />
        </div>
      </div>
    </div>
  );
}

function FeaturedPackages() {
  return (
    <div className={styles.featuredPackages}>
      <div>
        <div>
          <h2>Featured Packages</h2>
        </div>
        <div className={styles.featuredCode}>
          <div className={styles.leftColumn}>
            <div>
              <h4>Core Package</h4>
              <p>
                Utilities to easily manipulate FHIR resources and connect to
                servers.
              </p>
            </div>
          </div>
          <div className={styles.rightColumn}>
            <CodeBlock language="tsx">{`import { build, duration, FhirClient, Formatter, reference, today } from "@bonfhir/core/r4b";

declare const client: FhirClient;

const organization = build("Organization", {
  name: "Acme, Inc.",
});

const patient = build("Patient", {
  name: [{ given: ["John"], family: "Doe" }],
  birthDate: duration.subtract(today(), { years: 30 }),
  managingOrganization: reference(organization),
})

const savedPatient = await client.create(patient);
console.log(\`Saved patient \${Formatter.default.format("HumanName", savedPatient.name)}.\`);
`}</CodeBlock>
          </div>
        </div>
        <div className={styles.featuredCode}>
          <div className={styles.leftColumn}>
            <div>
              <h4>FHIR Query</h4>
              <p>
                React Query state management for FHIR. Retrieve and update data
                in your frontend applications.
              </p>
            </div>
          </div>
          <div className={styles.rightColumn}>
            <CodeBlock language="tsx">{`import { useFhirSearch, useFhirUpdateMutation } from "@bonfhir/query/r4b";
import { FhirQueryLoader } from "@bonfhir/react/r4b";

function MyComponent() {
  const patientsQuery = useFhirSearch(
    "Patient",
    search => search
      .name("John Doe")
      ._include("Patient:general-practitioner"));

  const patientMutation = useFhirUpdateMutation("Patient");

  return (
    <FhirQueryLoader query={patientsQuery}>
      {(data: patients) => {
        //...
      }}
    </FhirQueryLoader>
  );
}
`}</CodeBlock>
          </div>
        </div>
        <div className={styles.featuredCode}>
          <div className={styles.leftColumn}>
            <div>
              <h4>React Components</h4>
              <p>Building blocks for displaying and editing FHIR resources.</p>
            </div>
          </div>
          <div className={styles.rightColumn}>
            <CodeBlock language="tsx">{`import { FhirInput, FhirPagination, FhirTable, FhirValue } from "@bonfhir/react/r4b";

<FhirValue type="HumanName" value={patient.name} options={{ style: "full" }} />

<FhirInputArray
  label="Identifiers"
  min={1}
  {...form.getArrayInputProps("identifier", { newValue: {} })}
>
  {({ index }) => {
    return (
      <FhirInput
        type="Identifier"
        mode="full"
        identifiers={PatientIdentifierSystems}
        {...form.getInputProps(\`identifier.\${index}\`)}
      />
    );
  }}
</FhirInputArray>

<FhirTable {...patientsQuery}>
  { /*...*/ }
</FhirTable>
<FhirPagination {...patientsQuery}>
`}</CodeBlock>
          </div>
        </div>
        <div className={styles.learnMore}>
          <Link to="/">Learn More</Link>
        </div>
      </div>
    </div>
  );
}

function GetInTouch() {
  return (
    <div className={styles.getInTouch}>
      <div>
        <h2>Get In Touch</h2>
        <p>
          Contact us with any questions or feedback you may have and well get
          back to you as soon as possible!
        </p>
        <div>
          <Link to="/">Contact</Link>
        </div>
      </div>
    </div>
  );
}
