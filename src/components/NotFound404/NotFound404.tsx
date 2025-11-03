import mobile from '../../assets/images/NotFound/pets-mob.webp';
import desktop from '../../assets/images/NotFound/pets-desk.webp';
import './NotFound404.css';
import footprint1mob from '../../assets/images/NotFound/footprint1-mob.webp';
import footprint2mob from '../../assets/images/NotFound/footprint2-mob.webp';
import footprint1 from '../../assets/images/NotFound/footprint1.webp';
import footprint2 from '../../assets/images/NotFound/footprint2.webp';
import { Link } from 'react-router-dom';

const NotFound404 = () => {
  return (
    <section className="section-404">
      <picture>
        <source srcSet={footprint1mob} media="(max-width:767px)" />
        <source srcSet={footprint1} media="(min-width:768px)" />
        <img
          src={footprint1}
          alt=""
          loading="lazy"
          decoding="async"
          className="footprint1"
          aria-hidden="true"
        />
      </picture>

      <div className="box-404">
        <picture>
          <source srcSet={mobile} media="(max-width:767px)" />
          <source srcSet={desktop} media="(min-width:768px)" />
          <img
            src={desktop}
            alt=""
            loading="lazy"
            decoding="async"
            className="notFound-img"
            aria-hidden="true"
          />
        </picture>
        <p className="text-404">
          {' '}
          Упс! Такої сторінки не існує або наша команда ще працює над нею.
        </p>
        <div className="btn-404">
          <Link to="/">Повернутись на головну</Link>
        </div>
      </div>
      <picture>
        <source srcSet={footprint2mob} media="(max-width:767px)" />
        <source srcSet={footprint2} media="(min-width:768px)" />
        <img
          src={footprint2}
          alt=""
          loading="lazy"
          decoding="async"
          className="footprint2"
          aria-hidden="true"
        />
      </picture>
    </section>
  );
};

export default NotFound404;
