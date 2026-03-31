import { useTranslation } from 'react-i18next';
import './ShelterAnalytics.css';

const ShelterAnalytics: React.FC = () => {
  const { t } = useTranslation();

  const stats = [
    {
      label: t('shelterDashboard.analytics.totalAnimals'),
      value: 24,
      color: '#0054d6',
    },
    {
      label: t('shelterDashboard.analytics.inShelter'),
      value: 15,
      color: '#2e7d32',
    },
    {
      label: t('shelterDashboard.analytics.reserved'),
      value: 4,
      color: '#e65100',
    },
    {
      label: t('shelterDashboard.analytics.adopted'),
      value: 5,
      color: '#1565c0',
    },
  ];

  const healthStats = [
    {
      label: t('shelterDashboard.analytics.vaccinated'),
      value: 20,
      total: 24,
    },
    {
      label: t('shelterDashboard.analytics.sterilized'),
      value: 16,
      total: 24,
    },
    {
      label: t('shelterDashboard.analytics.dewormed'),
      value: 22,
      total: 24,
    },
  ];

  const adoptionsByMonth = [
    { month: t('shelterDashboard.analytics.jan'), count: 2 },
    { month: t('shelterDashboard.analytics.feb'), count: 3 },
    { month: t('shelterDashboard.analytics.mar'), count: 5 },
  ];

  const maxAdoptions = Math.max(...adoptionsByMonth.map(m => m.count));

  return (
    <div className="shelter-analytics">
      <h2 className="shelter-analytics-title">
        {t('shelterDashboard.analytics.title')}
      </h2>

      <div className="analytics-stats-grid">
        {stats.map(stat => (
          <div key={stat.label} className="analytics-stat-card">
            <span
              className="analytics-stat-value"
              style={{ color: stat.color }}
            >
              {stat.value}
            </span>
            <span className="analytics-stat-label">{stat.label}</span>
          </div>
        ))}
      </div>

      <div className="analytics-sections">
        <div className="analytics-section">
          <h3 className="analytics-section-title">
            {t('shelterDashboard.analytics.statusDistribution')}
          </h3>
          <div className="analytics-bar-chart">
            {stats.slice(1).map(stat => (
              <div key={stat.label} className="analytics-bar-row">
                <span className="analytics-bar-label">{stat.label}</span>
                <div className="analytics-bar-track">
                  <div
                    className="analytics-bar-fill"
                    style={{
                      width: `${(stat.value / 24) * 100}%`,
                      backgroundColor: stat.color,
                    }}
                  />
                </div>
                <span className="analytics-bar-value">{stat.value}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="analytics-section">
          <h3 className="analytics-section-title">
            {t('shelterDashboard.analytics.healthOverview')}
          </h3>
          <div className="analytics-health-list">
            {healthStats.map(stat => (
              <div key={stat.label} className="analytics-health-item">
                <div className="analytics-health-info">
                  <span className="analytics-health-label">{stat.label}</span>
                  <span className="analytics-health-value">
                    {stat.value}/{stat.total}
                  </span>
                </div>
                <div className="analytics-progress-track">
                  <div
                    className="analytics-progress-fill"
                    style={{
                      width: `${(stat.value / stat.total) * 100}%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="analytics-section">
          <h3 className="analytics-section-title">
            {t('shelterDashboard.analytics.adoptionsPerMonth')}
          </h3>
          <div className="analytics-chart">
            {adoptionsByMonth.map(m => (
              <div key={m.month} className="analytics-chart-bar">
                <div className="analytics-chart-bar-wrapper">
                  <div
                    className="analytics-chart-bar-fill"
                    style={{
                      height: `${(m.count / maxAdoptions) * 100}%`,
                    }}
                  />
                </div>
                <span className="analytics-chart-count">{m.count}</span>
                <span className="analytics-chart-label">{m.month}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShelterAnalytics;
