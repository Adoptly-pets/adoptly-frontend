import Button from '../Button/Button';
import './ShelterSupportSection.css';

const ShelterSupportSection = () => {
  return (
    <section className="shelter-support-section">
      <div className="content-container">
        <h3>
          Додавайте тварин у каталог та отримуйте донати, корм та ліки від
          небайдужих людей
        </h3>
        <Button variant="primary" maxWidth={396} maxWidthMobile={240}>
          Зареєструвати притулок
        </Button>
      </div>
    </section>
  );
};
export default ShelterSupportSection;
