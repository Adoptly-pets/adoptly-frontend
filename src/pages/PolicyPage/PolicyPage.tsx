import { useTranslation } from 'react-i18next';
import './PolicyPage.css';

const PolicyPage = () => {
  const { t } = useTranslation();
  return (
    <div className="container privacy-policy">
      <h1>{t('privacyPolicy.title')}</h1>
    </div>
  );
};
export default PolicyPage;
