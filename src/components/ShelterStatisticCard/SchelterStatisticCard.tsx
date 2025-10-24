import { useTranslation } from 'react-i18next';
import { ShelterNumberCardData } from '../../constants/SHELTERS_NUMBER_CARD_DATA';
import './ShelterStatisticCard.css';
import React from 'react';
import ShelterNumberCard from '../ShelterNumberCard/ShelterNumberCard';

interface StatisticCardsSectionProps {
  cards: ShelterNumberCardData[];
}

const ShelterStatisticCards: React.FC<StatisticCardsSectionProps> = ({
  cards,
}) => {
  const { t } = useTranslation();

  return (
    <div>
      {cards.map(card => (
        <ShelterNumberCard
          key={card.id}
          cardNumber={card.cardNumber}
          cardText={t(card.cardText)}
        />
      ))}
    </div>
  );
};

export default ShelterStatisticCards;
