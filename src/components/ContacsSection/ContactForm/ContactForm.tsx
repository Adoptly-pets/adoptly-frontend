import { useForm } from 'react-hook-form';
import './ContactForm.css';

interface FormData {
  name: string;
  phoneNumber: string;
  message: string;
}

const ContactForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => console.log(data);
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="contacts-form">
      <div className="input-with-error">
        <input
          placeholder="Ваше ім'я*"
          {...register('name', { required: "Це поле обов'язкове" })}
          className="input-field"
        />
        {errors.name && <span>{errors.name.message}</span>}
      </div>
      <div className="input-with-error">
        <input
          placeholder="Номер телефону*"
          {...register('phoneNumber', { required: "Це поле обов'язкове" })}
          className="input-field"
        />
        {errors.phoneNumber && <span>{errors.phoneNumber.message}</span>}
      </div>

      <textarea
        placeholder="Текстове повідомлення"
        {...register('message')}
        className="input-area"
      />
      <input type="submit" />
    </form>
  );
};
export default ContactForm;
