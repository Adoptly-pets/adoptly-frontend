import React, { useState } from 'react';
import type { HappyStoryCardProps } from '../HappyStoryCard/HappyStoryCard';
import HappyStoryCard from '../HappyStoryCard/HappyStoryCard';
import './HappyStoryCarousel.css';

interface HappyStoryCarouselProps {
  stories: HappyStoryCardProps[];
}

const HappyStoryCarousel: React.FC<HappyStoryCarouselProps> = ({ stories }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchEndX, setTouchEndX] = useState<number | null>(null);

  const handlePrev = () => {
    setCurrentIndex(index => (index === 0 ? stories.length - 1 : index - 1));
  };

  const handleNext = () => {
    setCurrentIndex(index => (index === stories.length - 1 ? 0 : index + 1));
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEndX(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStartX !== null && touchEndX !== null) {
      const distance = touchStartX - touchEndX;
      const swipeThreshold = 50;
      if (distance > swipeThreshold) {
        handleNext();
      } else if (distance < -swipeThreshold) {
        handlePrev();
      }
    }
    setTouchStartX(null);
    setTouchEndX(null);
  };

  return (
    <div>
      <div
        className="happy-story-carousel"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <button onClick={handlePrev}>
          <img src="icons/arrow_left.svg" alt="Previous" loading="lazy" />
        </button>
        <div className="slide">
          <HappyStoryCard {...stories[currentIndex]} />
        </div>

        <button onClick={handleNext}>
          <img src="icons/arrow_right.svg" alt="Next" loading="lazy" />
        </button>
      </div>
      <div className="indicators">
        {stories.map((_, index) => (
          <span
            key={index}
            role="presentation"
            className={index === currentIndex ? 'dot active' : 'dot'}
          />
        ))}
      </div>
    </div>
  );
};

export default HappyStoryCarousel;
