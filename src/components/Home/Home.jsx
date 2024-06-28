import React, { useEffect, useState } from 'react';
import Style from './Home.module.css';
import RecentProduct from '../RecentProduct/RecentProduct';
import CategoriesSlider from '../CategoriesSlider/CategoriesSlider';
import MainSlider from '../MainSlider/MainSlider';



export default function Home() {
if (!sessionStorage.getItem('reloaded')) {
sessionStorage.setItem('reloaded', 'true');
window.location.reload();
}
  return <>
  <div className='relative'>
  <MainSlider/>
  <CategoriesSlider/>
  <RecentProduct/>   
    </div> 
  </>
}
