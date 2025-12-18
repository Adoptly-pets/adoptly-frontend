import { useTranslation } from 'react-i18next';
import './HeroAboutUs.css';
const HeroAboutUs = () => {
  const { t } = useTranslation();
  return (
    <section className="hero-background" role="region">
      <div>
        <h1 className="hero-title">Adoptly</h1>
        <p className="hero-text">{t('heroAboutUs.paragraph')}</p>
      </div>
      <a href="#findpet" className="hero-btn btn-mob">
        {t('heroAboutUs.mobileButton')}
      </a>
      <a href="#findpet" className="hero-btn btn-desc">
        {t('heroAboutUs.button')}
      </a>
    </section>
  );
};

export default HeroAboutUs;
