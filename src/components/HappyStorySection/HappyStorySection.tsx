import HappyStoryCarousel from '../HappyStoryCarousel/HappyStoryCarousel';
import { HAPPY_STORIES_DATA } from '../../constants/HAPPY_STORIES_DATA';
import './HappyStorySection.css';

const HappyStorySection = () => {
  return (
    <section
      className="happy-story-section"
      role="region"
      aria-labelledby="happy-stories-title"
    >
      <h2 id="happy-stories-title" role="heading">
        Щасливі історії{' '}
      </h2>
      <HappyStoryCarousel stories={HAPPY_STORIES_DATA} />
    </section>
  );
};
export default HappyStorySection;
