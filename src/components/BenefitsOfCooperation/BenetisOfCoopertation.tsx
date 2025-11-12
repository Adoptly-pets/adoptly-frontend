import './BenefitsOfCooperation.css';
import BenefitBlock from '../BenefitBlock/BenefitBlock';
import { BENEFITS_DATA } from '../../constants/BENEFITS_DATA';
import CuteDog from '../../assets/images/Benefits/cute-dog.webp';

const BenefitsOfCooperation = () => {
  return (
    <div className="benefits">
      {BENEFITS_DATA.map(item => (
        <BenefitBlock image={item.image} title={item.title} text={item.text} />
      ))}
      <img src={CuteDog} alt="cute dog" />
    </div>
  );
};

export default BenefitsOfCooperation;
