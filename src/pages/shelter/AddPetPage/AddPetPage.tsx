import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import styles from './AddPetPage.module.css';
import { langLink } from '../../../utils/routing';
import Button from '../../../components/Button/Button';
import { useForm } from 'react-hook-form';
import { Gender, Species } from '../../../types/pet';

type AddPetFormData = {
  name: string;
  species: Species | '';
  gender: Gender | '';
  description: string;
};

const DESCRIPTION_MAX = 1500;

const AddPetPage = () => {
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<AddPetFormData>({
    defaultValues: {
      name: '',
      species: '',
      gender: '',
      description: '',
    },
  });

  const description = watch('description');

  const onDataSubmit = (data: AddPetFormData) => {
    console.log(data);
  };

  return (
    <div>
      <div className={styles.header}>
        <h1>{t('shelter.pages.addPet.title')}</h1>
        <Link to={langLink('/shelter/pets')}>
          {t('shelter.pages.addPet.backToList')}
        </Link>
      </div>
      <form className={styles.form} onSubmit={handleSubmit(onDataSubmit)}>
        <div className={styles.petName}>
          <label htmlFor="petName">
            {t('shelter.pages.addPet.fields.name')}
            <span className={styles.required}>*</span>
          </label>
          <input
            type="text"
            id="petName"
            placeholder={t('shelter.pages.addPet.placeholders.name')}
            aria-invalid={!!errors.name}
            {...register('name', { required: true })}
          />
          {errors.name && (
            <span className={styles.error}>
              {t('shelter.pages.addPet.errors.nameRequired')}
            </span>
          )}
        </div>
        <div className={styles.row}>
          <div className={styles.petSpecies}>
            <label htmlFor="petSpecies">
              {t('shelter.pages.addPet.fields.species')}
              <span className={styles.required}>*</span>
            </label>
            <select
              id="petSpecies"
              aria-invalid={!!errors.species}
              {...register('species', { required: true })}
            >
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
            {errors.species && (
              <span className={styles.error}>
                {t('shelter.pages.addPet.errors.speciesRequired')}
              </span>
            )}
          </div>
          <div>
            <fieldset className={styles.petGender}>
              <legend>
                {t('shelter.pages.addPet.fields.gender')}
                <span className={styles.required}>*</span>
              </legend>
              <label>
                <input
                  type="radio"
                  value="MALE"
                  aria-invalid={!!errors.gender}
                  {...register('gender', { required: true })}
                />{' '}
                {t('shelter.pages.addPet.options.gender.MALE')}
              </label>
              <label>
                <input
                  type="radio"
                  value="FEMALE"
                  aria-invalid={!!errors.gender}
                  {...register('gender', { required: true })}
                />{' '}
                {t('shelter.pages.addPet.options.gender.FEMALE')}
              </label>
            </fieldset>
            {errors.gender && (
              <span className={styles.error}>
                {t('shelter.pages.addPet.errors.genderRequired')}
              </span>
            )}
          </div>
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
            aria-invalid={!!errors.description}
            {...register('description', { required: true })}
          />
          <p>
            {t('shelter.pages.addPet.counter', {
              count: DESCRIPTION_MAX - description.length,
            })}
          </p>
          {errors.description && (
            <span className={styles.error}>
              {t('shelter.pages.addPet.errors.descriptionRequired')}
            </span>
          )}
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
