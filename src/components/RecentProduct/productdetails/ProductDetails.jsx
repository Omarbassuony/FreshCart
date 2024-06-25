import React, { useEffect, useState, useContext } from 'react';
import axios from "axios";
import { useParams, Link } from 'react-router-dom';
import Slider from "react-slick";
import GridLoader from "react-spinners/GridLoader";
import { useQuery } from '@tanstack/react-query';
import useProducts from '../../../Hooks/useProducts';
import notfound from "../../../assets/images/error.png"
import { CartContext } from '../../../context/CartContext';
import { toast} from 'react-hot-toast';

export default function ProductDetails() {
  let{addToCart}=useContext(CartContext); 
  const [loadingProductId, setLoadingProductId] = useState(null);
  async function addProduct(productId){
    setLoadingProductId(productId); 
      let response = await addToCart(productId);
      if(response.data.status==="success")
          {
              toast.success("Product added successfully to your cart",{
                  duration:1500,
                  position:'top-center'
              })
          }else
          {
              toast.error("This is an error!",{
                  duration:1500,
                  position:'top-center'
              })
          }
          setLoadingProductId(null);
  }

  let { id } = useParams();

  function getProductDetails(id){
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
  }

  let { data:productDetails, isLoading: isProductLoading ,isError} =useQuery({
    queryKey: ['productDetails',id],
    queryFn:()=>getProductDetails(id)

})


var settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      }
    }
  ]
};

var settings1 = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      }
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      }
    }
  ]
};

  // const [productDetails, setProductDetails] = useState(null);
  // const [recentProducts, setRecentProducts] = useState([]);

 

  // function getProductDetails(id) {

  //   axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
  //     .then(({ data }) => {
  //       setProductDetails(data.data);

  //     })
  //     .catch((error) => {
  //     });
  // }

// useEffect(()=>{
//   getRelatedProduct()
//   getProductDetails(id)
// },[id])

   let relatedProducts  =  useProducts()
//   let relatedProducts=useQuery({
//     queryKey: ['recentProduct'],
//     queryFn:getRelatedProduct
// })
// function getRelatedProduct(){
//   return axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
// }

  // function getRecentProducts() {
  //   axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
  //     .then(({ data }) => {
  //       setRecentProducts(data.data);
  //     })
  //     .catch((error) => {
  //     });
  // }

  if (isProductLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-white">
        <GridLoader color="#16a34a" loading={isProductLoading} size={50} />
      </div>
    );
  }
  if (isError) {
    return (
      <img src={notfound} className='p-10 h-[500px] w-full' alt="" />
    );
  }
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-10">
      <div className="flex flex-wrap">
        <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 mb-4 sm:mb-0">
          <Slider {...settings}>
            {productDetails?.data?.data.images?.map((src, index) => (
              <div key={index}>
                <img className='w-full' src={src} alt={productDetails?.data?.data.title} />
              </div>
            ))}
          </Slider>
        </div>
        <div className='w-full sm:w-1/2 md:w-2/3 lg:w-3/4 p-6'>
          <h1 className='text-xl sm:text-2xl font-semibold text-gray-900'>{productDetails?.data?.data.title}</h1>
          <p className='text-gray-700 font-light mt-4 mb-2'>{productDetails?.data?.data.description}</p>
          <span className='text-gray-600 mt-2'>{productDetails?.data?.data.category?.name}</span>
          <div className="flex my-2 justify-between items-center">
            <span className="text-gray-900 font-semibold">{productDetails?.data?.data.price} EGP</span>
            <span className="flex items-center">
              {productDetails?.data?.data.ratingsAverage} <i className='fas fa-star text-yellow-400'></i>
            </span>
          </div>
          <button onClick={() => addProduct(productDetails?.data?.data.id)} className='btn hover:bg-green-800'>
            {loadingProductId === productDetails.data.data.id ? (
              <i className="fa-solid fa-spinner fa-spin"></i>
            ) : (
              <>Add to Cart <i className="fa-solid fa-cart-shopping"></i></>
            )}
          </button>
        </div>
      </div>
      <h1 className="font-bold text-xl text-green-600 text-center mt-8 mb-4">Related Products</h1>
      <Slider {...settings1}>
        {relatedProducts?.data?.data.data.map((product) =>
          product?.category?.name === productDetails?.data?.data.category?.name && product?.id !== productDetails?.data?.data?.id ? (
            <div key={product.id} className="w-full px-2">
              <div className="product py-4">
                <Link to={`/productdetails/${product.id}`}>
                  <img className='w-full' src={product.imageCover} alt={product.title} />
                  <span className='block font-light text-green-600'>{product.category.name}</span>
                  <h3 className='text-lg font-normal text-gray-800 mb-4'>{product.title.split(" ").slice(0, 2).join(" ")}</h3>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-900 font-semibold">{product.price} EGP</span>
                    <span className="flex items-center">
                      {product.ratingsAverage} <i className='fas fa-star text-yellow-400'></i>
                    </span>
                  </div>
                </Link>
                <button onClick={() => addProduct(product.id)} className='btn hover:bg-green-800'>
                  {loadingProductId === product.id ? (
                    <i className="fa-solid fa-spinner fa-spin"></i>
                  ) : (
                    <>Add to Cart <i className="fa-solid fa-cart-shopping"></i></>
                  )}
                </button>
              </div>
            </div>
          ) : null
        )}
      </Slider>
    </div>
  );
}