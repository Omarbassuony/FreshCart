import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { GridLoader } from 'react-spinners';
import { CartContext } from '../../context/CartContext';

export default function Wishlist() {
  const { getWishlistItems, removeProductFromWishlist, addToCart } = useContext(CartContext);
  const [wishlistDetails, setWishlistDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProductId, setLoadingProductId] = useState(null);

  async function getWishlist() {
    setIsLoading(true);
    let response = await getWishlistItems();
    setWishlistDetails(response.data);
    setIsLoading(false);
  }

  async function removeItem(productId) {
    let response = await removeProductFromWishlist(productId);
    if (response.data.status === "success") {
      toast.error("Product removed", {
        duration: 1500,
        position: 'top-center'
      });
      getWishlist();
    }
  }

  async function addProductToCart(productId) {
    setLoadingProductId(productId);
    let response = await addToCart(productId);
    if (response.data.status === "success") {
      toast.success("Product added to cart", {
        duration: 1500,
        position: 'top-center'
      });
    } else {
      toast.error("This is an error!", {
        duration: 1500,
        position: 'top-center'
      });
    }
    setLoadingProductId(null);
  }

  useEffect(() => {
    getWishlist();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-white">
        <GridLoader color="#16a34a" loading={isLoading} size={50} />
      </div>
    );
  }

  return (
    <div className="mx-auto mt-10 sm:overflow-x-auto">
      <div className="shadow-md sm:rounded-lg mb-10 overflow-hidden">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-3 py-2 sm:px-6 sm:py-3">
                <span className="sr-only">Image</span>
              </th>
              <th scope="col" className="px-2 py-2 sm:px-6 sm:py-3">Product</th>
              <th scope="col" className="px-2 py-2 sm:px-6 sm:py-3">Price</th>
              <th colSpan="2" scope="col" className="px-2 py-2 sm:px-6 sm:py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {wishlistDetails?.data?.map((product) => (
              <tr key={product._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td className="p-2 sm:p-4">
                  <img src={product.imageCover} className="w-16 sm:w-32 h-auto max-w-full" alt={product.title} />
                </td>
                <td className="px-2 py-2 sm:px-6 sm:py-4 font-semibold text-gray-900 dark:text-white">{product.title}</td>
                <td className="px-2 py-2 sm:px-6 sm:py-4 font-semibold text-gray-900 dark:text-white">{product.price} EGP</td>
                <td className="px-2 py-2 sm:px-6 sm:py-4">
                  <span onClick={() => removeItem(product.id)} className="cursor-pointer font-medium text-red-600 dark:text-red-500">Remove</span>
                </td>
                <td className="px-2 py-2 sm:px-6 sm:py-4">
                  <button onClick={() => addProductToCart(product.id)} className='btn hover:bg-green-800'>
                    {loadingProductId === product.id ? (
                      <i className="fa-solid fa-spinner fa-spin"></i>
                    ) : (
                      <>add to cart <i className="fa-solid fa-cart-shopping"></i></>
                    )}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {wishlistDetails?.data?.length === 0 && (
          <div className='text-center p-10'>
            <p className='mb-4'>There are no items yet.</p>
            <Link to={"/products"} className='btn hover:bg-green-800'>Add your first product to wishlist</Link>
          </div>
        )}
      </div>
    </div>
  );
}
