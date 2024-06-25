import React, { useEffect, useState } from 'react';
import Style from './Brands.module.css';
import axios from "axios";
import { useQuery } from '@tanstack/react-query';
import GridLoader from "react-spinners/GridLoader";
import notfound from "../../assets/images/error.png"

export default function Brands() {
    const [selectedBrand, setSelectedBrand] = useState(null);

    let { data, isError, isLoading, error } = useQuery({
        queryKey: ['brands'],
        queryFn: getBrands
    });

    function getBrands() {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/brands`);
    }

    const openBrandModal = (brand) => {
        setSelectedBrand(brand);
    };

    const closeBrandModal = () => {
        setSelectedBrand(null);
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-screen bg-white">
                <GridLoader color="#16a34a" loading={isLoading} size={50} />
            </div>
        );
    }

    if (isError) {
        return (
            <img src={notfound} className='p-10 h-[500px] w-full' alt="" />
        );
    }

    return (
        <>
            <div className="container my-5 py-5">
                <h2 className="font-bold text-3xl text-center mb-10 text-green-600">All brands</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 p-14 sm:p-0">
                    {data?.data.data.map((brand) => (
                        <div key={brand._id} className="col border">
                            <div className='my-4' onClick={() => openBrandModal(brand)}>
                                <img className='w-full h-auto cursor-pointer' src={brand?.image} alt={brand?.name} />
                                <h3 className='font-semibold text-2xl mt-2 text-center'>{brand?.name}</h3>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {selectedBrand && (
                <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-75 flex items-center justify-center z-50">
                    <div className="bg-white p-5 rounded-lg">
                        <button className="absolute text-xl top-2 right-2 text-white" onClick={closeBrandModal}>
                            <i className="fas fa-times"></i>
                        </button>
                        <img src={selectedBrand.image} alt={selectedBrand.name} />
                        <h3 className="text-xl font-semibold mt-4">{selectedBrand.name}</h3>
                    </div>
                </div>
            )}
        </>
    );
}
