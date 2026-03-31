import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import ShelterSidebar from '../../components/ShelterSidebar/ShelterSidebar';
import ShelterProfileForm from '../../components/ShelterProfileForm/ShelterProfileForm';
import AnimalCardsList from '../../components/AnimalCardsList/AnimalCardsList';
import ShelterRequests from '../../components/ShelterRequests/ShelterRequests';
import ShelterAnalytics from '../../components/ShelterAnalytics/ShelterAnalytics';
import './ShelterDashboardPage.css';

type ShelterTab = 'profile' | 'animals' | 'requests' | 'analytics';

const ShelterDashboardPage = () => {
  const [activeTab, setActiveTab] = useState<ShelterTab>('profile');
  const { t } = useTranslation();

  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return <ShelterProfileForm />;
      case 'animals':
        return <AnimalCardsList />;
      case 'requests':
        return <ShelterRequests />;
      case 'analytics':
        return <ShelterAnalytics />;
      default:
        return <ShelterProfileForm />;
    }
  };

  return (
    <div className="shelter-dashboard">
      <div className="container">
        <div className="shelter-dashboard-layout">
          <ShelterSidebar
            shelterName={t('shelterDashboard.demoShelterName')}
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />
          <main className="shelter-dashboard-content">
            {renderContent()}
          </main>
        </div>
      </div>
    </div>
  );
};

export default ShelterDashboardPage;
