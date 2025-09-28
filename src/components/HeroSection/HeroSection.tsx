import Button from '../Button/Button';
import './HeroSection.css';
import catFootprint1 from '../../assets/images/Hero/cat-footprint-1.webp';
import catFootprint2 from '../../assets/images/Hero/cat-footprint-2.webp';
import pets from '../../assets/images/Hero/pets.webp';
import { Trans, useTranslation } from 'react-i18next';

const HeroSection = () => {
  const { t } = useTranslation();

  return (
    <section
      className="hero"
      role="region"
      aria-label="Знайди друга врятуй життя"
    >
      <div className="text-and-buttons">
        <h1 role="heading" aria-level={1}>
          <Trans i18nKey="hero.title" />
        </h1>
        <p>
          <Trans i18nKey="hero.subtitle" />
        </p>
        <div className="buttons">
          <Button
            variant="primary"
            onClick={() => alert('Кнопка "Знайти улюбленця" натиснута!')}
          >
            {t('hero.findPet')}
          </Button>
          <Button
            variant="secondary"
            onClick={() => alert('Кнопка "Задонатити" натиснута!')}
          >
            {t('hero.donate')}
          </Button>
        </div>
      </div>
      <div>
        <img
          className="pets"
          src={pets}
          alt="Ілюстрація тварин для адопції"
          fetchPriority="high"
          loading="lazy"
          decoding="async"
        />
      </div>
      <img
        className="images-footprints paw-1"
        src={catFootprint1}
        alt="cat-footprint"
        aria-hidden="true"
        loading="lazy"
        decoding="async"
      />
      <img
        className="images-footprints paw-2"
        src={catFootprint2}
        alt="cat-footprint"
        aria-hidden="true"
        loading="lazy"
        decoding="async"
      />
    </section>
  );
};
export default HeroSection;
