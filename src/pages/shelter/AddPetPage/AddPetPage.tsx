import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import styles from './AddPetPage.module.css';
import { langLink } from '../../../utils/routing';
import Button from '../../../components/Button/Button';

const DESCRIPTION_MAX = 1500;

const AddPetPage = () => {
  const { t } = useTranslation();

  return (
    <div>
      <div className={styles.header}>
        <h1>{t('shelter.pages.addPet.title')}</h1>
        <Link to={langLink('/shelter/pets')}>
          {t('shelter.pages.addPet.backToList')}
        </Link>
      </div>
      <form className={styles.form}>
        <div className={styles.petName}>
          <label htmlFor="petName">
            {t('shelter.pages.addPet.fields.name')}
            <span className={styles.required}>*</span>
          </label>
          <input
            type="text"
            id="petName"
            placeholder={t('shelter.pages.addPet.placeholders.name')}
          />
        </div>
        <div className={styles.row}>
          <div className={styles.petType}>
            <label htmlFor="petType">
              {t('shelter.pages.addPet.fields.species')}
              <span className={styles.required}>*</span>
            </label>
            <select id="petType">
              <option value="">
                {t('shelter.pages.addPet.placeholders.species')}
              </option>
              <option value="DOG">
                {t('shelter.pages.addPet.options.species.DOG')}
              </option>
              <option value="CAT">
                {t('shelter.pages.addPet.options.species.CAT')}
              </option>
            </select>
          </div>
          <fieldset className={styles.petGender}>
            <legend>
              {t('shelter.pages.addPet.fields.gender')}
              <span className={styles.required}>*</span>
            </legend>
            <label>
              <input type="radio" name="gender" value="MALE" />{' '}
              {t('shelter.pages.addPet.options.gender.MALE')}
            </label>
            <label>
              <input type="radio" name="gender" value="FEMALE" />{' '}
              {t('shelter.pages.addPet.options.gender.FEMALE')}
            </label>
          </fieldset>
        </div>
        <div className={styles.petDescription}>
          <label htmlFor="petDescription">
            {t('shelter.pages.addPet.fields.description')}
            <span className={styles.required}>*</span>
          </label>
          <textarea
            id="petDescription"
            placeholder={t('shelter.pages.addPet.placeholders.description')}
            maxLength={DESCRIPTION_MAX}
            rows={5}
          />
          <p>{t('shelter.pages.addPet.counter', { count: DESCRIPTION_MAX })}</p>
        </div>
        <div className={styles.saveCard}>
          <Button variant="primary" maxWidth={250} height={50} type="submit">
            {t('shelter.pages.addPet.submit')}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddPetPage;
