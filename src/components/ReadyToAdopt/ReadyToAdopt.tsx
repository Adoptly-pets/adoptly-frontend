import catFootprint from '../../assets/images/ReadyToAdopt/cat-footprint.webp';
import catFootprint1 from '../../assets/images/ReadyToAdopt/cat-footprint-1.webp';
import catFootprint2 from '../../assets/images/ReadyToAdopt/cat-footprint-2.webp';
import catFootprint3 from '../../assets/images/ReadyToAdopt/cat-footprint-3.webp';
import catImg from '../../assets/images/Cat.webp';
import dogimg from '../../assets/images/Dog.webp';
import './ReadyToAdopt.css';
import { useTranslation } from 'react-i18next';

const ReadyToAdopt = () => {
  const { t } = useTranslation();

  return (
    <section className="ready-to-adopt">
      <div className="text-box">
        <h3 className="title">{t('readyToAdopt.title')}</h3>
        <p className="description">{t('readyToAdopt.description')}</p>
        <a href="#findpet" className="search-btn">
          {t('readyToAdopt.button')}
        </a>
      </div>

      <img className="img-dog" src={dogimg} alt="dog" loading="lazy" />
      <img className="img-cat" src={catImg} alt="cat" loading="lazy" />

      <img
        className="images-footprint footprint"
        src={catFootprint}
        alt="cat-footprint"
        aria-hidden="true"
        loading="lazy"
        decoding="async"
      />
      <img
        className="images-footprint footprint-1"
        src={catFootprint1}
        alt="cat-footprint"
        aria-hidden="true"
        loading="lazy"
        decoding="async"
      />
      <img
        className="images-footprint footprint-2"
        src={catFootprint2}
        alt="cat-footprint"
        aria-hidden="true"
        loading="lazy"
        decoding="async"
      />
      <img
        className="images-footprint footprint-3"
        src={catFootprint3}
        alt="cat-footprint"
        aria-hidden="true"
        loading="lazy"
        decoding="async"
      />
    </section>
  );
};
export default ReadyToAdopt;
