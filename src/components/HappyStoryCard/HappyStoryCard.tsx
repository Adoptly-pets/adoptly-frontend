import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation();
  return (
    <div className="happy-story-card">
      <img src={src} alt={t(name)} loading="lazy" />
      <div>
        <h3>{t(name)}</h3>
        <p className={expanded ? 'mobile-clamp expanded' : 'mobile-clamp'}>
          {description.map((paragraph, index) => (
            <React.Fragment key={index}>
              {t(paragraph)}
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
          {expanded
            ? t('happyStories.toggleHide')
            : t('happyStories.toggleShow')}
        </button>
      </div>
    </div>
  );
};
export default HappyStoryCard;
