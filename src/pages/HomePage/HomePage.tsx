import './HomePage.css';
import HowItWorks from '../../components/HowItWorks/HowItWorks';
import HeroSection from '../../components/HeroSection/HeroSection';
import OurSkillsInNumbers from '../../components/OurSkillsInNumbers/OurSkillsInNumbers';
import TrustAndPartnershipSection from '../../components/Trust&PartnershipSection/TrustAndPartnershipSection';

const HomePage = () => {
  return (
    <div className="container">
      <HeroSection />
      <HowItWorks />
      <TrustAndPartnershipSection />
      <OurSkillsInNumbers />
    </div>
  );
};

export default HomePage;
