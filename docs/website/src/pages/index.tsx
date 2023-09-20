import React from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import Layout from "@theme/Layout";
import SvgGears from "@site/static/img/home/gears.svg";
import SvgArrowsCircle from "@site/static/img/home/arrows_circle.svg";
import SvgBusinessMane from "@site/static/img/home/business_man.svg";
import SvgComputerBooks from "@site/static/img/home/computer_books.svg";

import styles from "./index.module.css";

export default function Home(): JSX.Element {
  return (
    <Layout
      title={`BonFHIR`}
      description="A collection of projects and libraries to help implement FHIR-based products and solutions."
    >
      <HomepageHeader />
      <main>
        <Benefits />
        <GetStarted />
      </main>
    </Layout>
  );
}

function HomepageHeader() {
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
            <Link to="/get-started">Get Started</Link>
          </div>
        </div>
        <div className={styles.rightColumn}>
          <SvgComputerBooks role="img" />
        </div>
      </div>
    </div>
  );
}
