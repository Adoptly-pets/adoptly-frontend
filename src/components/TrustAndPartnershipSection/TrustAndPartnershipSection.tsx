import { useTranslation } from 'react-i18next';
import footprintRight from '../../assets/images/cat_footprint-1.webp';
import footprintBottom from '../../assets/images/cat_footprint-2.webp';
import footprintLeft from '../../assets/images/cat_footprint-3.webp';
import catTrackHeart from '../../assets/images/trustAndSupport/Heart_with_dog_paw.svg';
import dogWalking from '../../assets/images/trustAndSupport/Dog_Walking.svg';
import catContainer from '../../assets/images/trustAndSupport/Pet_Bowl.svg';
import SupportButton from '../SupportButton/SupportButton';
import './TrustAndPartnershipSection.css';

const TrustAndPartnershipSection = () => {
  const { t } = useTranslation();

  return (
    <section className="trust-partnership-section">
      <h2>{t('trust.title')}</h2>
      <div className="buttons-container">
        <SupportButton
          imgSrc={catTrackHeart}
          altText="cat track inside heart"
          text={t('trust.supportButtons.donate')}
          ariaLabel={t('trust.supportButtons.donate')}
        />
        <SupportButton
          imgSrc={dogWalking}
          altText="walking dog"
          text={t('trust.supportButtons.volunteering')}
          ariaLabel={t('trust.supportButtons.donate')}
        />
        <SupportButton
          imgSrc={catContainer}
          altText="cat container"
          text={t('trust.supportButtons.foodAndMedicine')}
          ariaLabel={t('trust.supportButtons.donate')}
        />
      </div>
      <img
        className="footprint-img footprint-right-img"
        src={footprintRight}
        alt="cat footprint"
        loading="lazy"
      />
      <img
        className="footprint-img footprint-left-img"
        src={footprintLeft}
        alt="cat footprint"
        loading="lazy"
      />
      <img
        className="footprint-img footprint-bottom-img"
        src={footprintBottom}
        alt="cat footprint"
        loading="lazy"
      />
    </section>
  );
};

export default TrustAndPartnershipSection;
