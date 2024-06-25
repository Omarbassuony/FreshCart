import React from 'react';
import axios from "axios";
import Slider from "react-slick";
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import GridLoader from "react-spinners/GridLoader";
import notfound from "../../assets/images/error.png";

export default function CategoriesSlider() {
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 8,
    slidesToScroll: 3,
    autoplay: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };

  let { data, isError, isLoading } = useQuery({
    queryKey: ['recentcategories'],
    queryFn: getCategories
  });

  function getCategories() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/Categories`);
  }

  if (isLoading) {
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-white z-50">
        <GridLoader color="#16a34a" loading={isLoading} size={50} />
      </div>
    );
  }

  if (isError) {
    return (
      <img src={notfound} className='p-10 h-[500px] w-full' alt="Error" />
    );
  }

  return (
    <>
      <h2 className="px-5 sm:px-0 font-bold text-xl text-green-600">Shop Popular Categories</h2>
      <Slider {...settings}>
        {data?.data.data.map((category) => (
          <Link to="/categories" key={category._id} className='p-5 sm:p-0'>
            <div className='my-4'>
              <img className='w-full h-[250px]' src={category?.image} alt={category?.name} />
              <h3 className='font-light mt-2'>{category?.name}</h3>
            </div>
          </Link>
        ))}
      </Slider>
    </>
  );
}
