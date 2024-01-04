import React from "react";
import Link from "@docusaurus/Link";
import Layout from "@theme/Layout";
import SvgGears from "@site/static/img/home/gears.svg";
import SvgBusinessMane from "@site/static/img/home/business_man.svg";
import SvgComputerBooks from "@site/static/img/home/computer_books.svg";
import SvgComputerDevices from "@site/static/img/home/computer_devices.svg";
import SvgBrowserSlider from "@site/static/img/home/browser-slider.svg";
import SvgBattery from "@site/static/img/home/battery.svg";
import SvgAcn from "@site/static/img/home/acn_logo.svg";
import SvgEnsage from "@site/static/img/home/ensage_logo.svg";
import PngChamber from "@site/static/img/home/chamber_logo.png";
import SvgBonfhir from "@site/static/img/bonfhir_logo.svg";
import SvgYoutubeIcon from "@site/static/img/home/youtube_icon.svg";
import styles from "./index.module.css";
import { classnames } from "@site/src/helpers";
import HeroImage from "@site/src/components/HeroImage";
import { useHistory } from "@docusaurus/router";

export default function Home(): JSX.Element {
  return (
    <Layout description="A collection of projects and libraries to help implement FHIR-based products and solutions.">
      <HomepageHeader />
      <main>
        <WhatIs />
        <ReadyToLearn />
        <BatteriesIncluded />
        <GetInTouch />
        <UsedBy />
      </main>
      <Footer />
    </Layout>
  );
}

function HomepageHeader() {
  return (
    <header className={classnames([styles.heroBanner, styles.section])}>
      <div
        className={classnames([
          styles.sectionContainer,
          styles.heroBannerWrapper,
        ])}
      >
        <div className={styles.verticalStack}>
          <h1>Easily harness the potential of FHIR in your apps</h1>
          <h2>Accelerate your healthcare app development</h2>
          <p className={styles.heroSubtitle}>
            <em>FHIR is awesome.</em> Let's face it though, getting started and
            creating a FHIR solution can be quite daunting.
            <br />
            Let BonFHIR help!
          </p>
          <div className={styles.ctaButtonParent}>
            <Link
              className={classnames([styles.ctaButton, styles.learnMore])}
              to="/docs/welcome"
            >
              Learn More
            </Link>
          </div>
        </div>
        <div className={styles.heroImageWrapper}>
          <HeroImage />
        </div>
      </div>
    </header>
  );
}

function PresentationSection({
  items,
  theme = "light",
}: {
  items: {
    classNames?: string[];
    img: JSX.Element;
    title: string;
    text?: string;
  }[];
  theme?: "dark" | "light";
}) {
  return (
    <div className={styles.presentationSection}>
      {items.map(({ title, text, img, classNames = [] }, idx) => (
        <div
          key={idx}
          className={classnames([
            styles.presentationSectionItem,
            ...(theme === "dark" ? [styles.presentationSectionItemDark] : []),
            ...classNames,
          ])}
        >
          {img}
          <h4>{title}</h4>
          <p>{text}</p>
        </div>
      ))}
    </div>
  );
}

function WhatIs() {
  return (
    <div className={classnames([styles.section, styles.whatIs])}>
      <div
        className={classnames([styles.sectionContainer, styles.whatIsWrapper])}
      >
        <h1>What is BonFHIR?</h1>
        <PresentationSection
          items={[
            {
              img: <SvgGears role="img" />,
              title: "For Developers",
              text: "BonFHIR allows developers to focus on building great features, instead of creating the plumbing. You can build high-quality apps faster, and avoid the tedious low-level work required to handle FHIR resources.",
            },
            {
              img: <SvgComputerDevices role="img" />,
              title: "For Products Owners",
              text: "BonFHIR brings the best Healthcare tech experience to your users. Instead of subjecting them to un-ergonomic generic screens and workflows assembled from disparate apps, you can deliver a tailored experience that clinicians, clinical ops and patients enjoy every day.",
            },
            {
              img: <SvgBusinessMane role="img" />,
              title: "For CTOs",
              text: "BonFHIR was built to work with FHIR. So your data is guaranteed be in full compliance with the latest health specifications requirements. It enables easier integrations and certifications. It allows your team to deliver faster, while adhering to a sound and proven domain model and standard.",
            },
          ]}
        />
      </div>
    </div>
  );
}

function ReadyToLearn() {
  return (
    <div className={classnames([styles.section, styles.readyToLearn])}>
      <div
        className={classnames([
          styles.sectionContainer,
          styles.readyToLearnWrapper,
        ])}
      >
        <div className={styles.leftColumn}>
          <div className={styles.learnTitle}>
            <SvgComputerBooks role="img" />
            <h1>Ready to learn?</h1>
          </div>
          <p>
            We provide you with a library of video tutorials and templates for a
            smooth onboarding and fast setup. Learn to design your own
            customizable applications.
          </p>
          <div>
            <Link
              to="/docs/welcome"
              className={classnames([styles.ctaButton, styles.getStarted])}
            >
              Get Started
            </Link>
          </div>
        </div>
        <div className={styles.rightColumn}>
          <SvgComputerBooks role="img" />
        </div>
      </div>
    </div>
  );
}

