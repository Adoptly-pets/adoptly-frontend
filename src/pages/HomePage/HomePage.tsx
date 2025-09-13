import './HomePage.css';
import HowItWorks from '../../components/HowItWorks/HowItWorks';
import HeroSection from '../../components/HeroSection/HeroSection';
import OurSkillsInNumbers from '../../components/OurSkillsInNumbers/OurSkillsInNumbers';
import HappyStorySection from '../../components/HappyStorySection/HappyStorySection';
import TrustAndPartnershipSection from '../../components/TrustAndPartnershipSection/TrustAndPartnershipSection';
import ReadyToAdopt from '../../components/ReadyToAdopt/ReadyToAdopt';

const HomePage = () => {
  return (
    <div className="container">
      <HeroSection />
      <HowItWorks />
      <TrustAndPartnershipSection />
      <OurSkillsInNumbers />
      <HappyStorySection />
      <ReadyToAdopt />
    </div>
  );
};

export default HomePage;
