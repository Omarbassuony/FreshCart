import React, { useEffect, useState } from 'react';
import axios from "axios";
import Slider from "react-slick";
import mainslider from "../../assets/images/slider-image-3.jpeg";
import mainslider1 from "../../assets/images/slider-2.jpeg";
import mainslider2 from "../../assets/images/grocery-banner-2.jpeg";
import slider1 from "../../assets/images/slider-image-1.jpeg";
import slider2 from "../../assets/images/slider-image-2.jpeg";

export default function MainSlider() {
    var settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay:"true",
      arrows:false,
    };

  
      return (
        <>
            <div className='row'>
                <div className="md:w-3/4 w-full mb-4 md:mb-0">
                <Slider {...settings}>
                   <img  className='w-full h-[300px] md:h-[400px] object-cover' src={mainslider} alt="" />
                   <img  className='w-full h-[300px] md:h-[400px] object-cover' src={mainslider1} alt="" />
                   <img  className='w-full h-[300px] md:h-[400px] object-cover' src={mainslider2} alt="" />
                </Slider>
                </div>
                <div className="md:w-1/4 w-full flex flex-col justify-between">
                    <img  className='w-full h-[150px] md:h-[200px] object-cover mb-4 md:mb-0' src={slider1} alt="" />
                    <img  className='w-full h-[150px] md:h-[200px] object-cover' src={slider2} alt="" />
                </div>
            </div>

        </>
      );
}
