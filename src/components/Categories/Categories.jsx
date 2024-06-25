import React from 'react';
import axios from "axios";
import { useQuery } from '@tanstack/react-query';
import GridLoader from "react-spinners/GridLoader";
import notfound from "../../assets/images/error.png";

export default function Categories() {

  let { data, isError, isLoading, error } = useQuery({
    queryKey: ['recentcategories'],
    queryFn: getCategories
  });

  function getCategories() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/Categories`);
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-white">
        <GridLoader color="#16a34a" loading={isLoading} size={50} />
      </div>
    );
  }

  if (isError) {
    return (
      <img src={notfound} className='p-10 h-[500px] w-full' alt="Not Found" />
    );
  }

  return (
    <div className="container my-5 py-5">
      <h2 className="font-bold text-3xl text-center mb-10 text-green-600">All Categories</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-14 sm:p-0">
        {data?.data.data.map((category) => (
          <div key={category._id} className="col">
            <div className='my-4 '>
              <img className='w-full h-[500px] sm:h-[300px] md:h-[300px]' src={category?.image} alt={category?.name} />
              <h3 className='font-semibold text-2xl text-green-600 mt-2 text-center'>{category?.name}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
