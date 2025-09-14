import React, { useState, useRef } from 'react';
import GuideCard from '../GuideCard/GuideCard';
import './GuideCardCarousel.css';

interface GuideCardData {
  cardImgSrc: string;
  cardImgAlt: string;
  cardNumber: string;
  cardStep: string;
  cardDescription: { text: string; bold: boolean }[];
}

interface GuideCardCarouselProps {
  cards: GuideCardData[];
}

const GuideCardCarousel: React.FC<GuideCardCarouselProps> = ({ cards }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchEndX, setTouchEndX] = useState<number | null>(null);
  const slideContainerRef = useRef<HTMLDivElement>(null);

  const handlePrev = () => {
    setCurrentIndex(index => (index === 0 ? cards.length - 1 : index - 1));
  };

  const handleNext = () => {
    setCurrentIndex(index => (index === cards.length - 1 ? 0 : index + 1));
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEndX(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStartX !== null && touchEndX !== null) {
      const deltaX = touchEndX - touchStartX;
      if (deltaX > 50 && currentIndex > 0) {
        handlePrev();
      } else if (deltaX < -50 && currentIndex < cards.length - 1) {
        handleNext();
      }
    }
    setTouchStartX(null);
    setTouchEndX(null);
  };

  if (!cards.length) {
    return <div>Немає даних для відображення</div>;
  }

  return (
    <div
      className="guide-card-carousel"
      role="region"
      aria-label="Guide card carousel"
    >
      <div className="carousel">
        <button
          onClick={handlePrev}
          aria-label="Попередня картка"
          disabled={cards.length <= 1}
        >
          <img src="icons/arrow_left.svg" alt="" loading="lazy" />
        </button>
        <div
          className="slide"
          ref={slideContainerRef}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <GuideCard {...cards[currentIndex]} />
        </div>
        <button
          onClick={handleNext}
          aria-label="Наступна картка"
          disabled={cards.length <= 1}
        >
          <img src="icons/arrow_right.svg" alt="" loading="lazy" />
        </button>
      </div>
      <div className="indicators">
        {cards.map((_, index) => (
          <span
            key={index}
            role="button"
            aria-label={`Перейти до картки ${index + 1}`}
            className={
              index === currentIndex ? 'carousel-dot active' : 'carousel-dot'
            }
            onClick={() => setCurrentIndex(index)}
            onKeyDown={e => e.key === 'Enter' && setCurrentIndex(index)}
            tabIndex={0}
          />
        ))}
      </div>
    </div>
  );
};

export default GuideCardCarousel;
