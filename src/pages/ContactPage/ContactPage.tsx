import { useTranslation } from 'react-i18next';
import ContactForm from '../../components/ContacsSection/ContactForm/ContactForm';
import ContactInfo from '../../components/ContacsSection/ContactInfo/ContactInfo';
import './ContactPage.css';

const ContactPage = () => {
  const { t } = useTranslation();
  return (
    <div className="container">
      <h3>{t('contact.title')}</h3>
      <section className="contacs-section">
        <ContactInfo />
        <ContactForm />
      </section>
    </div>
  );
};
export default ContactPage;
