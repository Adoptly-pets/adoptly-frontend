import './HomePage.css';
import HowItWorks from '../../components/HowItWorks/HowItWorks';
import HeroSection from '../../components/HeroSection/HeroSection';
import OurSkillsInNumbers from '../../components/OurSkillsInNumbers/OurSkillsInNumbers';
import HappyStorySection from '../../components/HappyStorySection/HappyStorySection';
import TrustAndPartnershipSection from '../../components/Trust&PartnershipSection/TrustAndPartnershipSection';

const HomePage = () => {
  return (
    <div className="container">
      <HeroSection />
      <HowItWorks />
      <TrustAndPartnershipSection />
      <OurSkillsInNumbers />
      <HappyStorySection />
    </div>
  );
};

export default HomePage;
