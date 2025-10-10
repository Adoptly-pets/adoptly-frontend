import Accordionitem from '../../components/AccordionItem/AccordionItem';
import HeroAboutUs from '../../components/HeroAboutUs/HeroAboutUs';
import './AboutPage.css';

const AboutPage = () => {
  return (
    <div className="container">
      <HeroAboutUs />
      <Accordionitem />
    </div>
  );
};

export default AboutPage;
