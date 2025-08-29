import React from 'react';
import './HappyStoryCard.css';

interface HappyStoryCardProps {
  src: string;
  name: string;
  description: string;
}
const HappyStoryCard: React.FC<HappyStoryCardProps> = ({
  src,
  name,
  description,
}) => {
  return (
    <div className="happy-story-card">
      <img src={src} />
      <div>
        <h3>{name}</h3>
        {description
          .split('\n')
          .map((paragraph, index) =>
            paragraph.trim() ? (
              <p key={index}>{paragraph}</p>
            ) : (
              <br key={index} />
            )
          )}
      </div>
    </div>
  );
};
export default HappyStoryCard;
