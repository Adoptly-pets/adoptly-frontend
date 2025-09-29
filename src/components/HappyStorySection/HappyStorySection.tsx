import HappyStoryCarousel from '../HappyStoryCarousel/HappyStoryCarousel';
import { HAPPY_STORIES_DATA } from '../../constants/HAPPY_STORIES_DATA';
import './HappyStorySection.css';
import { useTranslation } from 'react-i18next';

const HappyStorySection = () => {
  const { t } = useTranslation();

  return (
    <section
      className="happy-story-section"
      role="region"
      aria-labelledby="happy-stories-title"
    >
      <h2 id="happy-stories-title" role="heading">
        {t('happyStories.title')}
      </h2>
      <HappyStoryCarousel stories={HAPPY_STORIES_DATA} />
    </section>
  );
};
export default HappyStorySection;
