import { Icon } from '../../components/Icon/Icon';
import { FormEvent, useState } from 'react';
import styles from './ChooseRolePage.module.css';
import Button from '../../components/Button/Button';
import { useAuth } from '../../context/useAuth';
import { useTranslation } from 'react-i18next';
import { chooseRole } from '../../services/auth';
import { isApiError } from '../../services/api';
import { Navigate } from 'react-router-dom';
import { getPostLoginPath, langLink } from '../../utils/routing';

const ChooseRolePage = () => {
  const [role, setRole] = useState<'USER' | 'SHELTER' | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user, login, logout } = useAuth();
  const { t } = useTranslation();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!role) return;
    setError(null);
    setIsSubmitting(true);
    try {
      const response = await chooseRole(role);
      login(
        {
          accessToken: response.accessToken,
          refreshToken: response.refreshToken,
        },
        response.userInfo
      );
    } catch (err) {
      if (isApiError(err) && err.type === 'network') {
        setError('errors.networkError');
        return;
      }
      setError('errors.serverError');
      console.error('Choose role error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (user?.role)
    return <Navigate to={langLink(getPostLoginPath(user.role))} replace />;

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.header}>
          <h1 className={styles.title} id="chooseRoleTitle">
            {t('chooseRole.title')}
          </h1>
          <p>{t('chooseRole.subtitle')}</p>
        </div>
        <form onSubmit={handleSubmit}>
          <fieldset
            className={styles.roleOptions}
            aria-labelledby="chooseRoleTitle"
            disabled={isSubmitting}
          >
            <label className={styles.option}>
              <input
                type="radio"
                name="role"
                value="USER"
                checked={role === 'USER'}
                onChange={() => setRole('USER')}
              />
              <span className={styles.check}>
                <Icon id="icon-checkmark" className={styles.checkIcon} />
              </span>
              <span className={styles.iconBox}>
                <Icon id="icon-heart-outline" className={styles.icon} />
              </span>
              <span className={styles.optionTitle}>
                {t('chooseRole.options.USER.title')}
              </span>
              <span>{t('chooseRole.options.USER.text')}</span>
            </label>
            <label className={styles.option}>
              <input
                type="radio"
                name="role"
                value="SHELTER"
                checked={role === 'SHELTER'}
                onChange={() => setRole('SHELTER')}
              />
              <span className={styles.check}>
                <Icon id="icon-checkmark" className={styles.checkIcon} />
              </span>
              <span className={styles.iconBox}>
                <Icon id="icon-house" className={styles.icon} />
              </span>
              <span className={styles.optionTitle}>
                {t('chooseRole.options.SHELTER.title')}
              </span>
              <span>{t('chooseRole.options.SHELTER.text')}</span>
            </label>
          </fieldset>
          <p className={styles.note}>
            <Icon id="icon-circle-alert" className={styles.noteIcon} />
            {t('chooseRole.note')}
          </p>
          {error && (
            <p className={styles.error} role="alert">
              {t(error)}
            </p>
          )}
          <div className={styles.actions}>
            <Button
              type="submit"
              variant="action"
              maxWidth={240}
              height={55}
              disabled={!role || isSubmitting}
            >
              {t('chooseRole.continue')}
            </Button>
          </div>
        </form>
        <div className={styles.actions}>
          <button type="button" className={styles.logout} onClick={logout}>
            {t('chooseRole.logout')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChooseRolePage;
