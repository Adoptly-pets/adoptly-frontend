import React, { useState } from 'react';
import './Accordionitem.css';
import { Icon } from '../Icon/Icon';

interface AccordionItemProps {
  question: string;
  answer: string;
}

const Accordionitem: React.FC<AccordionItemProps> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(prev => !prev);
  };

  return (
    <div className={`accordion-item ${isOpen ? 'open' : ''}`}>
      <div className="accordion-header" onClick={toggleAccordion}>
        <h3>{question}</h3>
        <Icon
          id="icon-up-arrow"
          size={42}
          height={42}
          className="icon-mobile"
        />
      </div>
      <div className="accordion-content">{answer}</div>
    </div>
  );
};

export default Accordionitem;
