import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/bundle';
import './Carousel.css';
import djeck from '../../assets/images/happy_stories/djeck.webp';
import Roksi from '../../assets/images/happy_stories/Roksi.webp';

const Carousel = () => {
  return (
    <div className="carousel-container">
      <Swiper
        slidesPerView={2}
        spaceBetween={30}
      >
        <SwiperSlide>
          <img src={djeck} alt="Chara" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={Roksi} alt="Roksi" />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};
export default Carousel;