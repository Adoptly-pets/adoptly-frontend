import { Trans, useTranslation } from 'react-i18next';
import photo from '../../assets/images/AboutUs/OurMission.webp';
import './OurMission.css';
const OurMission = () => {
  const { t } = useTranslation();
  return (
    <section className="our-mission">
      <div className="text-block">
        <h3 className="our-mission-title">{t('ourMission.title')}</h3>
        <p className="our-mission-text first">
          <Trans i18nKey="ourMission.paragraph1" />
        </p>
        <p className="our-mission-text second">
          <Trans i18nKey="ourMission.paragraph2" />
        </p>
      </div>
      <div className="photo-block">
        <img loading="lazy" src={photo} alt="pet and couple" />
      </div>
    </section>
  );
};

export default OurMission;
