import { useForm } from 'react-hook-form';
import './ContactForm.css';
import Button from '../../Button/Button';
import { useTranslation } from 'react-i18next';

interface FormData {
  name: string;
  phoneNumber: string;
  message: string;
}

const ContactForm = () => {
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = (data: FormData) =>
    alert(`Надіслано повідомлення: ` + data.message);
  return (
    <div className="contacts-request">
      <div>
        <h4>{t('contact.contact_us')}</h4>
        <p>{t('contact.contact_description')}</p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="contacts-form">
        <div className="input-with-error">
          <input
            placeholder={t('contact.name_placeholder')}
            {...register('name', {
              required: {
                value: true,
                message: t('errors.required'),
              },
            })}
            className="input-field"
          />
          {errors.name && <span>{errors.name.message}</span>}
        </div>
        <div className="input-with-error">
          <input
            type="tel"
            placeholder={t('contact.phone_placeholder')}
            {...register('phoneNumber', {
              required: {
                value: true,
                message: t('errors.required'),
              },
            })}
            className="input-field"
          />
          {errors.phoneNumber && <span>{errors.phoneNumber.message}</span>}
        </div>

        <textarea
          placeholder={t('contact.message_placeholder')}
          {...register('message')}
          className="input-area"
        />
        <Button
          type="submit"
          variant="primary"
          maxWidth={248.5}
          maxWidthMobile={220}
          height={64}
          style={{ margin: '0 auto' }}
        >
          {t('contact.submit_button')}
        </Button>
      </form>
    </div>
  );
};
export default ContactForm;
