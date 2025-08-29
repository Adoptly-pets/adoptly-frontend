import HappyStoryCard from '../HappyStoryCard/HappyStoryCard';
import HappyStoryImg from '../../assets/images/djeck.png';
import './HappyStorySection.css';

const HappyStorySection = () => {
  return (
    <section className="happy-story-section">
      <h2>Щасливі історії </h2>
      <HappyStoryCard
        src={HappyStoryImg}
        name="Джек"
        description="Джек потрапив до притулку ще цуценям - зворушливо лагідний, але трохи полохливий. Він завжди чекав біля вікна, дивлячись на вулицю, ніби шукав свою людину.

Його фото побачив 30-річний хлопець на ім’я Андрій. Він не планував брати собаку, але в очах Джека було щось особливе, стався метч. Вже наступного дня Андрій приїхав до притулку, і коли Барсик одразу стрибнув йому на руки - все стало зрозуміло. 

Тепер Барсик має свій дім, улюблену ковдру й ранкові обійми. А Андрій каже, що це найкраще рішення в його житті."
      />
    </section>
  );
};
export default HappyStorySection;
