import React, { useEffect, useState } from 'react';
import Style from './Footer.module.css';
import amazonPay from "../../assets/images/amazon-pay.png"
import paypal from "../../assets/images/paypal.png"
import masterCard from "../../assets/images/mastercard.webp"
import americanexpress from "../../assets/images/American-Express-Color.png"
import appStore from "../../assets/images/get-apple-store.png"
import googlePlay from "../../assets/images/get-google-play.png"
import logo from '../../assets/images/freshcart-logo.svg';

export default function Footer() {

  return <>
          <footer className='bg-gray-100 px-5 md:px-0'>
        <div className="container mx-auto py-8">
        <div className='flex items-center'>
                    <img src={logo} width={120} alt="fresh cart logo" />
                </div>
          <div className="my-6">
            <h2 className='text-3xl font-medium'>Get the FreshCard App</h2>
            <p className='my-3'>We will send ou a link, open it on your phone to download the app</p>
            <div className="flex gap-4">
              <input type="text" className="form-control flex-grow outline-none rounded-lg" placeholder='Email ...' />
              <button className='btn hover:bg-green-800'>Share App Link</button>
            </div>
          </div>
          <div className='lg:flex items-center justify-between my-3 py-6 px-2 border-y border-gray-300'>
            <div className='flex gap-6 items-center mb-2 lg:mb-0'>
              <span className='md:text-lg text-[15px]'>Payment Partners</span>
              <div className='flex gap-2 items-center'>
                <img src={paypal} className='w-14' alt="" />
                <img src={americanexpress} className='w-14' alt="" />
                <img src={amazonPay} className='w-14' alt="" />

              </div>
            </div>
            <div className='flex items-center gap-3'>
              <span className='text-lg'>Get it on</span>
              <div className='flex gap-2 items-center'>
                <img src={googlePlay} className='w-24' alt="" />
                <img src={appStore} className='w-24' alt="" />
              </div>
            </div>
          </div>
        </div>
      </footer>
  </>
}
