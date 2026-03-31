import { useTranslation } from 'react-i18next';
import './RequestDetailDrawer.css';

interface AdopterProfile {
  city: string;
  isAdult: boolean;
  housingType: 'apartment' | 'house' | 'other';
  housingOwnership: 'own' | 'rent';
  petsAllowedIfRent: boolean | null;
  householdMembers: string;
  hasOtherAnimals: boolean;
  otherAnimalsDetails: string;
  hasExperience: boolean;
  motivation: string;
  animalLivingPlace: string;
  aloneHours: 'up_to_4' | '4_to_8' | 'over_8';
  willingToCoverCosts: boolean;
  agreedToRules: boolean;
  comment: string;
}

interface RequestData {
  id: string;
  adopterName: string;
  adopterPhone: string;
  adopterEmail: string;
  animalName: string;
  status: 'new' | 'in_progress' | 'closed';
  date: string;
  note: string;
  profile: AdopterProfile;
}

interface RequestDetailDrawerProps {
  request: RequestData | null;
  onClose: () => void;
}

const RequestDetailDrawer: React.FC<RequestDetailDrawerProps> = ({
  request,
  onClose,
}) => {
  const { t } = useTranslation();

  if (!request) return null;

  const { profile } = request;

  const housingLabel = (type: AdopterProfile['housingType']) => {
    const labels: Record<string, string> = {
      apartment: t('shelterDashboard.requests.profile.apartment'),
      house: t('shelterDashboard.requests.profile.house'),
      other: t('shelterDashboard.requests.profile.otherHousing'),
    };
    return labels[type];
  };

  const aloneHoursLabel = (hours: AdopterProfile['aloneHours']) => {
    const labels: Record<string, string> = {
      up_to_4: t('shelterDashboard.requests.profile.upTo4h'),
      '4_to_8': t('shelterDashboard.requests.profile.fourTo8h'),
      over_8: t('shelterDashboard.requests.profile.over8h'),
    };
    return labels[hours];
  };

  const yesNo = (value: boolean) =>
    value
      ? t('shelterDashboard.requests.profile.yes')
      : t('shelterDashboard.requests.profile.no');

  const statusLabel = () => {
    const labels: Record<string, string> = {
      new: t('shelterDashboard.requests.statusNew'),
      in_progress: t('shelterDashboard.requests.statusInProgress'),
      closed: t('shelterDashboard.requests.statusClosed'),
    };
    return labels[request.status];
  };

  const statusClass = () => {
    const classes: Record<string, string> = {
      new: 'drawer-status--new',
      in_progress: 'drawer-status--progress',
      closed: 'drawer-status--closed',
    };
    return classes[request.status];
  };

  return (
    <div className="drawer-overlay" onClick={onClose}>
      <aside
        className="request-drawer"
        onClick={e => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={t('shelterDashboard.requests.profile.title')}
      >
        <div className="drawer-header">
          <div>
            <h2 className="drawer-title">
              {t('shelterDashboard.requests.requestFor')} {request.animalName}
            </h2>
            <span className={`drawer-status ${statusClass()}`}>
              {statusLabel()}
            </span>
          </div>
          <button
            type="button"
            className="drawer-close"
            onClick={onClose}
            aria-label="Close"
          >
            &times;
          </button>
        </div>

        <div className="drawer-body">
          <section className="drawer-section">
            <h3 className="drawer-section-title">
              {t('shelterDashboard.requests.drawer.contacts')}
            </h3>
            <p className="drawer-text drawer-text--bold">
              {request.adopterName}
            </p>
            <p className="drawer-text">{request.adopterPhone}</p>
            <p className="drawer-text">{request.adopterEmail}</p>
            <p className="drawer-text">{profile.city}</p>
          </section>

          <section className="drawer-section">
            <h3 className="drawer-section-title">
              {t('shelterDashboard.requests.drawer.housing')}
            </h3>
            <div className="drawer-detail-grid">
              <div className="drawer-detail">
                <span className="drawer-detail-label">
                  {t('shelterDashboard.requests.profile.housingType')}
                </span>
                <span className="drawer-detail-value">
                  {housingLabel(profile.housingType)}
                </span>
              </div>
              <div className="drawer-detail">
                <span className="drawer-detail-label">
                  {t('shelterDashboard.requests.profile.ownership')}
                </span>
                <span className="drawer-detail-value">
                  {profile.housingOwnership === 'own'
                    ? t('shelterDashboard.requests.profile.own')
                    : t('shelterDashboard.requests.profile.rent')}
                </span>
              </div>
              {profile.housingOwnership === 'rent' &&
                profile.petsAllowedIfRent !== null && (
                  <div className="drawer-detail">
                    <span className="drawer-detail-label">
                      {t(
                        'shelterDashboard.requests.profile.petsAllowedIfRent'
                      )}
                    </span>
                    <span
                      className={`drawer-detail-value ${!profile.petsAllowedIfRent ? 'drawer-detail-value--warning' : ''}`}
                    >
                      {yesNo(profile.petsAllowedIfRent)}
                    </span>
                  </div>
                )}
              <div className="drawer-detail">
                <span className="drawer-detail-label">
                  {t('shelterDashboard.requests.profile.livingPlace')}
                </span>
                <span className="drawer-detail-value">
                  {profile.animalLivingPlace}
                </span>
              </div>
            </div>
          </section>

          <section className="drawer-section">
            <h3 className="drawer-section-title">
              {t('shelterDashboard.requests.drawer.family')}
            </h3>
            <div className="drawer-detail-grid">
              <div className="drawer-detail">
                <span className="drawer-detail-label">
                  {t('shelterDashboard.requests.profile.household')}
                </span>
                <span className="drawer-detail-value">
                  {profile.householdMembers}
                </span>
              </div>
              <div className="drawer-detail">
                <span className="drawer-detail-label">
                  {t('shelterDashboard.requests.profile.otherAnimals')}
                </span>
                <span className="drawer-detail-value">
                  {profile.hasOtherAnimals
                    ? profile.otherAnimalsDetails
                    : yesNo(false)}
                </span>
              </div>
            </div>
          </section>

          <section className="drawer-section">
            <h3 className="drawer-section-title">
              {t('shelterDashboard.requests.drawer.experience')}
            </h3>
            <div className="drawer-detail-grid">
              <div className="drawer-detail">
                <span className="drawer-detail-label">
                  {t('shelterDashboard.requests.profile.experience')}
                </span>
                <span className="drawer-detail-value">
                  {yesNo(profile.hasExperience)}
                </span>
              </div>
              <div className="drawer-detail">
                <span className="drawer-detail-label">
                  {t('shelterDashboard.requests.profile.aloneHours')}
                </span>
                <span
                  className={`drawer-detail-value ${profile.aloneHours === 'over_8' ? 'drawer-detail-value--warning' : ''}`}
                >
                  {aloneHoursLabel(profile.aloneHours)}
                </span>
              </div>
              <div className="drawer-detail">
                <span className="drawer-detail-label">
                  {t('shelterDashboard.requests.profile.costs')}
                </span>
                <span
                  className={`drawer-detail-value ${!profile.willingToCoverCosts ? 'drawer-detail-value--warning' : ''}`}
                >
                  {yesNo(profile.willingToCoverCosts)}
                </span>
              </div>
            </div>
          </section>

          <section className="drawer-section">
            <h3 className="drawer-section-title">
              {t('shelterDashboard.requests.profile.motivation')}
            </h3>
            <p className="drawer-text">{profile.motivation}</p>
          </section>

          {profile.comment && (
            <section className="drawer-section">
              <h3 className="drawer-section-title">
                {t('shelterDashboard.requests.profile.comment')}
              </h3>
              <p className="drawer-text">{profile.comment}</p>
            </section>
          )}

          {request.note && (
            <section className="drawer-section">
              <h3 className="drawer-section-title">
                {t('shelterDashboard.requests.internalNote')}
              </h3>
              <div className="drawer-note">{request.note}</div>
            </section>
          )}
        </div>

        <div className="drawer-actions">
          {request.status === 'new' && (
            <button
              type="button"
              className="drawer-action-btn drawer-action-btn--primary"
            >
              {t('shelterDashboard.requests.startProcessing')}
            </button>
          )}
          {request.status === 'in_progress' && (
            <button
              type="button"
              className="drawer-action-btn drawer-action-btn--primary"
            >
              {t('shelterDashboard.requests.close')}
            </button>
          )}
          <button type="button" className="drawer-action-btn">
            {t('shelterDashboard.requests.addNote')}
          </button>
        </div>
      </aside>
    </div>
  );
};

export default RequestDetailDrawer;
