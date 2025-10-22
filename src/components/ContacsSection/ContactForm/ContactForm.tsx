import { useForm } from 'react-hook-form';

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
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        placeholder="Ваше ім'я*"
        {...register('name', { required: "Це поле обов'язкове" })}
      />
      {errors.name && <span>{errors.name.message}</span>}
      <input
        placeholder="Номер телефону*"
        {...register('phoneNumber', { required: "Це поле обов'язкове" })}
      />
      {errors.phoneNumber && <span>{errors.phoneNumber.message}</span>}
      <textarea {...register('message')} />
      <input type="submit" />
    </form>
  );
};
export default ContactForm;
