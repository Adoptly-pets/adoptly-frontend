import OurMission from '../../components/OurMission/OurMission';
import HeroAboutUs from '../../components/HeroAboutUs/HeroAboutUs';
import './AboutPage.css';

const AboutPage = () => {
  return (
    <div className="container">
      <HeroAboutUs />
      <OurMission />
    </div>
  );
};

export default AboutPage;
