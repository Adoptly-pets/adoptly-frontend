import mobile from '../../assets/images/NotFound/pets-mob.webp';
import desktop from '../../assets/images/NotFound/pets-desk.webp';
import './NotFound404.css';
import footprint1mob from '../../assets/images/NotFound/footprint1-mob.webp';
import footprint2mob from '../../assets/images/NotFound/footprint2-mob.webp';
import footprint1 from '../../assets/images/NotFound/footprint1.webp';
import footprint2 from '../../assets/images/NotFound/footprint2.webp';

const NotFound404 = () => {
  return (
    <section className="section-404">
      <picture>
        <source src={footprint1mob} media="(max-width:767px)" />
        <source src={footprint1} media="(min-width:768px)" />
        <img
          src={footprint1}
          alt="footprint"
          loading="lazy"
          className="footprint1"
        />
      </picture>

      <div className="box-404">
        <picture>
          <source src={mobile} media="(max-width:767px)" />
          <source src={desktop} media="(min-width:768px)" />
          <img
            src={desktop}
            alt="pets"
            loading="lazy"
            className="notFound-img"
          />
        </picture>
        <p className="text-404">
          {' '}
          Упс! Такої сторінки не існує або наша команда ще працює над нею.
        </p>
        <div className="btn-404">
          <a href="/">Повернутись на головну</a>
        </div>
      </div>
      <picture>
        <source src={footprint2mob} media="(max-width:767px)" />
        <source src={footprint2} media="(min-width:768px)" />
        <img
          src={footprint2}
          alt="footprint"
          loading="lazy"
          className="footprint2"
        />
      </picture>
    </section>
  );
};

export default NotFound404;
