import { Icon } from '../Icon/Icon';
import heroMob from '../../assets/images/Shelters/Hero-mobile.webp';
import heroDesk from '../../assets/images/Shelters/Hero-desktop.webp';
import { SHELTERS_NUMBER_CARD_DATA } from '../../constants/SHELTERS_NUMBER_CARD_DATA';
import './SheltersHero.css';
import ShelterStatisticCards from '../ShelterStatisticCard/ShelterStatisticCard';
import { useEffect, useState } from 'react';

const SheltersHero = () => {
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768);
  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return (
    <section>
      <div className="shelters-hero-content">
        <div className="schelters-hero-text-block">
          <Icon
            id="icon-Logo"
            className="shelter-hero-Logo"
            size={278}
            height={46}
          />
          <p className="shelter-hero-text">
            Піклуємось про тих, хто піклується про тварин
          </p>
          {isDesktop && (
            <div className="shelter-static-block">
              <ShelterStatisticCards cards={SHELTERS_NUMBER_CARD_DATA} />
            </div>
          )}
        </div>

        <picture className="image-block">
          <source srcSet={heroMob} media="(max-width:767px)" />
          <source srcSet={heroDesk} media="(min-width: 768px)" />
          <img src={heroDesk} alt="pets" loading="lazy" />
        </picture>
      </div>

      {!isDesktop && (
        <div className="shelter-static-block">
          <ShelterStatisticCards cards={SHELTERS_NUMBER_CARD_DATA} />
        </div>
      )}
    </section>
  );
};

export default SheltersHero;
