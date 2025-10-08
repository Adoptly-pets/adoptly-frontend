import { useState, useEffect } from 'react';
import { useTranslation, Trans } from 'react-i18next';
import NumberCard from '../NumberCard/NumberCard';
import './OurSkillsInNumbers.css';
import { NUMBER_CARD_DATA } from '../../constants/NUMBER_CARD_DATA';
import Button from '../Button/Button';

const OurSkillsInNumbers = () => {
  const { t, i18n } = useTranslation();
  const [titleText, setTitleText] = useState(t('ourNumbers.title_desktop'));

  const updateTitleText = () =>
    window.innerWidth < 768
      ? setTitleText(t('ourNumbers.title_mobile'))
      : setTitleText(t('ourNumbers.title_desktop'));

  useEffect(() => {
    updateTitleText();
    window.addEventListener('resize', updateTitleText);
    return () => window.removeEventListener('resize', updateTitleText);
  }, [i18n.language]);

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
      <div className="our-skills-in-numbers__cards">
        {NUMBER_CARD_DATA.map(card => (
          <NumberCard
            key={card.id}
            cardNumber={card.cardNumber}
            cardText={t(card.cardText)}
          />
        ))}
      </div>
      <Button variant="secondary" onClick={() => {}}>
        {t('ourNumbers.button')}
      </Button>
    </section>
  );
};
export default OurSkillsInNumbers;
