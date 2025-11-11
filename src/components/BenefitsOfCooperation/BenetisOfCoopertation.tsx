import './BenefitsOfCooperation.css';
import BenefitBlock from '../BenefitBlock/BenefitBlock';
import GuideCardImg from '../../assets/images/guideCardImg1.webp';

const BenefitsOfCooperation = () => {
  return (
    <div className="benefits">
      <BenefitBlock
        image={GuideCardImg}
        title="Заявки на усиновлення"
        text="Отримуйте запити від людей, які хочуть забрати тварину додому"
      />
    </div>
  );
};

export default BenefitsOfCooperation;
