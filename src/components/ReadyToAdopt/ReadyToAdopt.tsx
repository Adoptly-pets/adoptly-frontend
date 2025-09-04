import './ReadyToAdopt.css';
import catFootprint from '../../assets/images/ReadyToAdopt/cat-footprint.png'
import catFootprint1 from '../../assets/images/ReadyToAdopt/cat-footprint-1.png'
import catFootprint2 from '../../assets/images/ReadyToAdopt/cat-footprint-2.png'
import catFootprint3 from '../../assets/images/ReadyToAdopt/cat-footprint-3.png'

const ReadyToAdopt = () => {
  return (
    <section className="ready-to-adopt">
      <div className="text-box">
        <h3 className="title">Готовий зустріти нового друга?</h3>
        <p className="description">
          Обирай фільтри - котик чи собачка, вік, розмір та інші параметри і
          починай пошук друга прямо зараз.
        </p>
        <a href="#findpet" className="search-btn">
          Почати пошук улюбленця
        </a>
      </div>

      <img className="img-dog" src="images/Dog.svg" alt="dog" />
      <img className="img-cat" src="images/Cat.svg" alt="cat" />

     <img className='images-footprint footprint' src={catFootprint} alt="cat-footprint" />
       <img className='images-footprint footprint-1' src={catFootprint1} alt="cat-footprint" />
         <img className='images-footprint footprint-2' src={catFootprint2} alt="cat-footprint" />
           <img className='images-footprint footprint-3' src={catFootprint3} alt="cat-footprint" />
     
    
      
    </section>
  );
};
export default ReadyToAdopt;
