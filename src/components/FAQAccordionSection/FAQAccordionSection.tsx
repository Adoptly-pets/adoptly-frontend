import AccordionItem from '../../components/AccordionItem/AccordionItem';
import { FAQ_DATA } from '../../constants/FAQ_DATA';
import './FAQAccordionSection.css';

const FAQAccordionSection = () => {
  return (
    <div className="faq-section">
      <h2>Часті запитання</h2>
      {FAQ_DATA.map(item => (
        <AccordionItem
          key={item.id}
          question={item.question}
          answer={item.answer}
        />
      ))}
    </div>
  );
};

export default FAQAccordionSection;
