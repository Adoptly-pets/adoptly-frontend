import React from 'react';
import './NumberCard.css';

interface NumberCardProps {
  cardNumber: string;
  cardText: string;
}

const NumberCard: React.FC<NumberCardProps> = ({ cardNumber, cardText }) => {
  const words = cardText.split(' ');
  const firstWord = words[0] || ''; // Handle empty string
  const textRest = words.slice(1).join(' ');

  return (
    <div className="number-card">
      {cardNumber ? (
        <h3 className="number-card__number">{cardNumber}</h3>
      ) : (
        <h3 className="number-card__number">—</h3>
      )}
      <div className="number-card__text">
        {firstWord && <span>{firstWord}</span>}
        {textRest && <span>{textRest}</span>}
      </div>
    </div>
  );
};

export default NumberCard;
