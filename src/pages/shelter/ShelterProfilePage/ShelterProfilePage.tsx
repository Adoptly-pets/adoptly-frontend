import { useTranslation } from 'react-i18next';
import styles from './ShelterProfilePage.module.css';
import { useState } from 'react';
import Button from '../../../components/Button/Button';
import { useForm } from 'react-hook-form';

type Status = 'form' | 'submitting' | 'sent';
type ShelterProfileFormData = {
  name: string;
  edrpou: string;
  address: string;
  description: string;
};

const DESCRIPTION_MAX = 1500;

const ShelterProfilePage = () => {
  const { t } = useTranslation();
  const [status, setStatus] = useState<Status>('form');
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ShelterProfileFormData>();

  const description = watch('description', '');

  const onSubmit = (data: ShelterProfileFormData) => {
    setStatus('submitting');
    // Simulate form submission
    setTimeout(() => {
      setStatus('sent');
      console.log('Form submitted:', data);
    }, 2000);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
      {status === 'sent' && (
        <div className={styles.reviewBanner}>
          {t('shelter.pages.profile.sentMessage')}
        </div>
      )}
      <h1>{t('shelter.pages.profile.title')}</h1>

      <section className={styles.section}>
        <h2>{t('shelter.pages.profile.sections.main')}</h2>

        <div className={styles.field}>
          <label htmlFor="name">
            {t('shelter.pages.profile.fields.name')}
            <span className={styles.required}>*</span>
          </label>
          <input
            id="name"
            type="text"
            placeholder={t('shelter.pages.profile.placeholders.name')}
            {...register('name', { required: true })}
            disabled={status === 'submitting'}
          />
          {errors.name && (
            <span className={styles.error}>
              {t('shelter.pages.profile.errors.nameRequired')}
            </span>
          )}
        </div>

        <div className={styles.field}>
          <label htmlFor="edrpou">
            {t('shelter.pages.profile.fields.edrpou')}
          </label>
          <input
            id="edrpou"
            type="text"
            placeholder={t('shelter.pages.profile.placeholders.edrpou')}
            {...register('edrpou', {
              pattern: /^\d{8}$/,
            })}
            disabled={status === 'submitting'}
          />
          {errors.edrpou && (
            <span className={styles.error}>
              {t('shelter.pages.profile.errors.edrpouInvalid')}
            </span>
          )}
          <span className={styles.helper}>
            {t('shelter.pages.profile.helpers.edrpou')}
          </span>
        </div>

        <div className={styles.field}>
          <label htmlFor="address">
            {t('shelter.pages.profile.fields.address')}
            <span className={styles.required}>*</span>
          </label>
          <input
            id="address"
            type="text"
            placeholder={t('shelter.pages.profile.placeholders.address')}
            {...register('address', { required: true })}
            disabled={status === 'submitting'}
          />
          {errors.address && (
            <span className={styles.error}>
              {t('shelter.pages.profile.errors.addressRequired')}
            </span>
          )}
          <span className={styles.helper}>
            {t('shelter.pages.profile.helpers.address')}
          </span>
        </div>

        <div className={styles.field}>
          <label htmlFor="description">
            {t('shelter.pages.profile.fields.description')}
            <span className={styles.required}>*</span>
          </label>
          <textarea
            id="description"
            rows={6}
            maxLength={DESCRIPTION_MAX}
            placeholder={t('shelter.pages.profile.placeholders.description')}
            {...register('description', { required: true })}
            disabled={status === 'submitting'}
          />
          {errors.description && (
            <span className={styles.error}>
              {t('shelter.pages.profile.errors.descriptionRequired')}
            </span>
          )}
          <span className={styles.counter}>
            {t('shelter.pages.profile.counter', {
              count: DESCRIPTION_MAX - description.length,
            })}
          </span>
        </div>
      </section>
      <section className={styles.section}>
        <h2>{t('shelter.pages.profile.sections.publicPages')}</h2>
      </section>
      <section className={styles.section}>
        <h2>{t('shelter.pages.profile.sections.contact')}</h2>
      </section>
      <Button
        type="submit"
        variant="primary"
        disabled={status === 'submitting'}
      >
        {status === 'submitting'
          ? t('shelter.pages.profile.submitting')
          : t('shelter.pages.profile.submit')}
      </Button>
      <p className={styles.disclaimer}>
        {t('shelter.pages.profile.submitHint')}
      </p>
    </form>
  );
};

export default ShelterProfilePage;
