import footprintRight from '../../assets/images/cat_footprint-1.png';
import footprintBottom from '../../assets/images/cat_footprint-2.png';
import footprintLeft from '../../assets/images/cat_footprint-3.png';
import catTrackHeart from '../../assets/images/cat_track_heart.png';
import dogWalking from '../../assets/images/dog_walking.png';
import catContainer from '../../assets/images/cat_container.png';
import SupportButton from '../SupportButton/SupportButton';
import './TrustAndPartnershipSection.css';

const TrustAndPartnershipSection = () => {
  return (
    <section className="trust-partnership-section">
      <h2>Любов і підтримка без усиновлення</h2>
      <div className="buttons-container">
        <SupportButton
          imgSrc={catTrackHeart}
          altText="cat track inside heart"
          text="Задонатити"
          ariaLabel="Задонатити"
        />
        <SupportButton
          imgSrc={dogWalking}
          altText="walking dog"
          text="Волонтерство та допомога руками"
          ariaLabel="Волонтерство та допомога руками"
        />
        <SupportButton
          imgSrc={catContainer}
          altText="cat container"
          text="Допомога кормом або медикаментами"
          ariaLabel="Допомога кормом або медикаментами"
        />
      </div>
      <img
        className="footprint-img footprint-right-img"
        src={footprintRight}
        alt="cat footprint"
      />
      <img
        className="footprint-img footprint-left-img"
        src={footprintLeft}
        alt="cat footprint"
      />
      <img
        className="footprint-img footprint-bottom-img"
        src={footprintBottom}
        alt="cat footprint"
      />
    </section>
  );
};

export default TrustAndPartnershipSection;