function BatteriesIncluded() {
  const history = useHistory();
  const sections = [
    {
      title: "FHIR Client",
      text: "Built-in FHIR client with bundle navigator, dynamic proxies, batch execution, resource merging capabilities & more",
      link: "/packages/core/fhir-client",
    },
    {
      title: "FHIR Resources & DataTypes",
      text: "Complete type definitions for R4b and R5, including search parameter builders",
      link: "/packages/core/fhir-types",
    },
    {
      title: "GraphQL support",
      text: "Query your FHIR data using typed GraphQL",
      link: "/packages/core/fhir-client#graphql",
    },
    {
      title: "FHIR Subscriptions",
      text: "Subscribe and react to FHIR subscriptions to orchestrate your own workflows",
      link: "/packages/subscriptions",
    },
    {
      title: "Localized formatters",
      text: "Format and present FHIR values localized in any language - we even have address formatting based on official country rules!",
      link: "/packages/core/data-types-formatters",
    },
    {
      title: "React state management",
      text: "Based on React query, customized for the FHIR Rest & GraphQL APIs",
      link: "/packages/query",
    },
    {
      title: "React UI components",
      text: "Values, forms, inputs, tables, pagination, query loaders… and you can completely customize the rendering! Build any application you can dream of",
      link: "/packages/react",
    },
    {
      title: "AWS Lambda",
      text: "Support for execution in serverless environments",
      link: "/packages/subscriptions/aws-lambda",
    },
    {
      title: "Next.js support",
      text: "Create your front-end app and api using Next.js",
    },
    {
      title: "Custom FHIR resources",
      text: "handle FHIR profiles alongside standard FHIR resources",
      link: "/packages/core/extending-fhir-resources",
    },
    {
      title: "US Core resources",
      text: "Support for US Core specific extensions",
    },
    {
      title: "Code generation",
      text: "Generate any code you like using FHIR definition files and your own templates",
    },
  ];
  return (
    <div className={classnames([styles.section, styles.batteriesIncluded])}>
      <div
        className={classnames([
          styles.sectionContainer,
          styles.batteriesIncludedWrapper,
        ])}
      >
        <div className={styles.titleWrapper}>
          <SvgBattery role="img" />
          <h1>Batteries Included</h1>
          <SvgBattery role="img" />
        </div>
        <div className={styles.batteriesIncludedItems}>
          {sections.map(({ title, text, link }, idx) => (
            <div
              key={idx}
              className={styles.batteriesIncludedItem}
              onClick={link ? () => history.push(link) : undefined}
              style={{ cursor: link ? "pointer" : "default" }}
            >
              <h4>{title}</h4>
              <p>{text}</p>
            </div>
          ))}
        </div>
        <div className={styles.packageDocs}>
          <Link className={classnames([styles.ctaButton])} to="/packages/intro">
            View packages documentation
          </Link>
        </div>
      </div>
    </div>
  );
}

function GetInTouch() {
  return (
    <div className={classnames([styles.section, styles.getInTouch])}>
      <div
        className={classnames([
          styles.sectionContainer,
          styles.getInTouchWrapper,
        ])}
      >
        <div className={styles.getInTouchTitles}>
          <h1>How Can We Help?</h1>
          <p className={styles.getInTouchSubtitle}>
            Let the people that maintain bonFHIR help you succeed in your
            healthcare project implementation.
          </p>
        </div>
        <PresentationSection
          items={[
            {
              img: <SvgGears role="img" className={styles.darkSvg} />,
              title: "Team Services",
              text: "Hire the creators of bonFHIR to design, implement and deliver the solution you have in mind. ",
            },
            {
              img: <SvgBrowserSlider role="img" className={styles.darkSvg} />,
              title: "Product Design",
              text: "Need help with the UX/UI of your interface? Add one of our Product Designers to your team.",
            },
            {
              img: <SvgBusinessMane role="img" className={styles.darkSvg} />,
              title: "Consulting",
              text: "Our technical consultants can help you understand how and where bonFHIR can be integrated with your current environment.",
            },
          ]}
          theme={"dark"}
        />
        <div>
          <a
            href="mailto:info@alleycorpnord.com?subject=bonFHIR%20inquiry"
            target="_blank"
            rel="noopener noreferrer"
            className={classnames([styles.ctaButton])}
          >
            Contact us
          </a>
        </div>
      </div>
    </div>
  );
}

function UsedBy() {
  return (
    <div className={classnames([styles.section, styles.usedBy])}>
      <div
        className={classnames([styles.sectionContainer, styles.usedByWrapper])}
      >
        <h1>Used by</h1>
        <div className={styles.usedByLogos}>
          <SvgAcn />
          <SvgEnsage />
          <img src={PngChamber} alt="Chamber" />
        </div>
      </div>
    </div>
  );
}

function Footer() {
  return (
    <div className={styles.footer}>
      <SvgBonfhir />
      <p>
        BonFHIR is an open source project by{" "}
        <a href={"https://alleycorpnord.com"}>AlleyCorp Nord</a>, initially
        built to support <a href={"https://alleycorp.com"}>Alley Corp</a>{" "}
        portfolio companies.
      </p>
      <a
        className={styles.youtube}
        href={"https://www.youtube.com/channel/UCncSPtWNFdieSbksbUdIPaw"}
      >
        <div>YouTube</div>
        <SvgYoutubeIcon />
      </a>
    </div>
  );
}
