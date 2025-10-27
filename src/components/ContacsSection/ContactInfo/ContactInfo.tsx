import './ContactInfo.css';
import { Icon } from '../../Icon/Icon';

const ContactInfo = () => {
  const contactList = [
    {
      label: 'Адреса',
      value: '00000, Обласна обл., м. Місто, вул. Вулична, буд. 1, оф. 2',
    },
    { label: 'Номер телефону', value: '+38 (093) 123 45 67' },
    { label: 'Електронна пошта', value: 'adoptly@gmail.com' },
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
      <div>
        <p>
          <strong>Соціальні мережі Adoptly</strong>
        </p>
        <div className="social-icons">
          <a
            className="btn-footer"
            title="Instagram"
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.instagram.com"
            aria-label="Instagram"
          >
            <Icon
              id="icon-instagram"
              className="footer-icon"
              size={25}
              height={22}
            />
          </a>
          <a
            className="btn-footer"
            title="Facebook"
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.facebook.com"
            aria-label="Facebook"
          >
            <Icon
              id="icon-facebook"
              className="footer-icon"
              size={25}
              height={22}
            />
          </a>
          <a
            className="btn-footer"
            title="TikTok"
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.tiktok.com"
            aria-label="TikTok"
          >
            <Icon
              id="icon-tiktok"
              className="footer-icon"
              size={25}
              height={22}
            />
          </a>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
