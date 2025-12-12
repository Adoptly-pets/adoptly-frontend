import { useEffect, useState } from 'react';
import './HeroAboutUs.css';
import { useTranslation } from 'react-i18next';
const HeroAboutUs = () => {
  const { t, i18n } = useTranslation();

  const [buttonText, setButtonText] = useState('Почати пошук улюбленця');

  useEffect(() => {
    const updateButtonText = () => {
      if (window.innerWidth < 768) {
        setButtonText(t('heroAboutUs.mobileButton'));
      } else {
        setButtonText(t('heroAboutUs.button'));
      }
    };
    updateButtonText();
    window.addEventListener('resize', updateButtonText);
    return () => window.removeEventListener('resize', updateButtonText);
  }, [i18n.language, t]);
  return (
    <section className="hero-background" role="region">
      <div>
        <h1 className="hero-title">Adoptly</h1>
        <p className="hero-text">{t('heroAboutUs.paragraph')}</p>
      </div>

      <a href="#findpet" className="hero-btn">
        {buttonText}
      </a>
    </section>
  );
};

export default HeroAboutUs;
