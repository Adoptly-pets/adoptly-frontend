import { useState } from 'react';
import './Accordionitem.css';
import { Icon } from '../Icon/Icon';

const Accordionitem = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(prev => !prev);
  };

  return (
    <div className={`accordion-item ${isOpen ? 'open' : ''}`}>
      <div className="accordion-header" onClick={toggleAccordion}>
        <h3>Question</h3>
        <span>
          {isOpen ? (
            <Icon id="icon-down-arrow" size={42} height={42} />
          ) : (
            <Icon id="icon-up-arrow" size={43} height={42} />
          )}
        </span>
      </div>
      {isOpen && <div className="accordion-content">Answer</div>}
    </div>
  );
};

export default Accordionitem;
