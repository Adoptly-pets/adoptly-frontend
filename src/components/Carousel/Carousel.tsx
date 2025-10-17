import {useRef} from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import  {Navigation} from 'swiper/modules';
import {Swiper as SwiperType} from 'swiper';
import 'swiper/css/bundle';
import './Carousel.css';
import djeck from '../../assets/images/happy_stories/djeck.webp';
import Roksi from '../../assets/images/happy_stories/Roksi.webp';
import Chara from '../../assets/images/happy_stories/Chara.webp';
import Richi from '../../assets/images/happy_stories/Richi.webp';
import { Icon } from '../Icon/Icon';

const Carousel = () => {
  const swiperRef = useRef<SwiperType | null>(null);


  const handlePrevSlide = () => {
    swiperRef.current?.slidePrev();
  };

  const handleNextSlide = () => {
    swiperRef.current?.slideNext();
  };

  return (
    <div className="carousel-container">

      <button
        className="carousel-nav-btn carousel-nav-btn--prev"
        onClick={handlePrevSlide}
        aria-label="Попередній слайд"
      >
        <Icon id="icon-left" size={43} height={43}/>
      </button>

      <Swiper
        modules={[Navigation]}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}

        slidesPerView={2}
        slidesPerGroup={2}
        spaceBetween={30}
      >
        <SwiperSlide>
          <img src={djeck} alt="Djeck" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={Chara} alt="Chara" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={Richi} alt="Richi" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={Roksi} alt="Roksi" />
        </SwiperSlide>
      </Swiper>

      <button
        className="carousel-nav-btn carousel-nav-btn--next"
        onClick={handleNextSlide}
        aria-label="Наступний слайд"
      >
        <Icon id="icon-right" size={43} height={43}/>
      </button>

    </div>
  );
};
export default Carousel;