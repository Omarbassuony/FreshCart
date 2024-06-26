import React, { useContext, useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/userContext';
import { CartContext } from '../../context/CartContext';
import styles from './Navbar.module.css';
import logo from '../../assets/images/freshcart-logo.svg';
import '@fortawesome/fontawesome-free/css/all.min.css';

export default function Navbar() {
    const { cartCount, getCartItems, wishlistCount } = useContext(CartContext);
    const { userLogin, userName, setUserLogin, setUserName } = useContext(UserContext);
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const logOut = () => {
        localStorage.removeItem("userToken");
        localStorage.removeItem("userName");
        setUserLogin(null);
        setUserName(null);
        navigate('/login');
    };

    useEffect(() => {
        getCartItems();
    }, [cartCount, wishlistCount]);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1024) {
                setIsMenuOpen(false);
            }
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <nav className='bg-gray-100 fixed top-0 left-0 right-0 z-50'>
            <div className="container mx-auto py-4 flex justify-between items-center">
                <div className='flex items-center'>
                    <img src={logo} width={120} alt="fresh cart logo" />
                </div>
                <div className="flex items-center justify-center flex-grow">
                    {userLogin && <span className="text-green-600 font-semibold">Welcome, {userName}</span>}
                </div>
                <div className="flex items-center lg:hidden">
                    <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-2xl focus:outline-none">
                        {isMenuOpen ? <i className="fas fa-times"></i> : <i className="fas fa-bars"></i>}
                    </button>
                </div>
                <ul className='hidden lg:flex items-center space-x-4'>
                    {userLogin && (
                        <>
                            <li className='text-md mx-4 text-slate-900 font-normal'>
                                <NavLink className={({ isActive }) => isActive ? 'text-white bg-green-600 py-2 px-5 rounded-lg' : 'hover:text-green-600'} to={"/FreshCart"}>Home</NavLink>
                            </li>
                            <li className='text-md mx-4 text-slate-900 font-normal'>
                                <NavLink className={({ isActive }) => isActive ? 'text-white bg-green-600 py-2 px-5 rounded-lg' : 'hover:text-green-600'} to={'/products'}>Products</NavLink>
                            </li>
                            <li className='text-md mx-4 text-slate-900 font-normal'>
                                <NavLink className={({ isActive }) => isActive ? 'text-white bg-green-600 py-2 px-5 rounded-lg' : 'hover:text-green-600'} to={'/categories'}>Categories</NavLink>
                            </li>
                            <li className='text-md mx-4 text-slate-900 font-normal'>
                                <NavLink className={({ isActive }) => isActive ? 'text-white bg-green-600 py-2 px-5 rounded-lg' : 'hover:text-green-600'} to={'/brands'}>Brands</NavLink>
                            </li>
                        </>
                    )}
                    {userLogin ? (
                        <>
                            <li className='relative flex items-center'>
                                <NavLink to="/wishlist" className="relative px-4">
                                    <i className="fa-solid fa-heart text-2xl align-middle"></i>
                                    {wishlistCount > 0 && (
                                        <span className="absolute bottom-3 right-1 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-red-500 rounded-full">
                                            {wishlistCount}
                                        </span>
                                    )}
                                </NavLink>
                                <NavLink to="/cart" className="relative text-gray-900">
                                    <i className="fa-solid fa-cart-shopping text-2xl align-middle"></i>
                                    {cartCount > 0 && (
                                        <span className="absolute bottom-3 left-4 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-green-400 rounded-full">
                                            {cartCount}
                                        </span>
                                    )}
                                </NavLink>
                            </li>
                            <li onClick={logOut} className='text-md mx-4 text-slate-900 font-normal cursor-pointer'>
                                <span className="hover:text-red-600">Logout <i className="fa-solid fa-right-to-bracket"></i></span>
                            </li>
                        </>
                    ) : (
                        <>
                            <li className='text-md mx-4 text-slate-900 font-normal'>
                                <NavLink className={({ isActive }) => isActive ? 'text-white bg-green-600 py-2 px-5 rounded-lg' : 'hover:text-green-600'} to={'/login'}>Login <i className="fa-solid fa-arrow-left"></i></NavLink>
                            </li>
                            <li className='text-md mx-4 text-slate-900 font-normal'>
                                <NavLink className={({ isActive }) => isActive ? 'text-white bg-green-600 py-2 px-5 rounded-lg' : 'hover:text-green-600'} to={'/register'}>Register <i className="fa-solid fa-user-plus"></i></NavLink>
                            </li>
                        </>
                    )}
                    <li className='text-md mx-4 text-slate-900 font-normal items-center flex justify-between'>
                        <i className='fab fa-facebook mx-2 fa-md text-blue-600 cursor-pointer'></i>
                        <i className='fab fa-twitter mx-2 fa-md text-blue-400 cursor-pointer'></i>
                        <i className='fab fa-instagram mx-2 fa-md text-red-400 cursor-pointer'></i>
                        <i className='fab fa-tiktok mx-2 fa-md cursor-pointer'></i>
                        <i className='fab fa-youtube mx-2 fa-md text-red-600 cursor-pointer'></i>
                    </li>
                </ul>
            </div>
            {isMenuOpen && (
                <div className='bg-white shadow-lg absolute top-full left-0 right-0 z-40'>
                    <ul className='flex flex-col p-4'>
                        {userLogin && (
                            <>
                                <li className='text-md my-2 text-slate-900 font-normal'>
                                    <NavLink className={({ isActive }) => isActive ? 'text-white bg-green-600 py-2 px-5 rounded-lg' : 'py-2 px-5 hover:text-green-600'} to={"/FreshCart"} onClick={() => setIsMenuOpen(false)}>Home</NavLink>
                                </li>
                                <li className='text-md my-2 text-slate-900 font-normal'>
                                    <NavLink className={({ isActive }) => isActive ? 'text-white bg-green-600 py-2 px-5 rounded-lg' : 'py-2 px-5 hover:text-green-600'} to={'/products'} onClick={() => setIsMenuOpen(false)}>Products</NavLink>
                                </li>
                                <li className='text-md my-2 text-slate-900 font-normal'>
                                    <NavLink className={({ isActive }) => isActive ? 'text-white bg-green-600 py-2 px-5 rounded-lg' : 'py-2 px-5 hover:text-green-600'} to={'/categories'} onClick={() => setIsMenuOpen(false)}>Categories</NavLink>
                                </li>
                                <li className='text-md my-2 text-slate-900 font-normal'>
                                    <NavLink className={({ isActive }) => isActive ? 'text-white bg-green-600 py-2 px-5 rounded-lg' : ' py-2 px-5 hover:text-green-600'} to={'/brands'} onClick={() => setIsMenuOpen(false)}>Brands</NavLink>
                                </li>
                                <li className='relative flex items-center text-md my-2 text-slate-900 font-normal'>
                                    <NavLink to="/wishlist" className="relative px-4" onClick={() => setIsMenuOpen(false)}>
                                        <i className="fa-solid fa-heart text-2xl align-middle"></i>
                                        {wishlistCount > 0 && (
                                            <span className="absolute bottom-3 right-1 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-red-500 rounded-full">
                                                {wishlistCount}
                                            </span>
                                        )}
                                    </NavLink>
                                    <NavLink to="/cart" className="relative text-gray-900" onClick={() => setIsMenuOpen(false)}>
                                        <i className="fa-solid fa-cart-shopping text-2xl align-middle"></i>
                                        {cartCount > 0 && (
                                            <span className="absolute bottom-3 left-4 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-green-400 rounded-full">
                                                {cartCount}
                                            </span>
                                        )}
                                    </NavLink>
                                </li>
                                <li onClick={() => { logOut(); setIsMenuOpen(false); }} className='text-md my-2 text-slate-900 font-normal cursor-pointer'>
                                    <span className="hover:text-red-600 py-2 px-5">Logout <i className="fa-solid fa-right-to-bracket"></i></span>
                                </li>
                            </>
                        )}
                        {!userLogin && (
                            <>
                                <li className='text-md my-2 text-slate-900 font-normal'>
                                    <NavLink className={({ isActive }) => isActive ? 'text-white bg-green-600 py-2 px-5 rounded-lg' : 'py-2 px-5 hover:text-green-600'} to={'/login'} onClick={() => setIsMenuOpen(false)}>Login <i className="fa-solid fa-arrow-left"></i></NavLink>
                                </li>
                                <li className='text-md my-2 text-slate-900 font-normal'>
                                    <NavLink className={({ isActive }) => isActive ? 'text-white bg-green-600 py-2 px-5 rounded-lg' : 'py-2 px-5 hover:text-green-600'} to={'/register'} onClick={() => setIsMenuOpen(false)}>Register <i className="fa-solid fa-user-plus"></i></NavLink>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            )}
        </nav>
    );
}
