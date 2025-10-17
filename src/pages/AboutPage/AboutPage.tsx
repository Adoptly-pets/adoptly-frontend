
import OurMission from '../../components/OurMission/OurMission';
import FAQAccordionSection from '../../components/FAQAccordionSection/FAQAccordionSection';

import HeroAboutUs from '../../components/HeroAboutUs/HeroAboutUs';
import './AboutPage.css';

const AboutPage = () => {
  return (
    <div className="container">
      <HeroAboutUs />

      <OurMission />
      <FAQAccordionSection />

    </div>
  );
};

export default AboutPage;
