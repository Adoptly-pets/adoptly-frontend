import React from 'react';

import './GuideCard.css';

interface GuideCardProps {
  cardImgSrc: string;
  cardImgAlt: string;
  cardNumber: string;
  cardStep: string;
  cardDescription: { text: string; bold: boolean }[];
}

const GuideCard: React.FC<GuideCardProps> = React.memo(
  ({ cardImgSrc, cardImgAlt, cardNumber, cardStep, cardDescription }) => {
    if (!cardDescription.length) {
      return null;
    }

    return (
      <article className="guide-card">
        <div>
          <img
            src={cardImgSrc}
            alt={cardImgAlt ?? 'Guide card image'}
            loading="lazy"
            decoding="async"
          />
        </div>
        <div className="guide-card-text">
          <h3>{cardNumber}</h3>
          <h4>{cardStep}</h4>
          <p>
            {cardDescription.map((part, index: number) =>
              part.bold ? <strong key={index}>{part.text}</strong> : part.text
            )}
          </p>
        </div>
      </article>
    );
  }
);

export default GuideCard;
