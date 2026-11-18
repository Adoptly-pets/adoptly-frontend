import { useTranslation } from 'react-i18next';
import Button from '../../../components/Button/Button';
import { langLink } from '../../../utils/routing';

const ShelterPetsPage = () => {
  const { t } = useTranslation();
  return (
    <div>
      <h1>{t('shelter.pages.pets.title')}</h1>
      <Button to={langLink('/shelter/pets/new')} maxWidth="200px" height="45px">
        {t('shelter.pages.pets.addPet')}
      </Button>
    </div>
  );
};

export default ShelterPetsPage;
