import {useRef, useState} from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import  {Navigation, Pagination} from 'swiper/modules';
import {Swiper as SwiperType} from 'swiper';
import 'swiper/css/bundle';
import 'swiper/css/pagination';
import './Carousel.css';
import djeck from '../../assets/images/happy_stories/djeck.webp';
import Roksi from '../../assets/images/happy_stories/Roksi.webp';
import Chara from '../../assets/images/happy_stories/Chara.webp';
import Richi from '../../assets/images/happy_stories/Richi.webp';
import { Icon } from '../Icon/Icon';

const Carousel = () => {
  const swiperRef = useRef<SwiperType | null>(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const isMobile = window.innerWidth <= 768;

  console.log(isMobile);

  const handlePrevSlide = () => {
    swiperRef.current?.slidePrev();
  };

  const handleNextSlide = () => {
    swiperRef.current?.slideNext();
  };

  const handleSlideChange = (swiper: SwiperType) => {
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
  };


  return (
    <div className="carousel-container">

      {!isMobile&& (<button
        onClick={handlePrevSlide}
        aria-label="Попередній слайд"
      >
        <Icon id="icon-left" size={43} height={43} className={isBeginning ? 'carousel-nav-btn--disabled' : ''}/>
      </button>
        )}
      <Swiper
        modules={[Navigation, Pagination]}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
          setIsBeginning(swiper.isBeginning);
          setIsEnd(swiper.isEnd);
        }}
        onSlideChange={handleSlideChange}
        slidesPerView={isMobile ? 1 : 2}
        slidesPerGroup={isMobile ? 1 : 2}
        spaceBetween={isMobile ? 0 : 30}
        pagination={{
          clickable: true,
        }}
        className="carousel-slider"
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

      {!isMobile && (<button
        className={isEnd ? 'carousel-nav-btn--disabled' : ''}
        onClick={handleNextSlide}
        aria-label="Наступний слайд"
      >
        <Icon id="icon-right" size={43} height={43}/>
      </button>
        )}
    </div>
  );
};
export default Carousel;