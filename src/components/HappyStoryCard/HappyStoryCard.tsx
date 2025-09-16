import React, { useState } from 'react';
import './HappyStoryCard.css';

export interface HappyStoryCardProps {
  src: string;
  name: string;
  description: string[];
}
const HappyStoryCard: React.FC<HappyStoryCardProps> = ({
  src,
  name,
  description,
}) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="happy-story-card">
      <img src={src} loading="lazy" />
      <div>
        <h3>{name}</h3>
        <p className={expanded ? 'mobile-clamp expanded' : 'mobile-clamp'}>
          {description.map((paragraph, index) => (
            <React.Fragment key={index}>
              {paragraph}
              {index < description.length - 1 && (
                <>
                  <br />
                  <br />
                </>
              )}
            </React.Fragment>
          ))}
        </p>
        <button
          className="toggle-btn"
          onClick={() => setExpanded(prev => !prev)}
          aria-expanded={expanded}
        >
          {expanded ? 'Згорнути' : 'Показати повністю'}
        </button>
      </div>
    </div>
  );
};
export default HappyStoryCard;
