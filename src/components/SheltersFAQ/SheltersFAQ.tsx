import AccordionItem from '../../components/AccordionItem/AccordionItem';
import { SHELTERS_FAQ_DATA } from '../../constants/SHELTERS_FAQ-DATA';

const SheltersFAQ = () => {
  return (
    <div className="faq-section">
      <h2>Часті запитання</h2>
      {SHELTERS_FAQ_DATA.map(item => (
        <AccordionItem
          key={item.id}
          question={item.question}
          answer={item.answer}
        />
      ))}
    </div>
  );
};

export default SheltersFAQ;
