import ContactForm from '../../components/ContacsSection/ContactForm/ContactForm';
import ContactInfo from '../../components/ContacsSection/ContactInfo/ContactInfo';
import './ContactPage.css';

const ContactPage = () => {
  return (
    <div className="container">
      <h3>Контакти</h3>
      <section className="contacs-section">
        <ContactInfo />
        <ContactForm />
      </section>
    </div>
  );
};
export default ContactPage;
