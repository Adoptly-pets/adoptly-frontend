import 'swiper/css/pagination';
import './BenefitsOfCooperation.css';
import BenefitBlock from '../BenefitBlock/BenefitBlock';
import { BENEFITS_DATA } from '../../constants/BENEFITS_DATA';
import CuteDog from '../../assets/images/Benefits/cute-dog.webp';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';

const BenefitsOfCooperation = () => {
  return (
    <div className="benefits">
      <h3>Переваги співпраці</h3>
      <div className="benefits-mobile">
        <Swiper
          modules={[Pagination]}
          pagination={{ clickable: true }}
          slidesPerView={1}
          spaceBetween={12}
          className="swiper"
        >
          {BENEFITS_DATA.map(item => (
            <SwiperSlide key={item.title}>
              <BenefitBlock
                key={item.title}
                image={item.image}
                title={item.title}
                text={item.text}
              />
            </SwiperSlide>
          ))}
        </Swiper>
        <img
          src={CuteDog}
          alt=""
          aria-hidden="true"
          loading="lazy"
          decoding="async"
        />
      </div>
      <div className="benefits-desktop">
        {BENEFITS_DATA.map(item => (
          <BenefitBlock
            image={item.image}
            title={item.title}
            text={item.text}
          />
        ))}
        <img
          src={CuteDog}
          alt=""
          aria-hidden="true"
          loading="lazy"
          decoding="async"
        />
      </div>
    </div>
  );
};

export default BenefitsOfCooperation;
