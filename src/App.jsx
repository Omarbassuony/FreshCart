import { useState } from 'react';
import './App.css';
import { RouterProvider, createBrowserRouter, createHashRouter } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Home from './components/Home/Home';
import Products from './components/Products/Products';
import Cart from './components/Cart/Cart';
import Brands from './components/Brands/Brands';
import Categories from './components/Categories/Categories';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Notfound from './components/Notfound/Notfound';
import { UserContextProvider } from './context/userContext';
import ProtectedRoute from './components/protectedRoute/protectedRoute';
import ProductDetails from './components/RecentProduct/productdetails/ProductDetails';
import { IsLoadingProvider } from './context/IsLoadingContext';
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";
import CartContextProvider from './context/CartContext';
import { Toaster} from 'react-hot-toast';
import ForgetPassword from './components/ForgetPassword/ForgetPassword';
import VerifyCode from './components/VerifyCode/VerifyCode';
import ResetPassword from './components/ResetPassword/ResetPassword';
import CheckOut from './components/CheckOut/CheckOut';
import Wishlist from './components/Wishlist/Wishlist';
import Orders from './components/Orders/Orders';
import ProtectedResetpassword from './components/protectedResetpassword/protectedResetpassword';
let query = new QueryClient();

let router = createHashRouter([
  {path:'' , element:<Layout/> , children:[
    {index:true ,path:"/", element: <ProtectedRoute><Home/></ProtectedRoute>},
    {path:'products' , element: <ProtectedRoute><Products/></ProtectedRoute>},
    {path:'productdetails/:id' , element: <ProtectedRoute><ProductDetails/></ProtectedRoute>},
    {path:'cart' , element:<ProtectedRoute><Cart/></ProtectedRoute>},
    {path:'checkout' , element:<ProtectedRoute><CheckOut/></ProtectedRoute>},
    {path:'brands' , element:<ProtectedRoute><Brands/></ProtectedRoute> },
    {path:'allorders' , element:<ProtectedRoute><Orders/></ProtectedRoute> },
    {path:'wishlist' , element:<ProtectedRoute><Wishlist/></ProtectedRoute> },
    {path:'categories' , element:<ProtectedRoute><Categories/></ProtectedRoute>},
    {path:'login' , element:<Login/>},
    {path:'register' , element:<Register/>},
    {path:'forgetpassword' , element:<ForgetPassword/>},
    {path:'verifycode' , element:<VerifyCode/>},
    {path:'resetpassword' , element:<ProtectedResetpassword><ResetPassword/></ProtectedResetpassword>},
    {path:'*' , element:<Notfound/>},
  ]}
])
function App() {


  return (

  <CartContextProvider>
    <QueryClientProvider client={query}>
    <IsLoadingProvider>
        <UserContextProvider>
           <RouterProvider router={router}></RouterProvider>
           <Toaster/>
           <ReactQueryDevtools/>
        </UserContextProvider>
    </IsLoadingProvider>
    </QueryClientProvider>
    </CartContextProvider>
  )
}

export default App
