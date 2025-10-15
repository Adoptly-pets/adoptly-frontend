import Carousel from '../../components/Carousel/Carousel';
import FAQAccordionSection from '../../components/FAQAccordionSection/FAQAccordionSection';
import HeroAboutUs from '../../components/HeroAboutUs/HeroAboutUs';
import './AboutPage.css';

const AboutPage = () => {
  return (
    <div className="container">
      <HeroAboutUs />
      <Carousel />
      <FAQAccordionSection />
    </div>
  );
};

export default AboutPage;
