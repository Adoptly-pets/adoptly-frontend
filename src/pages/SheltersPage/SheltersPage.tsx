import SheltersFAQ from '../../components/SheltersFAQ/SheltersFAQ';
import BenefitsOfCooperation from '../../components/BenefitsOfCooperation/BenefitsOfCoopertation';
import ShelterSupportSection from '../../components/ShelterSupportSection/ShelterSupportSection';
import SheltersHero from '../../components/SheltersHero/SheltersHero';

const SheltersPage = () => {
  return (
    <div className="container">
      <SheltersHero />
      <BenefitsOfCooperation />
      <SheltersFAQ />

      <ShelterSupportSection />
    </div>
  );
};
export default SheltersPage;
