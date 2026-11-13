import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import styles from './AddPetPage.module.css';
import { langLink } from '../../../utils/routing';
import Button from '../../../components/Button/Button';
import { useForm } from 'react-hook-form';
import { Gender, Species, AgeUnit, Size } from '../../../types/pet';

type AddPetFormData = {
  name: string;
  species: Species | '';
  gender: Gender | '';
  ageValue: number;
  ageUnit: AgeUnit;
  size?: Size;
  description: string;
  breed?: string;
  adoptionConditions?: string;
};

const DESCRIPTION_MAX = 1500;
const ARRIVAL_YEARS_BACK = 30;
const MONTHS = Array.from({ length: 12 }, (_, i) => i + 1);

const AddPetPage = () => {
  const { t, i18n } = useTranslation();
  // Month names come from the browser in the current language
  const monthFormat = new Intl.DateTimeFormat(i18n.language, {
    month: 'long',
  });
  const currentYear = new Date().getFullYear();
  const arrivalYears = Array.from(
    { length: ARRIVAL_YEARS_BACK + 1 },
    (_, i) => currentYear - i
  );
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
      ageUnit: 'YEARS',
    },
  });

  const description = watch('description');
  // Empty input gives NaN; 0 picks the "many" plural form (місяців / років)
  const ageCount = watch('ageValue') || 0;
  const species = watch('species');

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
      <form
        className={styles.form}
        onSubmit={handleSubmit(onDataSubmit)}
        noValidate
      >
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
        <div className={styles.row}>
          <div className={styles.petAgeBlock}>
            <label htmlFor="petAge">
              {t('shelter.pages.addPet.fields.age')}
              <span className={styles.required}>*</span>
            </label>
            <div className={styles.petAge}>
              <input
                type="number"
                placeholder={t('shelter.pages.addPet.placeholders.age')}
                id="petAge"
                aria-invalid={!!errors.ageValue}
                {...register('ageValue', {
                  valueAsNumber: true,
                  required: true,
                  min: 1,
                })}
              />
              <select
                {...register('ageUnit')}
                aria-label={t('shelter.pages.addPet.fields.ageUnit')}
              >
                <option value="MONTHS">
                  {t('shelter.pages.addPet.options.ageUnit.MONTHS', {
                    count: ageCount,
                  })}
                </option>
                <option value="YEARS">
                  {t('shelter.pages.addPet.options.ageUnit.YEARS', {
                    count: ageCount,
                  })}
                </option>
              </select>
            </div>
            {errors.ageValue && (
              <span className={styles.error}>
                {t('shelter.pages.addPet.errors.ageRequired')}
              </span>
            )}
          </div>
          {species === 'DOG' && (
            <div className={styles.petSize}>
              <label htmlFor="size">
                {t('shelter.pages.addPet.fields.size')}
                <span className={styles.required}>*</span>
              </label>
              <select
                id="size"
                aria-invalid={!!errors.size}
                {...register('size', {
                  required: true,
                  shouldUnregister: true,
                })}
              >
                <option value="">
                  {t('shelter.pages.addPet.placeholders.size')}
                </option>
                <option value="SMALL">
                  {t('shelter.pages.addPet.options.size.SMALL')}
                </option>
                <option value="MEDIUM">
                  {t('shelter.pages.addPet.options.size.MEDIUM')}
                </option>
                <option value="LARGE">
                  {t('shelter.pages.addPet.options.size.LARGE')}
                </option>
              </select>
              {errors.size && (
                <span className={styles.error}>
                  {t('shelter.pages.addPet.errors.sizeRequired')}
                </span>
              )}
            </div>
          )}
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
          <div className={styles.descriptionFooter}>
            {errors.description && (
              <span className={styles.error}>
                {t('shelter.pages.addPet.errors.descriptionRequired')}
              </span>
            )}
            <p>
              {t('shelter.pages.addPet.counter', {
                count: DESCRIPTION_MAX - description.length,
              })}
            </p>
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.petBreed}>
            <label htmlFor="breed">
              {t('shelter.pages.addPet.fields.breed')}
            </label>
            <input
              type="text"
              id="breed"
              placeholder={t('shelter.pages.addPet.placeholders.breed')}
              {...register('breed')}
            />
          </div>
          <fieldset className={styles.petArrival}>
            <legend>{t('shelter.pages.addPet.fields.arrival')}</legend>
            <div className={styles.petArrivalSelects}>
              <select
                aria-label={t('shelter.pages.addPet.fields.arrivalMonth')}
              >
                <option value="">
                  {t('shelter.pages.addPet.fields.arrivalMonth')}
                </option>
                {MONTHS.map(month => (
                  <option key={month} value={month}>
                    {monthFormat.format(new Date(2000, month - 1, 1))}
                  </option>
                ))}
              </select>
              <select aria-label={t('shelter.pages.addPet.fields.arrivalYear')}>
                <option value="">
                  {t('shelter.pages.addPet.fields.arrivalYear')}
                </option>
                {arrivalYears.map(year => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
          </fieldset>
        </div>

        <div className={styles.petConditions}>
          <label htmlFor="conditions">
            {t('shelter.pages.addPet.fields.adoptionConditions')}
          </label>
          <input
            id="conditions"
            type="text"
            placeholder={t(
              'shelter.pages.addPet.placeholders.adoptionConditions'
            )}
            {...register('adoptionConditions')}
          />
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
