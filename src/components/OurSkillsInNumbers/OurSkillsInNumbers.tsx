import NumberCard from '../NumberCard/NumberCard';
import './OurSkillsInNumbers.css';
import { NUMBER_CARD_DATA } from '../../constants/NUMBER_CARD_DATA';
import Button from '../Button/Button';

const OurSkillsInNumbers = () => {
  return (
    <section className="our-skills-in-numbers">
      <h2 className="title-desc">Наш вплив у цифрах</h2>
      <h2 className="title-mob">Про нас</h2>
      <div className="our-skills-in-numbers__text-grid">
        <p>
          <strong>Adoptly</strong> - платформа, де кожна людина може знайти
          свого вірного друга.
        </p>
        <p>
          Тут ти можеш побачити фото, прочитати історії, відчути зв’язок і
          зробити важливий крок.
        </p>
        <p>
          Ми об’єднали любов до хвостатих та сучасні технології, щоб зробити
          усиновлення ближчим і простішим. Наша платформа створена, щоб
          знайомити серця - твоє і їхнє.
        </p>
        <p>
          Назва працює з притулками та волонтерами по всій країні, щоб допомогти
          тваринам знайти турботливих господарів. Кожне “метч” тут -це шанс на
          нове життя.
        </p>
      </div>
      <div className="our-skills-in-numbers__cards">
        {NUMBER_CARD_DATA.map(card => (
          <NumberCard
            key={card.id}
            cardNumber={card.cardNumber}
            cardText={card.cardText}
          />
        ))}
      </div>
      <Button
        children="Дізнатись більше"
        variant="secondary"
        onClick={() => {}}
      ></Button>
    </section>
  );
};
export default OurSkillsInNumbers;
