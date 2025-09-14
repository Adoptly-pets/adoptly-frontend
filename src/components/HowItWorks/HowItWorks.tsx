import React from 'react';
import { useMediaQuery } from 'react-responsive';
import { GUIDE_CARD_DATA } from '../../constants/GUIDE_CARD_DATA';
import GuideCard from '../GuideCard/GuideCard';
import GuideCardCarousel from '../GuideCardCarousel/GuideCardCarousel';
import animalTracksSrc from '../../assets/images/animal_tracks.webp';
import catFootprintSrc from '../../assets/images/cat_footprint-2.webp';

import './HowItWorks.css';

interface GuideCardData {
  cardImgSrc: string;
  cardImgAlt: string;
  cardNumber: string;
  cardStep: string;
  cardDescription: { text: string; bold: boolean }[];
}

const HowItWorks: React.FC = React.memo(() => {
  const isMobile = useMediaQuery({ query: '(max-width: 767px)' });

  if (!GUIDE_CARD_DATA.length) {
    return (
      <section
        className="how-it-works"
        role="region"
        aria-labelledby="how-it-works-title"
        data-testid="how-it-works-section"
      >
        Немає даних для відображення
      </section>
    );
  }

  return (
    <section
      className="how-it-works"
      role="region"
      aria-labelledby="how-it-works-title"
      data-testid="how-it-works-section"
    >
      <div className="how-it-works-header">
        <h2 id="how-it-works-title">Як це працює</h2>
        <p>Покрокова інструкція</p>
        <img
          src={animalTracksSrc}
          alt="Animal tracks illustration for step-by-step guide"
          loading="lazy"
        />
      </div>
      {isMobile ? (
        <GuideCardCarousel cards={GUIDE_CARD_DATA} />
      ) : (
        <div className="steps">
          {GUIDE_CARD_DATA.map((item: GuideCardData, index: number) => (
            <GuideCard
              key={index}
              cardImgSrc={item.cardImgSrc}
              cardImgAlt={item.cardImgAlt}
              cardNumber={item.cardNumber}
              cardStep={item.cardStep}
              cardDescription={item.cardDescription}
            />
          ))}
        </div>
      )}
      <img
        className="how-it-works-mobile__catfootprint-img"
        src={catFootprintSrc}
        alt="cat footprint"
      />
    </section>
  );
});

export default HowItWorks;
