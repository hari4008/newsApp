import React, { useRef } from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import image1 from '../assets/image1.png';
import image2 from '../assets/image2.png';
import image3 from '../assets/image3.png';
import image4 from '../assets/image4 (3).png';
import image5 from '../assets/image5.png';
import image6 from '../assets/image6.png';

const VerticalHorizontalCarousels = () => {
  const verticalSlider = useRef(null);
  const horizontalSlider = useRef(null);

  const verticalSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    vertical: true,
    verticalSwiping: true,
    autoplay: true,            // Enable autoplay
    autoplaySpeed: 2000,       // Autoplay speed in milliseconds
    beforeChange: (current, next) => {
      if (horizontalSlider.current) {
        horizontalSlider.current.slickGoTo(next);
      }
    },
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 4,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        }
      }
    ]
  };

  const horizontalSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    vertical: false,
    verticalSwiping: false,
    beforeChange: (current, next) => {
      if (verticalSlider.current) {
        verticalSlider.current.slickGoTo(next);
      }
    },
  };

  return (
    <div style={{ display: 'flex', alignItems: 'flex-start' }}>
      <div style={{ height: '50%', marginRight: '20px' }}>
        <h2>Vertical Carousel</h2>
        <Slider {...verticalSettings} ref={verticalSlider}>
          <div onClick={() => verticalSlider.current.slickGoTo(0)} style={{ cursor: 'pointer' }}>
            <img src={image1} alt="Slide A" style={{ width: '30%', height: '30%' }} />
          </div>
          <div onClick={() => verticalSlider.current.slickGoTo(1)} style={{ cursor: 'pointer' }}>
            <img src={image2} alt="Slide B" style={{ width: '30%', height: '30%' }} />
          </div>
          <div onClick={() => verticalSlider.current.slickGoTo(2)} style={{ cursor: 'pointer' }}>
            <img src={image3} alt="Slide C" style={{ width: '30%', height: '30%' }} />
          </div>
          <div onClick={() => verticalSlider.current.slickGoTo(3)} style={{ cursor: 'pointer' }}>
            <img src={image4} alt="Slide D" style={{ width: '30%', height: '30%' }} />
          </div>
          <div onClick={() => verticalSlider.current.slickGoTo(4)} style={{ cursor: 'pointer' }}>
            <img src={image5} alt="Slide E" style={{ width: '30%', height: '30%' }} />
          </div>
          <div onClick={() => verticalSlider.current.slickGoTo(5)} style={{ cursor: 'pointer' }}>
            <img src={image6} alt="Slide F" style={{ width: '30%', height: '30%' }} />
          </div>
        </Slider>
      </div>
      <div style={{ width: '70%' }}>
        <h2>Horizontal Carousel</h2>
        <Slider {...horizontalSettings} ref={horizontalSlider}>
          <div><img src={image1} alt="Slide 1" style={{ width: '100%', height: '30%', display:'' }} /></div>
          <div><img src={image2} alt="Slide 2" style={{ width: '100%', height: '30%' }} /></div>
          <div><img src={image3} alt="Slide 3" style={{ width: '100%', height: '30%' }} /></div>
          <div><img src={image4} alt="Slide 4" style={{ width: '100%', height: '30%' }} /></div>
          <div><img src={image5} alt="Slide 5" style={{ width: '100%', height: '30%' }} /></div>
          <div><img src={image6} alt="Slide 6" style={{ width: '100%', height: '30%' }} /></div>
        </Slider>
      </div>
    </div>
  );
}

export default VerticalHorizontalCarousels;
