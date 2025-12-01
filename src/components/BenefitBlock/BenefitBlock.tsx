import React from 'react';
import './BenefitBlock.css';

interface BenefitBlockProps {
  image: string;
  title: string;
  text: string;
}
const BenefitBlock: React.FC<BenefitBlockProps> = ({ image, title, text }) => {
  return (
    <div className="benefit-block">
      <img src={image} alt={title} className="block-image" loading="lazy" />
      <h4>{title}</h4>
      <p>{text}</p>
    </div>
  );
};
export default BenefitBlock;
