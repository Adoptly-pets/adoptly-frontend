import FAQAccordionSection from '../../components/FAQAccordionSection/FAQAccordionSection';
import HeroAboutUs from '../../components/HeroAboutUs/HeroAboutUs';
import './AboutPage.css';

const AboutPage = () => {
  return (
    <div className="container">
      <HeroAboutUs />
      <FAQAccordionSection />
    </div>
  );
};

export default AboutPage;
