import { useTranslation } from 'react-i18next';
import styles from './ShelterProfilePage.module.css';
import { useState } from 'react';
import Button from '../../../components/Button/Button';

type Status = 'form' | 'submitting' | 'sent';

const ShelterProfilePage = () => {
  const { t } = useTranslation();
  const [status, setStatus] = useState<Status>('form');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    // Simulate form submission
    setTimeout(() => {
      setStatus('sent');
    }, 2000);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      {status === 'sent' && (
        <div className={styles.reviewBanner}>
          {t('shelter.pages.profile.sentMessage')}
        </div>
      )}
      <h1>{t('shelter.pages.profile.title')}</h1>

      <section className={styles.section}>
        <h2>{t('shelter.pages.profile.sections.main')}</h2>
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
