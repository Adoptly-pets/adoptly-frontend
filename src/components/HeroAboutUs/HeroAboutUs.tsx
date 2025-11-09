import './HeroAboutUs.css';
const HeroAboutUs = () => {
  return (
    <section className="hero-background" role="region">
      <div>
        <h1 className="hero-title">Adoptly</h1>
        <p className="hero-text">
          Cервіс, де кожен охочий може знайти свого улюбленця з усіх притулків
          України.
        </p>
      </div>
      <a href="#findpet" className="hero-btn btn-mob">
        Почати пошук
      </a>
      <a href="#findpet" className="hero-btn btn-desc">
        Почати пошук улюбленця
      </a>
    </section>
  );
};

export default HeroAboutUs;
