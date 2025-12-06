import React, { useState } from 'react';
import './Accordionitem.css';
import { Icon } from '../Icon/Icon';

export type AnswerItem =
  | { type: 'list'; content: string[] }
  | { type: 'text'; content: string };

interface AccordionItemProps {
  question: string;
  answer: string | AnswerItem[];
}

const AccordionItem: React.FC<AccordionItemProps> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(prev => !prev);
  };

  const renderAnswer = () => {
    if (typeof answer === 'string') return <p>{answer}</p>;

    return answer.map((item, idx) =>
      item.type === 'list' ? (
        <ul key={idx}>
          {item.content.map((li, i) => (
            <li key={i}>{li}</li>
          ))}
        </ul>
      ) : (
        <p key={idx}>{item.content}</p>
      )
    );
  };

  return (
    <div className={`accordion-item ${isOpen ? 'open' : ''}`}>
      <div
        className="accordion-header"
        onClick={toggleAccordion}
        role="button"
        aria-expanded={isOpen}
        aria-controls={`accordion-content-${question}`}
        tabIndex={0}
        onKeyDown={e => {
          if (e.key === 'Enter' || e.key === ' ') toggleAccordion();
        }}
      >
        <h3>{question}</h3>
        <Icon
          id="icon-up-arrow"
          size={42}
          height={42}
          className="icon-mobile"
        />
      </div>
      {isOpen && (
        <div
          id={`accordion-content-${question}`}
          className="accordion-content"
          aria-hidden={!isOpen}
        >
          {renderAnswer()}
        </div>
      )}
    </div>
  );
};

export default AccordionItem;
