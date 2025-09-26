import React, { useState, useRef } from 'react';
import type { HappyStoryCardProps } from '../HappyStoryCard/HappyStoryCard';
import HappyStoryCard from '../HappyStoryCard/HappyStoryCard';
import './HappyStoryCarousel.css';

interface HappyStoryCarouselProps {
  stories: HappyStoryCardProps[];
}

const HappyStoryCarousel: React.FC<HappyStoryCarouselProps> = ({ stories }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchDelta, setTouchDelta] = useState<number>(0);
  const viewportRef = useRef<HTMLDivElement | null>(null);

  const handlePrev = () => {
    setCurrentIndex(index => (index === 0 ? stories.length - 1 : index - 1));
  };

  const handleNext = () => {
    setCurrentIndex(index => (index === stories.length - 1 ? 0 : index + 1));
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
    setTouchDelta(0);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const delta = e.touches[0].clientX - touchStartX;
    setTouchDelta(delta);
  };

  const handleTouchEnd = () => {
    const swipeThreshold = 50; // px
    if (touchDelta > swipeThreshold) {
      handlePrev();
    } else if (touchDelta < -swipeThreshold) {
      handleNext();
    }
    setTouchStartX(null);
    setTouchDelta(0);
  };

  const viewportWidth = viewportRef.current?.clientWidth ?? 0;
  const translateX = -currentIndex * viewportWidth + touchDelta;
  const isDragging = touchStartX !== null;

  return (
    <>
      <div className="happy-story-carousel">
        <button
          className="btn-carousel"
          onClick={handlePrev}
          aria-label="Previous"
        >
          <img src="icons/arrow_left.svg" alt="Previous" loading="lazy" />
        </button>

        <div
          className="happy-story-viewport"
          ref={viewportRef}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div
            className="happy-story-track"
            style={{
              transform: `translateX(${translateX}px)`,
              transition: isDragging ? 'none' : 'transform 300ms ease',
            }}
          >
            {stories.map((story, index) => (
              <div className="happy-story-slide" key={index}>
                <HappyStoryCard {...story} />
              </div>
            ))}
          </div>
        </div>

        <button className="btn-carousel" onClick={handleNext} aria-label="Next">
          <img src="icons/arrow_right.svg" alt="Next" loading="lazy" />
        </button>
      </div>
      <div className="happy-story-indicators">
        {stories.map((_, index) => (
          <span
            key={index}
            role="presentation"
            className={index === currentIndex ? 'dot active' : 'dot'}
          />
        ))}
      </div>
    </>
  );
};

export default HappyStoryCarousel;
