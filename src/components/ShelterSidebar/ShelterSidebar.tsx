import { useTranslation } from 'react-i18next';
import './ShelterSidebar.css';

type ShelterTab = 'profile' | 'animals' | 'requests' | 'analytics';

interface ShelterSidebarProps {
  shelterName: string;
  activeTab: ShelterTab;
  onTabChange: (tab: ShelterTab) => void;
}

const ShelterSidebar: React.FC<ShelterSidebarProps> = ({
  shelterName,
  activeTab,
  onTabChange,
}) => {
  const { t } = useTranslation();

  const tabs: { key: ShelterTab; label: string }[] = [
    { key: 'profile', label: t('shelterDashboard.sidebar.profile') },
    { key: 'animals', label: t('shelterDashboard.sidebar.animals') },
    { key: 'requests', label: t('shelterDashboard.sidebar.requests') },
    { key: 'analytics', label: t('shelterDashboard.sidebar.analytics') },
  ];

  return (
    <aside className="shelter-sidebar">
      <h2 className="shelter-sidebar-name">{shelterName}</h2>

      <nav>
        <ul className="shelter-sidebar-list">
          {tabs.map(tab => (
            <li key={tab.key}>
              <button
                className={`shelter-sidebar-link ${activeTab === tab.key ? 'shelter-sidebar-link--active' : ''}`}
                onClick={() => onTabChange(tab.key)}
                type="button"
              >
                {tab.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default ShelterSidebar;
