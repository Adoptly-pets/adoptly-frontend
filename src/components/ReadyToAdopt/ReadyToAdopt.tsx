import './ReadyToAdopt.css'
const ReadyToAdopt=()=>{
return(
    <section className='ready-to-adopt'>
        <div className='text-box'>
        <h3 className='title'>Готовий зустріти нового друга?</h3>
        <p className='description'>Обирай фільтри - котик чи собачка, вік, розмір та інші параметри і починай пошук друга прямо зараз.</p>
      <button onClick={() => alert('Кнопка "Почати пошук улюбленця“ натиснута!')} type='button' className='search-btn'>Почати пошук улюбленця</button>
        
        </div>
      
          <img className='img-dog' src="images/Dog.svg" alt="dog" />
        <img className='img-cat' src="images/Cat.svg" alt="cat" />
      
        </section>
   

)
}
export default ReadyToAdopt;