import React, { useContext, useState } from 'react';
import { Link } from "react-router-dom";
import useProducts from '../../Hooks/useProducts';
import { CartContext } from '../../context/CartContext';
import { toast } from 'react-hot-toast';

export default function RecentProduct() {
    let { addToCart, addProductToWishlist, removeProductFromWishlist, wishlist } = useContext(CartContext);
    const { data, isError, isLoading, error } = useProducts();
    const [loadingProductId, setLoadingProductId] = useState(null);

    async function addProduct(productId) {
        setLoadingProductId(productId);
        let response = await addToCart(productId);
        if (response.data.status === "success") {
            toast.success("Product added successfully to your cart", {
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

    async function handleWishlist(event, productId) {
        event.stopPropagation();

        if (wishlist.includes(productId)) {
            await removeProductFromWishlist(productId);
            toast.error("Product removed from your wish list", {
                duration: 1500,
                position: 'top-center'
            });
        } else {
            await addProductToWishlist(productId);
            toast.success("Product has successfully added to wish list", {
                duration: 1500,
                position: 'top-center'
            });
        }
    }

    return (
        <div className="container mx-auto p-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 p-10 sm:p-0">
                {data?.data.data.map((product) => (
                    <div key={product.id} className="px-2 hover:shadow-xl">
                        <div className="product py-4 relative">
                            <Link to={`/productdetails/${product.id}`}>
                                <img className='w-full' src={product.imageCover} alt={product.title} />
                                <span className='block font-light text-green-600'>{product.category.name}</span>
                                <h3 className='text-lg font-normal text-gray-800 mb-4'>{product.title.split(" ").slice(0, 2).join(" ")}</h3>
                                <div className="flex justify-between">
                                    <span>{product.price} EGP</span>
                                    <span>{product.ratingsAverage} <i className='fas fa-star text-yellow-400'></i></span>
                                </div>
                            </Link>
                            <i
                                onClick={(e) => handleWishlist(e, product.id)}
                                className={`absolute top-5 right-3 text-xl fa-heart cursor-pointer ${wishlist.includes(product.id) ? 'fa-solid text-red-600' : 'fa-regular'}`}
                            ></i>
                            <button onClick={() => addProduct(product.id)} className='btn hover:bg-green-800'>
                                {loadingProductId === product.id ? (
                                    <i className="fa-solid fa-spinner fa-spin"></i>
                                ) : (
                                    <>add to cart <i className="fa-solid fa-cart-shopping"></i></>
                                )}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
