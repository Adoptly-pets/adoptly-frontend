import { useTranslation } from 'react-i18next';
import useMyShelter from '../../../hooks/useMyShelter';
import ShelterProfileForm from '../../../components/shelter/ShelterProfileForm/ShelterProfileForm';

const ShelterProfilePage = () => {
  const { t } = useTranslation();
  const state = useMyShelter();

  if (state.status === 'loading') return <p>{t('common.loading')}</p>;
  if (state.status === 'error')
    return <p role="alert">{t('shelter.pages.profile.loadError')}</p>;
  return <ShelterProfileForm savedShelter={state.shelter} />;
};
export default ShelterProfilePage;
