import React, { useRef } from 'react';
import SwiperCore, { Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import image1 from '../assets/image1.png';
import image2 from '../assets/image2.png';
import image3 from '../assets/image3.png';
import image4 from '../assets/image4 (3).png';
import image5 from '../assets/image5.png';
import image6 from '../assets/image6.png';

SwiperCore.use([Navigation, Pagination]);

const VerticalHorizontalCarousels = () => {
  const verticalSwiper = useRef(null);
  const horizontalSwiper = useRef(null);

  const verticalSettings = {
    direction: 'vertical',
    slidesPerView: 3,
    spaceBetween: 20,
    autoplay: {
      delay: 2000,
      disableOnInteraction: false,
    },
    breakpoints: {
      768: {
        slidesPerView: 4,
      },
      480: {
        slidesPerView: 1,
      },
    },
    onSlideChange: () => {
      if (horizontalSwiper.current && verticalSwiper.current) {
        horizontalSwiper.current.slideTo(verticalSwiper.current.activeIndex);
      }
    },
  };

  const horizontalSettings = {
    slidesPerView: 1,
    spaceBetween: 20,
    onSlideChange: () => {
      if (verticalSwiper.current && horizontalSwiper.current) {
        verticalSwiper.current.slideTo(horizontalSwiper.current.activeIndex);
      }
    },
  };

  return (
    <div style={{ display: 'flex', alignItems: 'flex-start' }}>
      <div style={{ height: '50%', marginRight: '20px' }}>
        <h2>Vertical Carousel</h2>
        <Swiper {...verticalSettings} ref={verticalSwiper}>
          <SwiperSlide>
            <div onClick={() => verticalSwiper.current.slideTo(0)} style={{ cursor: 'pointer' }}>
              <img src={image1} alt="Slide A" style={{ width: '30%', height: '30%' }} />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div onClick={() => verticalSwiper.current.slideTo(1)} style={{ cursor: 'pointer' }}>
              <img src={image2} alt="Slide B" style={{ width: '30%', height: '30%' }} />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div onClick={() => verticalSwiper.current.slideTo(2)} style={{ cursor: 'pointer' }}>
              <img src={image3} alt="Slide C" style={{ width: '30%', height: '30%' }} />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div onClick={() => verticalSwiper.current.slideTo(3)} style={{ cursor: 'pointer' }}>
              <img src={image4} alt="Slide D" style={{ width: '30%', height: '30%' }} />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div onClick={() => verticalSwiper.current.slideTo(4)} style={{ cursor: 'pointer' }}>
              <img src={image5} alt="Slide E" style={{ width: '30%', height: '30%' }} />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div onClick={() => verticalSwiper.current.slideTo(5)} style={{ cursor: 'pointer' }}>
              <img src={image6} alt="Slide F" style={{ width: '30%', height: '30%' }} />
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
      <div style={{ width: '70%' }}>
        <h2>Horizontal Carousel</h2>
        <Swiper {...horizontalSettings} ref={horizontalSwiper}>
          <SwiperSlide><img src={image1} alt="Slide 1" style={{ width: '100%', height: '30%' }} /></SwiperSlide>
          <SwiperSlide><img src={image2} alt="Slide 2" style={{ width: '100%', height: '30%' }} /></SwiperSlide>
          <SwiperSlide><img src={image3} alt="Slide 3" style={{ width: '100%', height: '30%' }} /></SwiperSlide>
          <SwiperSlide><img src={image4} alt="Slide 4" style={{ width: '100%', height: '30%' }} /></SwiperSlide>
          <SwiperSlide><img src={image5} alt="Slide 5" style={{ width: '100%', height: '30%' }} /></SwiperSlide>
          <SwiperSlide><img src={image6} alt="Slide 6" style={{ width: '100%', height: '30%' }} /></SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
};

export default VerticalHorizontalCarousels;
