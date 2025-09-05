import Button from '../Button/Button';
import './HeroSection.css';
import catFootprint1 from '../../assets/images/Hero/cat-footprint-1.png';
import catFootprint2 from '../../assets/images/Hero/cat-footprint-2.png';

const HeroSection = () => {
  return (
    <section className="hero">
      <div className="text-and-buttons">
        <h1>
          Знайди друга <br /> Врятуй життя
        </h1>
        <p>
          Свайпай, знайомся, допомагай: <br />
          твій свайп може змінити життя
        </p>
        <div className="buttons">
          <Button
            variant="primary"
            onClick={() => alert('Кнопка "Знайти улюбленця" натиснута!')}
          >
            Знайти улюбленця
          </Button>
          <Button
            variant="secondary"
            onClick={() => alert('Кнопка "Задонатити" натиснута!')}
          >
            Задонатити
          </Button>
        </div>
      </div>
      <div>
        <img
          className="pets"
          src="images/pets.svg"
          alt="Ілюстрація тварин для адопції"
          fetchPriority="high"
          decoding="async"
        />
      </div>
      <img
        className="images-footprints paw-1"
        src={catFootprint1}
        alt="cat-footprint"
        aria-hidden="true"
        loading="lazy"
        decoding="async"
      />
      <img
        className="images-footprints paw-2"
        src={catFootprint2}
        alt="cat-footprint"
        aria-hidden="true"
        loading="lazy"
        decoding="async"
      />
    </section>
  );
};
export default HeroSection;
