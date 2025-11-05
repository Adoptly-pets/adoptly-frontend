import SheltersFAQ from '../../components/SheltersFAQ/SheltersFAQ';

import ShelterSupportSection from '../../components/ShelterSupportSection/ShelterSupportSection';
import SheltersHero from '../../components/SheltersHero/SheltersHero';

const SheltersPage = () => {
  return (
    <div className="container">
      <SheltersHero />

      <SheltersFAQ />

      <ShelterSupportSection />
    </div>
  );
};
export default SheltersPage;
