import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import Button from '../Button/Button';
import './AddAnimalForm.css';

interface AddAnimalFormValues {
  name: string;
  species: 'dog' | 'cat';
  gender: 'male' | 'female';
  ageValue: string;
  ageUnit: 'years' | 'months';
  size: 'small' | 'medium' | 'large';
  vaccinated: boolean;
  sterilized: boolean;
  dewormed: boolean;
  description: string;
  breed: string;
  specialConditions: string;
  arrivalDate: string;
}

interface AddAnimalFormProps {
  onClose: () => void;
  initialData?: Partial<AddAnimalFormValues>;
}

const AddAnimalForm: React.FC<AddAnimalFormProps> = ({
  onClose,
  initialData,
}) => {
  const { t } = useTranslation();
  const isEditing = !!initialData;
  const { register, handleSubmit } = useForm<AddAnimalFormValues>({
    defaultValues: {
      species: 'dog',
      gender: 'male',
      ageUnit: 'years',
      size: 'medium',
      vaccinated: false,
      sterilized: false,
      dewormed: false,
      ...initialData,
    },
  });

  const onSubmit = (data: AddAnimalFormValues) => {
    console.log(data);
    onClose();
  };

  return (
    <div className="add-animal">
      <div className="add-animal-header">
        <h2 className="add-animal-title">
          {isEditing
            ? t('shelterDashboard.addAnimal.editTitle')
            : t('shelterDashboard.addAnimal.title')}
        </h2>
        <button
          type="button"
          className="add-animal-back"
          onClick={onClose}
        >
          {t('shelterDashboard.addAnimal.back')}
        </button>
      </div>

      <form className="add-animal-form" onSubmit={handleSubmit(onSubmit)}>
        <fieldset className="add-animal-section">
          <legend className="add-animal-section-title">
            {t('shelterDashboard.addAnimal.basicInfo')}
          </legend>

          <div className="add-animal-field">
            <label className="add-animal-label">
              {t('shelterDashboard.addAnimal.name')}*
            </label>
            <input
              className="add-animal-input"
              type="text"
              placeholder={t('shelterDashboard.addAnimal.namePlaceholder')}
              {...register('name', { required: true })}
            />
          </div>

          <div className="add-animal-row">
            <div className="add-animal-field">
              <label className="add-animal-label">
                {t('shelterDashboard.addAnimal.species')}*
              </label>
              <select className="add-animal-input add-animal-select" {...register('species')}>
                <option value="dog">{t('shelterDashboard.addAnimal.dog')}</option>
                <option value="cat">{t('shelterDashboard.addAnimal.cat')}</option>
              </select>
            </div>

            <div className="add-animal-field">
              <label className="add-animal-label">
                {t('shelterDashboard.addAnimal.gender')}*
              </label>
              <div className="add-animal-radio-group">
                <label className="add-animal-radio">
                  <input type="radio" value="male" {...register('gender')} />
                  <span className="add-animal-radio-custom" />
                  {t('shelterDashboard.addAnimal.male')}
                </label>
                <label className="add-animal-radio">
                  <input type="radio" value="female" {...register('gender')} />
                  <span className="add-animal-radio-custom" />
                  {t('shelterDashboard.addAnimal.female')}
                </label>
              </div>
            </div>
          </div>

          <div className="add-animal-row">
            <div className="add-animal-field">
              <label className="add-animal-label">
                {t('shelterDashboard.addAnimal.age')}*
              </label>
              <div className="add-animal-age-group">
                <input
                  className="add-animal-input add-animal-age-input"
                  type="number"
                  min="0"
                  placeholder="0"
                  {...register('ageValue', { required: true })}
                />
                <select className="add-animal-input add-animal-age-select" {...register('ageUnit')}>
                  <option value="years">{t('shelterDashboard.addAnimal.years')}</option>
                  <option value="months">{t('shelterDashboard.addAnimal.months')}</option>
                </select>
              </div>
            </div>

            <div className="add-animal-field">
              <label className="add-animal-label">
                {t('shelterDashboard.addAnimal.size')}*
              </label>
              <select className="add-animal-input add-animal-select" {...register('size')}>
                <option value="small">
                  {t('shelterDashboard.addAnimal.sizeSmall')}
                </option>
                <option value="medium">
                  {t('shelterDashboard.addAnimal.sizeMedium')}
                </option>
                <option value="large">
                  {t('shelterDashboard.addAnimal.sizeLarge')}
                </option>
              </select>
            </div>
          </div>
        </fieldset>

        <fieldset className="add-animal-section">
          <legend className="add-animal-section-title">
            {t('shelterDashboard.addAnimal.photo')}
          </legend>
          <div className="add-animal-photo-upload">
            <div className="add-animal-photo-dropzone">
              <p className="add-animal-photo-text">
                {t('shelterDashboard.addAnimal.photoDropzone')}
              </p>
              <p className="add-animal-photo-hint">
                {t('shelterDashboard.addAnimal.photoHint')}
              </p>
            </div>
          </div>
        </fieldset>

        <fieldset className="add-animal-section">
          <legend className="add-animal-section-title">
            {t('shelterDashboard.addAnimal.healthTitle')}
          </legend>

          <div className="add-animal-toggles">
            <label className="add-animal-toggle">
              <input type="checkbox" {...register('vaccinated')} />
              <span className="add-animal-toggle-switch" />
              {t('shelterDashboard.addAnimal.vaccinated')}
            </label>
            <label className="add-animal-toggle">
              <input type="checkbox" {...register('sterilized')} />
              <span className="add-animal-toggle-switch" />
              {t('shelterDashboard.addAnimal.sterilized')}
            </label>
            <label className="add-animal-toggle">
              <input type="checkbox" {...register('dewormed')} />
              <span className="add-animal-toggle-switch" />
              {t('shelterDashboard.addAnimal.dewormed')}
            </label>
          </div>
        </fieldset>

        <fieldset className="add-animal-section">
          <legend className="add-animal-section-title">
            {t('shelterDashboard.addAnimal.descriptionTitle')}
          </legend>

          <div className="add-animal-field">
            <label className="add-animal-label">
              {t('shelterDashboard.addAnimal.description')}*
            </label>
            <textarea
              className="add-animal-input add-animal-textarea"
              rows={5}
              placeholder={t('shelterDashboard.addAnimal.descriptionPlaceholder')}
              {...register('description')}
            />
          </div>

          <div className="add-animal-field">
            <label className="add-animal-label">
              {t('shelterDashboard.addAnimal.breed')}
            </label>
            <input
              className="add-animal-input"
              type="text"
              placeholder={t('shelterDashboard.addAnimal.breedPlaceholder')}
              {...register('breed')}
            />
          </div>

          <div className="add-animal-field">
            <label className="add-animal-label">
              {t('shelterDashboard.addAnimal.specialConditions')}
            </label>
            <input
              className="add-animal-input"
              type="text"
              placeholder={t('shelterDashboard.addAnimal.specialConditionsPlaceholder')}
              {...register('specialConditions')}
            />
          </div>

          <div className="add-animal-field">
            <label className="add-animal-label">
              {t('shelterDashboard.addAnimal.arrivalDate')}
            </label>
            <input
              className="add-animal-input"
              type="date"
              {...register('arrivalDate')}
            />
          </div>
        </fieldset>

        <div className="add-animal-actions">
          <Button type="submit" variant="primary" maxWidth="280px">
            {isEditing
              ? t('shelterDashboard.addAnimal.saveChanges')
              : t('shelterDashboard.addAnimal.save')}
          </Button>
          <button type="button" className="add-animal-cancel" onClick={onClose}>
            {t('shelterDashboard.addAnimal.cancel')}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddAnimalForm;
