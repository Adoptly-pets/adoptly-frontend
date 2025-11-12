import './BenefitsOfCooperation.css';
import BenefitBlock from '../BenefitBlock/BenefitBlock';
import { BENEFITS_DATA } from '../../constants/BENEFITS_DATA';

const BenefitsOfCooperation = () => {
  return (
    <div className="benefits">
      {BENEFITS_DATA.map(item => (
        <BenefitBlock image={item.image} title={item.title} text={item.text} />
      ))}
    </div>
  );
};

export default BenefitsOfCooperation;
