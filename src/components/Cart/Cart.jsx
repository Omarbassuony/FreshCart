import React, { useContext, useEffect, useState } from 'react';
import Style from './Cart.module.css';
import { CartContext } from '../../context/CartContext';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { GridLoader } from 'react-spinners';

export default function Cart() {
  const { getCartItems, removeCartItems, updateCartItems, clearCartItems } = useContext(CartContext);

  const [cartDetails, setCartDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  async function getCart() {
    let response = await getCartItems();
    setCartDetails(response.data);
    setIsLoading(false);
  }

  async function updateQuantity(productId, count) {
    if (count < 1) return;
    let response = await updateCartItems(productId, count);
    setCartDetails(response.data);
  }

  async function removeItem(productId) {
    let response = await removeCartItems(productId);
    if (response.data.status === "success") {
      setCartDetails(response.data);
      toast.error("Product removed", {
        duration: 1500,
        position: 'top-center'
      });
    }
    setIsLoading(false);
  }

  async function clearCart() {
    setIsLoading(true);
    let response = await clearCartItems();
    if (response.data.message === "success") {
      setCartDetails([]);
      toast.error("Products removed", {
        duration: 1500,
        position: 'top-center'
      });
    }
    setIsLoading(false);
  }

  useEffect(() => {
    getCart();
  }, []);

 
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-white">
        <GridLoader color="#16a34a" loading={isLoading} size={50} />
      </div>
    );
  }

  return (
    <div className="relative mx-auto mt-10 overflow-x-auto shadow-md sm:rounded-lg mb-10">
      <table className="w-[95%] mx-auto text-sm sm:text-base text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs sm:text-sm text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-16 sm:px-16 py-3">
              <span className="sr-only">Image</span>
            </th>
            <th scope="col" className="px-4 sm:px-9 py-3">Product</th>
            <th scope="col" className="px-3 sm:px-12 py-3">Qty</th>
            <th scope="col" className="px-4 sm:px-8 py-3">Price</th>
            <th scope="col" className="px-3 sm:px-7 py-3">Action</th>
          </tr>
        </thead>
        <tbody>
          {cartDetails?.data?.products?.map((product) => (
            <tr key={product._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
              <td className="p-4">
                <img src={product.product.imageCover} className="w-16 md:w-32 max-w-full max-h-full" alt={product.product.title} />
              </td>
              <td className="ppx-4 sm:px-6 py-4 font-semibold text-gray-900 dark:text-white">{product.product.title}</td>
              <td className="px-3 sm:px-6 py-4">
                <div className="flex items-center">
                  <button onClick={() => { updateQuantity(product.product.id, product.count - 1) }} className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
                    <span className="sr-only">Quantity button</span>
                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h16" />
                    </svg>
                  </button>
                  <div>
                    <span>{product.count}</span>
                  </div>
                  <button onClick={() => { updateQuantity(product.product.id, product.count + 1) }} className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
                    <span className="sr-only">Quantity button</span>
                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 1v16M1 9h16" />
                    </svg>
                  </button>
                </div>
              </td>
              <td className="px-4 sm:px-6 py-4 font-semibold text-gray-900 dark:text-white">{product.price} EGP</td>
              <td className="px-3 sm:px-6 py-4">
                <span onClick={() => { removeItem(product.product.id) }} className="cursor-pointer font-medium text-red-600 dark:text-red-500">Remove</span>
              </td>
            </tr>
          ))}
          {cartDetails?.data?.products?.length > 0 ? (
            <tr className="bg-white border-b">
            <td colSpan="3" className="px-4 sm:px-6 py-4 font-semibold md:text-lg text-sm text-black text-center">
            total number of items : <span className='text-green-600'>{cartDetails?.numOfCartItems}</span> 
            </td>
            <td colSpan="3" className="px-4 sm:px-6 py-4 font-semibold md:text-lg text-sm text-black  text-center">
            total price : <span className='text-green-600'>{cartDetails?.data?.totalCartPrice}</span> EGP
            </td>

          </tr>
          ): ("")}
        </tbody>
      </table>
      {cartDetails?.data?.products?.length > 0 ? (
        <>
        <button onClick={() => clearCart()} className='bg-red-500 hover:bg-red-700 me-3 text-white px-14 py-2 block ms-auto my-4 rounded-lg'>Clear Cart</button>
        <Link to="/checkout" className='bg-green-600 hover:bg-green-800 me-3 text-white px-12 py-2 block ms-auto my-4 rounded-lg w-fit'>Next Step <i className="fa-solid fa-arrow-right"></i></Link>
        </>
        ) : (
        <div className='text-center p-20'>
          <p className='mb-4'>There are no items yet.</p>
          <Link to={"/products"} className='btn hover:bg-green-800'>Add your first product to cart</Link>
        </div>
      )}
    </div>
  );
}