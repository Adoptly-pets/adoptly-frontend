

import Carousel from '../../components/Carousel/Carousel';
import OurMission from '../../components/OurMission/OurMission';
import FAQAccordionSection from '../../components/FAQAccordionSection/FAQAccordionSection';

import HeroAboutUs from '../../components/HeroAboutUs/HeroAboutUs';
import './AboutPage.css';

const AboutPage = () => {
  return (
    <div className="container">
      <HeroAboutUs />
      <OurMission />
      <Carousel />
      <FAQAccordionSection />
    </div>
  );
};

export default AboutPage;
