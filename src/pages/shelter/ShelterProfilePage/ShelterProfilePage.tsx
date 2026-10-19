import { Trans, useTranslation } from 'react-i18next';
import styles from './ShelterProfilePage.module.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../../components/Button/Button';
import { useForm } from 'react-hook-form';
import { langLink } from '../../../utils/routing';

type Status = 'form' | 'submitting' | 'sent';
type ShelterProfileFormData = {
  name: string;
  edrpou: string;
  address: string;
  description: string;
  website?: string;
  facebook?: string;
  instagram?: string;
  otherLink?: string;
  firstName: string;
  lastName?: string;
  phone: string;
  consent: boolean;
};

const DESCRIPTION_MAX = 1500;
const URL_PATTERN =
  /^(https?:\/\/)?([\w-]+(\.[\w-]+)+)([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])?$/;
const PHONE_PATTERN = /^(\+?38)?0\d{9}$/;

const ShelterProfilePage = () => {
  const { t } = useTranslation();
  const [status, setStatus] = useState<Status>('form');
  const {
    register,
    handleSubmit,
    watch,
    getValues,
    formState: { errors },
  } = useForm<ShelterProfileFormData>();

  const atLeastOnePublicPage = () => {
    const { website, facebook, instagram, otherLink } = getValues();
    return (
      !!(
        website?.trim() ||
        facebook?.trim() ||
        instagram?.trim() ||
        otherLink?.trim()
      ) || t('shelter.pages.profile.errors.publicPagesRequired')
    );
  };

  const validatePhone = (value: string) =>
    PHONE_PATTERN.test(value.replace(/[\s()-]/g, '')) ||
    t('shelter.pages.profile.errors.phoneInvalid');

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
        <div>
          <h2>{t('shelter.pages.profile.sections.publicPages')}</h2>
          <p className={styles.helper}>
            {t('shelter.pages.profile.publicPagesIntro')}
          </p>

          {errors.website?.type === 'atLeastOne' && (
            <span className={styles.error}>{errors.website.message}</span>
          )}
        </div>
        <div className={styles.field}>
          <label htmlFor="website">
            {t('shelter.pages.profile.fields.website')}
          </label>
          <input
            id="website"
            type="url"
            placeholder={t('shelter.pages.profile.placeholders.website')}
            {...register('website', {
              pattern: URL_PATTERN,
              validate: { atLeastOne: atLeastOnePublicPage },
            })}
            disabled={status === 'submitting'}
          />
          {errors.website?.type === 'pattern' && (
            <span className={styles.error}>
              {t('shelter.pages.profile.errors.urlInvalid')}
            </span>
          )}
        </div>

        <div className={styles.field}>
          <label htmlFor="facebook">
            {t('shelter.pages.profile.fields.facebook')}
          </label>
          <input
            id="facebook"
            type="url"
            placeholder={t('shelter.pages.profile.placeholders.facebook')}
            {...register('facebook', { pattern: URL_PATTERN })}
            disabled={status === 'submitting'}
          />
          {errors.facebook && (
            <span className={styles.error}>
              {t('shelter.pages.profile.errors.urlInvalid')}
            </span>
          )}
        </div>

        <div className={styles.field}>
          <label htmlFor="instagram">
            {t('shelter.pages.profile.fields.instagram')}
          </label>
          <input
            id="instagram"
            type="url"
            placeholder={t('shelter.pages.profile.placeholders.instagram')}
            {...register('instagram', { pattern: URL_PATTERN })}
            disabled={status === 'submitting'}
          />
          {errors.instagram && (
            <span className={styles.error}>
              {t('shelter.pages.profile.errors.urlInvalid')}
            </span>
          )}
        </div>

        <div className={styles.field}>
          <label htmlFor="otherLink">
            {t('shelter.pages.profile.fields.otherLink')}
          </label>
          <input
            id="otherLink"
            type="url"
            placeholder={t('shelter.pages.profile.placeholders.otherLink')}
            {...register('otherLink', { pattern: URL_PATTERN })}
            disabled={status === 'submitting'}
          />
          {errors.otherLink && (
            <span className={styles.error}>
              {t('shelter.pages.profile.errors.urlInvalid')}
            </span>
          )}
        </div>
      </section>
      <section className={styles.section}>
        <div>
          <h2>{t('shelter.pages.profile.sections.contact')}</h2>
          <p className={styles.helper}>
            {t('shelter.pages.profile.contactIntro')}
          </p>
        </div>
        <div className={styles.twoColumn}>
          <div className={styles.field}>
            <label htmlFor="firstName">
              {t('shelter.pages.profile.fields.firstName')}
              <span className={styles.required}>*</span>
            </label>
            <input
              id="firstName"
              type="text"
              placeholder={t('shelter.pages.profile.placeholders.firstName')}
              {...register('firstName', { required: true })}
              disabled={status === 'submitting'}
            />
            {errors.firstName && (
              <span className={styles.error}>
                {t('shelter.pages.profile.errors.firstNameRequired')}
              </span>
            )}
          </div>
          <div className={styles.field}>
            <label htmlFor="lastName">
              {t('shelter.pages.profile.fields.lastName')}
            </label>
            <input
              id="lastName"
              type="text"
              placeholder={t('shelter.pages.profile.placeholders.lastName')}
              {...register('lastName')}
              disabled={status === 'submitting'}
            />
          </div>
          <div className={styles.field}>
            <label htmlFor="phone">
              {t('shelter.pages.profile.fields.phone')}
              <span className={styles.required}>*</span>
            </label>
            <input
              id="phone"
              type="tel"
              placeholder={t('shelter.pages.profile.placeholders.phone')}
              {...register('phone', {
                required: true,
                validate: validatePhone,
              })}
              disabled={status === 'submitting'}
            />
            {errors.phone && (
              <span className={styles.error}>
                {errors.phone.type === 'required'
                  ? t('shelter.pages.profile.errors.phoneRequired')
                  : errors.phone.message}
              </span>
            )}
          </div>
        </div>
      </section>
      <div className={styles.consent}>
        <input
          id="consent"
          type="checkbox"
          {...register('consent', { required: true })}
          disabled={status === 'submitting'}
        />
        <label htmlFor="consent">
          <Trans
            i18nKey="shelter.pages.profile.consent"
            components={{
              policyLink: (
                <Link
                  to={langLink('/privacy-policy')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.policyLink}
                />
              ),
            }}
          />
        </label>
        {errors.consent && (
          <span className={styles.error}>
            {t('shelter.pages.profile.errors.consentRequired')}
          </span>
        )}
      </div>
      <div className={styles.submitArea}>
        <Button
          type="submit"
          variant="primary"
          disabled={status === 'submitting'}
          maxWidth={320}
          height={50}
          maxWidthMobile={250}
          heightMobile={48}
        >
          {status === 'submitting'
            ? t('shelter.pages.profile.submitting')
            : t('shelter.pages.profile.submit')}
        </Button>
        <p className={styles.disclaimer}>
          {t('shelter.pages.profile.submitHint')}
        </p>
      </div>
    </form>
  );
};

export default ShelterProfilePage;
