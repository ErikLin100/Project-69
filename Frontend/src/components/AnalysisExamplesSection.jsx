import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import keythemes1 from '../assets/images/themecomment1.png';
import keythemes2 from '../assets/images/themecomment2.png';
import keythemes3 from '../assets/images/themecomment3.png';
import keythemes4 from '../assets/images/themecomment4.png';
import neg1 from '../assets/images/neg1.png';
import neg2 from '../assets/images/neg2.png';
import neg3 from '../assets/images/neg3.png';
import neg4 from '../assets/images/neg4.png';

const keyThemeImages = [keythemes1, keythemes2, keythemes3, keythemes4];
const negativeImages = [neg1, neg2, neg3, neg4];

const AnalysisExamplesSection = () => {
    const sliderSettings = {
      dots: false,
      infinite: true,
      speed: 15000,
      slidesToShow: 2.5,
      centerMode:true,
      centerPadding: '10%',
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 0,
      cssEase: 'linear',
      pauseOnHover: false,
      swipe: false,
      touchMove: false,
    };
  
    return (
      <section className="py-16 bg-transparent overflow-hidden">
      <h2 className="text-[#313030] text-5xl font-semibold font-roboto text-center mb-12">
        <span className="font-extrabold bg-gradient-to-r from-purple-600 to-purple-400 text-transparent bg-clip-text">Automate</span> your feedback process with AI analysis
      </h2>
         
          <div className="mb-12 -mx-8">
            <Slider {...sliderSettings}>
              {keyThemeImages.map((img, index) => (
                <div key={index} className="px-4">
                  <img src={img} alt={`Key Theme ${index + 1}`} className="rounded-3xl shadow-md w-full h-auto" />
                </div>
              ))}
            </Slider>
          </div>
   
          <div className="-mx-8">
            <Slider {...sliderSettings} rtl={true}>
              {negativeImages.map((img, index) => (
                <div key={index} className="px-4">
                  <img src={img} alt={`Negative Point ${index + 1}`} className="rounded-3xl shadow-md w-full h-auto" />
                </div>
              ))}
            </Slider>
          </div>
        </section>
      );
    };
    
export default AnalysisExamplesSection;