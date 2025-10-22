import ContactForm from '../../components/ContacsSection/ContactForm/ContactForm';
import ContactInfo from '../../components/ContacsSection/ContactInfo/ContactInfo';

const ContactPage = () => {
  return (
    <div className="contacts">
      <h2>Контакти</h2>
      <section>
        <ContactInfo />
        <ContactForm />
      </section>
    </div>
  );
};
export default ContactPage;
