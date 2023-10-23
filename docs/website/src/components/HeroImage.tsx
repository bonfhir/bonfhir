import React from "react";
import styles from "../pages/index.module.css";
import PngMackbookMockup from "@site/static/img/home/Macbook_Air_Mockup.png";
import PngIPadMockup from "@site/static/img/home/bonfhir-tablet.png";
import PngPhoneMockup from "@site/static/img/home/bonfhir-phone.png";
import PngMackbookImg1 from "@site/static/img/home/Macbook_EHR_1.png";
import PngMackbookImg2 from "@site/static/img/home/Macbook_EHR_2.png";
import PngMackbookImg3 from "@site/static/img/home/Macbook_EHR_3.png";
import { classnames } from '@site/src/helpers'

export default function HeroImage(): JSX.Element {
  return (
    <div className={styles.heroImageContainer} >
      <div className={styles.imagesMask}>
        <div className={styles.animatingImageContainer}>
          <img src={PngMackbookImg1} alt="Screenshot 1" className={classnames([styles.screenshot, styles.screenshot1])}/>
          <img src={PngMackbookImg2} alt="Screenshot 2" className={classnames([styles.screenshot, styles.screenshot3])}/>
          <img src={PngMackbookImg3} alt="Screenshot 3" className={classnames([styles.screenshot, styles.screenshot2])}/>
          <img src={PngMackbookImg1} alt="Screenshot 1" className={classnames([styles.screenshot, styles.screenshot4])}/>
        </div>
      </div>
      <img src={PngMackbookMockup} alt="Mackbook Pro Mockup" className={styles.macMockup}/>
      <img src={PngIPadMockup} alt="Tablet Mockup" className={styles.tabletMockup}/>
      <img src={PngPhoneMockup} alt="Phone Mockup" className={styles.phoneMockup}/>
    </div>
  );
}
