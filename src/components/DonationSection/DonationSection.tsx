import Button from '../Button/Button';
import './DonationSection.css';

const DonationSection = () => {
  return (
    <section className="donation-section">
      <h2>
        Бажаєш підтримати тварин без усиновлення ? <br />
        <span>Обери суму свого донату</span>
      </h2>
      <ul>
        <li>100 грн</li>
        <li>250 грн</li>
        <li>500 грн</li>
      </ul>
      <input type="number" placeholder="Вказати іншу сумму"></input>
      <Button
        variant="primary"
        onClick={() => alert('Кнопка "Задонатити" натиснута!')}
      >
        Задонатити
      </Button>
    </section>
  );
};

export default DonationSection;
