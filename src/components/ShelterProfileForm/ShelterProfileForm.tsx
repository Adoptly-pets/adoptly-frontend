import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { Icon } from '../Icon/Icon';
import Button from '../Button/Button';
import './ShelterProfileForm.css';

interface ShelterProfileFormValues {
  name: string;
  city: string;
  address: string;
  contactName: string;
  contactPhone: string;
  contactEmail: string;
  description: string;
  workingHours: string;
  animalTypes: string[];
  languages: string[];
}

const ShelterProfileForm: React.FC = () => {
  const { t } = useTranslation();
  const { register, handleSubmit } = useForm<ShelterProfileFormValues>({
    defaultValues: {
      name: 'HappyPaw',
      city: 'Одеса',
      address: 'вул. Приморська, 42',
      contactName: 'Олена Петренко',
      contactPhone: '+380 (67) 123 45 67',
      contactEmail: 'happypaw@gmail.com',
      description:
        'Ми допомагаємо бездомним тваринам знайти люблячий дім. Працюємо з собаками та котами, забезпечуємо ветеринарну допомогу та соціалізацію.',
      workingHours: 'Пн-Пт: 09:00-18:00, Сб: 10:00-15:00',
      animalTypes: ['dogs', 'cats'],
      languages: ['uk'],
    },
  });

  const onSubmit = (data: ShelterProfileFormValues) => {
    console.log(data);
  };

  return (
    <div className="shelter-profile">
      <h2 className="shelter-profile-title">
        {t('shelterDashboard.profile.title')}
      </h2>

      <form className="shelter-profile-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="shelter-profile-photo-section">
          <div className="shelter-profile-photo">
            <Icon id="icon-user" size={48} />
          </div>
          <div className="shelter-profile-photo-info">
            <p className="shelter-profile-photo-label">
              {t('shelterDashboard.profile.photo')}
            </p>
            <p className="shelter-profile-photo-hint">
              {t('shelterDashboard.profile.photoHint')}
            </p>
            <button type="button" className="shelter-profile-photo-upload">
              {t('shelterDashboard.profile.uploadPhoto')}
            </button>
          </div>
        </div>

        <fieldset className="shelter-profile-section">
          <legend className="shelter-profile-section-title">
            {t('shelterDashboard.profile.basicInfo')}
          </legend>

          <div className="shelter-form-field">
            <label className="shelter-form-label">
              {t('shelterDashboard.profile.name')}*
            </label>
            <input
              className="shelter-form-input"
              type="text"
              {...register('name')}
            />
          </div>

          <div className="shelter-form-row">
            <div className="shelter-form-field">
              <label className="shelter-form-label">
                {t('shelterDashboard.profile.city')}*
              </label>
              <input
                className="shelter-form-input"
                type="text"
                {...register('city')}
              />
            </div>
            <div className="shelter-form-field">
              <label className="shelter-form-label">
                {t('shelterDashboard.profile.address')}*
              </label>
              <input
                className="shelter-form-input"
                type="text"
                {...register('address')}
              />
            </div>
          </div>

          <div className="shelter-form-field">
            <label className="shelter-form-label">
              {t('shelterDashboard.profile.description')}*
            </label>
            <textarea
              className="shelter-form-input shelter-form-textarea"
              rows={4}
              placeholder={t('shelterDashboard.profile.descriptionPlaceholder')}
              {...register('description')}
            />
          </div>

          <div className="shelter-form-field">
            <label className="shelter-form-label">
              {t('shelterDashboard.profile.workingHours')}
            </label>
            <input
              className="shelter-form-input"
              type="text"
              {...register('workingHours')}
            />
          </div>
        </fieldset>

        <fieldset className="shelter-profile-section">
          <legend className="shelter-profile-section-title">
            {t('shelterDashboard.profile.contactInfo')}
          </legend>

          <div className="shelter-form-field">
            <label className="shelter-form-label">
              {t('shelterDashboard.profile.contactName')}*
            </label>
            <input
              className="shelter-form-input"
              type="text"
              {...register('contactName')}
            />
          </div>

          <div className="shelter-form-row">
            <div className="shelter-form-field">
              <label className="shelter-form-label">
                {t('shelterDashboard.profile.contactPhone')}*
              </label>
              <input
                className="shelter-form-input"
                type="tel"
                {...register('contactPhone')}
              />
            </div>
            <div className="shelter-form-field">
              <label className="shelter-form-label">
                {t('shelterDashboard.profile.contactEmail')}*
              </label>
              <input
                className="shelter-form-input"
                type="email"
                {...register('contactEmail')}
              />
            </div>
          </div>
        </fieldset>

        <fieldset className="shelter-profile-section">
          <legend className="shelter-profile-section-title">
            {t('shelterDashboard.profile.settings')}
          </legend>

          <div className="shelter-form-field">
            <label className="shelter-form-label">
              {t('shelterDashboard.profile.animalTypes')}*
            </label>
            <div className="shelter-form-checkbox-group">
              <label className="shelter-form-checkbox">
                <input
                  type="checkbox"
                  value="dogs"
                  {...register('animalTypes')}
                />
                <span className="shelter-form-checkbox-custom" />
                {t('shelterDashboard.profile.dogs')}
              </label>
              <label className="shelter-form-checkbox">
                <input
                  type="checkbox"
                  value="cats"
                  {...register('animalTypes')}
                />
                <span className="shelter-form-checkbox-custom" />
                {t('shelterDashboard.profile.cats')}
              </label>
              <label className="shelter-form-checkbox">
                <input
                  type="checkbox"
                  value="other"
                  {...register('animalTypes')}
                />
                <span className="shelter-form-checkbox-custom" />
                {t('shelterDashboard.profile.other')}
              </label>
            </div>
          </div>

          <div className="shelter-form-field">
            <label className="shelter-form-label">
              {t('shelterDashboard.profile.languages')}
            </label>
            <div className="shelter-form-checkbox-group">
              <label className="shelter-form-checkbox">
                <input
                  type="checkbox"
                  value="uk"
                  {...register('languages')}
                />
                <span className="shelter-form-checkbox-custom" />
                {t('shelterDashboard.profile.langUk')}
              </label>
              <label className="shelter-form-checkbox">
                <input
                  type="checkbox"
                  value="en"
                  {...register('languages')}
                />
                <span className="shelter-form-checkbox-custom" />
                {t('shelterDashboard.profile.langEn')}
              </label>
            </div>
          </div>
        </fieldset>

        <div className="shelter-profile-actions">
          <Button type="submit" variant="primary" maxWidth="320px">
            {t('shelterDashboard.profile.save')}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ShelterProfileForm;
