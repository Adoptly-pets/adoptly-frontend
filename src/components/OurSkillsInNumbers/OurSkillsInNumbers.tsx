import { useState, useEffect } from 'react';
import { useTranslation, Trans } from 'react-i18next';
import './OurSkillsInNumbers.css';
import { NUMBER_CARD_DATA } from '../../constants/NUMBER_CARD_DATA';
import Button from '../Button/Button';
import StatisticCardsSection from '../StatisticCardsSection/StatisticCardsSection';

const MOBILE_BREAKPOINT = 768;

const OurSkillsInNumbers = () => {
  const { t, i18n } = useTranslation();
  const [titleText, setTitleText] = useState('');

  useEffect(() => {
    const updateTitleText = () => {
      const width = window.innerWidth;
      setTitleText(
        width < MOBILE_BREAKPOINT
          ? t('ourNumbers.title_mobile')
          : t('ourNumbers.title_desktop')
      );
    };
    updateTitleText();
    window.addEventListener('resize', updateTitleText);
    return () => window.removeEventListener('resize', updateTitleText);
  }, [i18n.language, t]);

  return (
    <section className="our-skills-in-numbers">
      <h2>{titleText}</h2>
      <div className="our-skills-in-numbers__text-grid">
        <p>
          <Trans i18nKey="ourNumbers.paragraph1" />
        </p>
        <p>{t('ourNumbers.paragraph2')}</p>
        <p>{t('ourNumbers.paragraph3')}</p>
        <p>{t('ourNumbers.paragraph4')}</p>
      </div>
      <StatisticCardsSection cards={NUMBER_CARD_DATA} />
      <Button variant="secondary" onClick={() => {}}>
        {t('ourNumbers.button')}
      </Button>
    </section>
  );
};
export default OurSkillsInNumbers;
