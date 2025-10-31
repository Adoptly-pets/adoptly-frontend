import './ContactInfo.css';
import { useTranslation } from 'react-i18next';
import SocialLinks from '../../SocialLinks/SocialLinks';

const ContactInfo = () => {
  const { t } = useTranslation();

  const contactList = [
    {
      label: t('contact.address_label'),
      value: t('contact.address_value'),
    },
    {
      label: t('contact.phone_label'),
      value: t('contact.phone_value'),
    },
    {
      label: t('contact.email_label'),
      value: t('contact.email_value'),
    },
  ];
  return (
    <div className="info-box">
      {contactList.map(item => (
        <div key={item.label}>
          <strong>{item.label}</strong>
          <br />
          <span>{item.value}</span>
        </div>
      ))}
      <div className="social-media">
        <p>
          <strong>{t('contact.socials')}</strong>
        </p>
        <SocialLinks />
      </div>
    </div>
  );
};

export default ContactInfo;
