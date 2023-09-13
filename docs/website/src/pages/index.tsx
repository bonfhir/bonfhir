import React from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import HomepageFeatures from "@site/src/components/HomepageFeatures";

import styles from "./index.module.css";

export default function Home(): JSX.Element {
  return (
    <Layout
      title={`BonFHIR`}
      description="A collection of projects and libraries to help implement FHIR-based products and solutions."
    >
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx(styles.heroBanner)}>
      <div>
        <div>
          <div className={clsx(styles.verticalStack)}>
            <h1>Accelerate the creation of FHIR apps</h1>
            <div className={clsx(styles.heroSubtitle)}>
              <em>FHIR is awesome.</em> Let's face it though, getting started
              and creating a FHIR solution can be quite daunting. Let BonFHIR
              help!
            </div>
            <div>
              <div>
                <Link className={clsx(styles.learnMore)} to="/learn-more">
                  LEARN MORE
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
