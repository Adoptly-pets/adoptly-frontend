import React, { useState } from 'react';
import type { HappyStoryCardProps } from '../HappyStoryCard/HappyStoryCard';
import HappyStoryCard from '../HappyStoryCard/HappyStoryCard';
import './HappyStoryCarousel.css';

interface HappyStoryCarouselProps {
  stories: HappyStoryCardProps[];
}

const HappyStoryCarousel: React.FC<HappyStoryCarouselProps> = ({ stories }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex(index => (index === 0 ? stories.length - 1 : index - 1));
  };

  const handleNext = () => {
    setCurrentIndex(index => (index === stories.length - 1 ? 0 : index + 1));
  };

  return (
    <div>
      <div className="carousel">
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
            role='presentation'
            className={index === currentIndex ? 'dot active' : 'dot'}
          />
        ))}
      </div>
    </div>
  );
};

export default HappyStoryCarousel;
