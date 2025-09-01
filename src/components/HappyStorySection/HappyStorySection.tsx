import HappyStoryCarousel from '../HappyStoryCarousel/HappyStoryCarousel';
import { HAPPY_STORIES_DATA } from '../../constants/HAPPY_STORIES_DATA';
import './HappyStorySection.css';

const HappyStorySection = () => {
  return (
    <section className="happy-story-section">
      <h2>Щасливі історії </h2>
      <HappyStoryCarousel stories={HAPPY_STORIES_DATA} />
    </section>
  );
};
export default HappyStorySection;
