import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import RequestDetailDrawer from '../RequestDetailDrawer/RequestDetailDrawer';
import './ShelterRequests.css';

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

interface AdoptionRequest {
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

const MOCK_REQUESTS: AdoptionRequest[] = [
  {
    id: '1',
    adopterName: 'Марія Коваль',
    adopterPhone: '+380 (93) 573 21 13',
    adopterEmail: 'koval@gmail.com',
    animalName: 'Тайсон',
    status: 'new',
    date: '28.03.2026',
    note: '',
    profile: {
      city: 'Одеса, вул. Генуезька 24',
      isAdult: true,
      housingType: 'house',
      housingOwnership: 'own',
      petsAllowedIfRent: null,
      householdMembers: 'Дорослі — 2, діти — 1 (8 років)',
      hasOtherAnimals: false,
      otherAnimalsDetails: '',
      hasExperience: true,
      motivation:
        'Хочемо познайомитись з Тайсоном. Живемо у приватному будинку з великим двором. Давно мріємо про собаку для сина.',
      animalLivingPlace: 'В домі, з доступом у двір',
      aloneHours: 'up_to_4',
      willingToCoverCosts: true,
      agreedToRules: true,
      comment: '',
    },
  },
  {
    id: '2',
    adopterName: 'Олександр Шевченко',
    adopterPhone: '+380 (50) 123 45 67',
    adopterEmail: 'shevchenko@gmail.com',
    animalName: 'Мурка',
    status: 'in_progress',
    date: '25.03.2026',
    note: 'Домовились про візит на суботу',
    profile: {
      city: 'Київ, бул. Лесі Українки 7',
      isAdult: true,
      housingType: 'apartment',
      housingOwnership: 'rent',
      petsAllowedIfRent: true,
      householdMembers: 'Дорослі — 2',
      hasOtherAnimals: true,
      otherAnimalsDetails: 'Кіт, 3 роки',
      hasExperience: true,
      motivation:
        'Шукаємо кішечку для нашої родини. Маємо досвід з тваринами, наш кіт дуже товариський.',
      animalLivingPlace: 'В квартирі',
      aloneHours: '4_to_8',
      willingToCoverCosts: true,
      agreedToRules: true,
      comment: '',
    },
  },
  {
    id: '3',
    adopterName: 'Ірина Бондар',
    adopterPhone: '+380 (67) 987 65 43',
    adopterEmail: 'bondar@gmail.com',
    animalName: 'Ліза',
    status: 'closed',
    date: '20.03.2026',
    note: 'Усиновлення завершено 22.03',
    profile: {
      city: 'Одеса, вул. Дерибасівська 15',
      isAdult: true,
      housingType: 'apartment',
      housingOwnership: 'own',
      petsAllowedIfRent: null,
      householdMembers: 'Дорослі — 1, літня мама',
      hasOtherAnimals: false,
      otherAnimalsDetails: '',
      hasExperience: false,
      motivation:
        'Дуже сподобалась Ліза! Живу одна з мамою, хочемо мати компаньйона. Готова навчатись догляду.',
      animalLivingPlace: 'Лише всередині квартири',
      aloneHours: 'up_to_4',
      willingToCoverCosts: true,
      agreedToRules: true,
      comment: 'Можу приїхати у будь-який зручний час',
    },
  },
];

const ShelterRequests: React.FC = () => {
  const { t } = useTranslation();
  const [selectedRequest, setSelectedRequest] =
    useState<AdoptionRequest | null>(null);

  const statusLabel = (status: AdoptionRequest['status']) => {
    const labels: Record<string, string> = {
      new: t('shelterDashboard.requests.statusNew'),
      in_progress: t('shelterDashboard.requests.statusInProgress'),
      closed: t('shelterDashboard.requests.statusClosed'),
    };
    return labels[status];
  };

  const statusClass = (status: AdoptionRequest['status']) => {
    const classes: Record<string, string> = {
      new: 'request-status--new',
      in_progress: 'request-status--progress',
      closed: 'request-status--closed',
    };
    return classes[status];
  };

  const housingShort = (profile: AdopterProfile) => {
    const labels: Record<string, string> = {
      apartment: t('shelterDashboard.requests.profile.apartment'),
      house: t('shelterDashboard.requests.profile.house'),
      other: t('shelterDashboard.requests.profile.otherHousing'),
    };
    return labels[profile.housingType];
  };

  const aloneHoursShort = (profile: AdopterProfile) => {
    const labels: Record<string, string> = {
      up_to_4: t('shelterDashboard.requests.summary.upTo4h'),
      '4_to_8': t('shelterDashboard.requests.summary.fourTo8h'),
      over_8: t('shelterDashboard.requests.summary.over8h'),
    };
    return labels[profile.aloneHours];
  };

  const buildSummaryTags = (profile: AdopterProfile) => {
    const yes = t('shelterDashboard.requests.profile.yes');
    const no = t('shelterDashboard.requests.profile.no');
    return [
      housingShort(profile),
      profile.housingOwnership === 'own'
        ? t('shelterDashboard.requests.profile.own').toLowerCase()
        : t('shelterDashboard.requests.profile.rent').toLowerCase(),
      `${t('shelterDashboard.requests.summary.animals')}: ${profile.hasOtherAnimals ? yes.toLowerCase() : no.toLowerCase()}`,
      `${t('shelterDashboard.requests.summary.exp')}: ${profile.hasExperience ? yes.toLowerCase() : no.toLowerCase()}`,
      aloneHoursShort(profile),
    ];
  };

  const truncate = (text: string, maxLength: number) =>
    text.length > maxLength ? text.slice(0, maxLength) + '...' : text;

  return (
    <div className="shelter-requests">
      <h2 className="shelter-requests-title">
        {t('shelterDashboard.requests.title')}
      </h2>

      <div className="shelter-requests-list">
        {MOCK_REQUESTS.map(request => (
          <div key={request.id} className="shelter-request-card">
            <div className="request-card-row">
              <h3 className="request-card-animal">
                {t('shelterDashboard.requests.requestFor')}{' '}
                {request.animalName}
              </h3>
              <span
                className={`request-card-status ${statusClass(request.status)}`}
              >
                {statusLabel(request.status)}
              </span>
            </div>

            <div className="request-card-row">
              <span className="request-card-name">{request.adopterName}</span>
              <span className="request-card-date">{request.date}</span>
            </div>

            <p className="request-card-contacts">
              {request.adopterPhone} &middot; {request.adopterEmail} &middot;{' '}
              {request.profile.city.split(',')[0]}
            </p>

            <div className="request-card-tags">
              {buildSummaryTags(request.profile).map(tag => (
                <span key={tag} className="request-card-tag">
                  {tag}
                </span>
              ))}
            </div>

            <p className="request-card-motivation">
              {truncate(request.profile.motivation, 100)}
            </p>

            <div className="request-card-actions">
              {request.status === 'new' && (
                <button
                  type="button"
                  className="request-action-btn request-action-btn--primary"
                >
                  {t('shelterDashboard.requests.startProcessing')}
                </button>
              )}
              {request.status === 'in_progress' && (
                <button
                  type="button"
                  className="request-action-btn request-action-btn--primary"
                >
                  {t('shelterDashboard.requests.close')}
                </button>
              )}
              <button
                type="button"
                className="request-action-btn"
                onClick={() => setSelectedRequest(request)}
              >
                {t('shelterDashboard.requests.viewProfile')}
              </button>
              <button type="button" className="request-action-btn">
                {t('shelterDashboard.requests.addNote')}
              </button>
            </div>
          </div>
        ))}
      </div>

      <RequestDetailDrawer
        request={selectedRequest}
        onClose={() => setSelectedRequest(null)}
      />
    </div>
  );
};

export default ShelterRequests;
