import React from 'react';
import './ShelterNumberCard.css';

interface ShelterNumberCardProps {
  cardNumber: string;
  cardText: string;
}

const ShelterNumberCard: React.FC<ShelterNumberCardProps> = ({
  cardNumber,
  cardText,
}) => {
  const words = cardText.split(' ');
  const firstWord = words[0] || ' ';
  const textRest = words.slice(1).join(' ');

  return (
    <div className="shelter-number-card">
      {cardNumber ? (
        <h3 className="shelter-number-card__number">{cardNumber}</h3>
      ) : (
        <h3 className="shelter-number-card__number">—</h3>
      )}
      <div className="shelter-number-card__text">
        {firstWord && <span>{firstWord} </span>}
        {textRest && <span>{textRest}</span>}
      </div>
    </div>
  );
};

export default ShelterNumberCard;
