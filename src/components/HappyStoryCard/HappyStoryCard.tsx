import React from 'react';
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
  return (
    <div className="happy-story-card">
      <img src={src} />
      <div>
        <h3>{name}</h3>
        {description.map((paragraph, index) => (
          <>
            <p key={index}>{paragraph}</p>
            <br />
          </>
        ))}
      </div>
    </div>
  );
};
export default HappyStoryCard;
