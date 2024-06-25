import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

export let CartContext = createContext();

export default function CartContextProvider(props) {
    const [cartCount, setCartCount] = useState(0);
    const [wishlist, setWishlist] = useState([]);
    const [wishlistCount, setWishlistCount] = useState(0);
    const [cart, setCart] = useState(null);
    
    const headers = {
        token: localStorage.getItem('userToken')
    };

    const getCartItems = async () => {
        try {
            const response = await axios.get('https://ecommerce.routemisr.com/api/v1/cart', { headers });
            setCartCount(response.data.numOfCartItems);
            setCart(response);
            return response;
        } catch (error) {
            console.error(error);
            return error;
        }
    };

    const removeCartItems = async (productId) => {
        try {
            const response = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, { headers });
            setCart(response);
            await getCartItems();
            return response;
        } catch (error) {
            console.error(error);
            return error;
        }
    };

    const updateCartItems = async (productId, count) => {
        try {
            const response = await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, { count }, { headers });
            setCart(response);
            await getCartItems();
            return response;
        } catch (error) {
            console.error(error);
            return error;
        }
    };

    const addToCart = async (productId) => {
        try {
            const response = await axios.post('https://ecommerce.routemisr.com/api/v1/cart', { productId }, { headers });
            setCart(response);
            await getCartItems();
            return response;
        } catch (error) {
            console.error(error);
            return error;
        }
    };

    const clearCartItems = async () => {
        try {
            const response = await axios.delete('https://ecommerce.routemisr.com/api/v1/cart', { headers });
            setCart(response);
            await getCartItems();
            return response;
        } catch (error) {
            console.error(error);
            return error;
        }
    };

    const getWishlistItems = async () => {
        try {
            const response = await axios.get('https://ecommerce.routemisr.com/api/v1/wishlist', { headers });
            setWishlist(response.data.data.map(item => item._id));
            setWishlistCount(response.data.count);
            return response;
        } catch (error) {
            console.error(error);
            return error;
        }
    };

    const addProductToWishlist = async (productId) => {
        try {
            const response = await axios.post('https://ecommerce.routemisr.com/api/v1/wishlist', { productId }, { headers });
            setWishlist(prevWishlist => [...prevWishlist, productId]);
            setWishlistCount(prevCount => prevCount + 1);
            return response;
        } catch (error) {
            console.error(error);
            return error;
        }
    };

    const removeProductFromWishlist = async (productId) => {
        try {
            const response = await axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`, { headers });
            setWishlist(prevWishlist => prevWishlist.filter(id => id !== productId));
            setWishlistCount(prevCount => prevCount);
            await getWishlistItems();
            return response;
        } catch (error) {
            console.error(error);
            return error;
        }
    };

    useEffect(() => {
        getCartItems();
        getWishlistItems();
    }, []);

    return (
        <CartContext.Provider value={{
            getWishlistItems,
            removeProductFromWishlist,
            addProductToWishlist,
            addToCart,
            getCartItems,
            removeCartItems,
            updateCartItems,
            clearCartItems,
            cartCount,
            cart,
            setCart,
            wishlist,
            setWishlist,
            wishlistCount
        }}>
            {props.children}
        </CartContext.Provider>
    );
}
