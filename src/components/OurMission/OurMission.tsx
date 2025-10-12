import photo from '../../assets/images/AboutUs/OurMission.webp';
import './OurMission.css';
const OurMission = () => {
  return (
    <section className="our-mission">
      <div className="text-block">
        <h3 className="our-mission-title">Наша мета</h3>
        <p className="our-mission-text first">
          Ми створили <b>єдину платформу, яка об’єднує всі притулки України,</b>{' '}
          щоб жодна тварина не залишилася без шансів на щасливе життя. Тут кожен
          песик і котик може знайти свій дім, а люди - зустріти свого нового
          друга, що назавжди змінить їхнє життя.{' '}
          <b> Ми прагнемо зробити усиновлення простим, зручним і прозорим,</b>{' '}
          щоб кожен крок приносив радість і довіру.
        </p>
        <p className="our-mission-text second">
          <b>Adoptly</b> надихає ділитися любов’ю, розповідає історії щасливих
          усиновлень і дає можливість кожному зробити добру справу, що змінює
          життя на краще.
        </p>
      </div>
      <div className="photo-block">
        <img src={photo} alt="pet and couple" />
      </div>
    </section>
  );
};

export default OurMission;
