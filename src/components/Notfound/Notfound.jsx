import React, { useEffect, useState } from 'react';
import Style from './Notfound.module.css';
import notfound from "../../assets/images/error.png"

export default function Notfound() {

  return <>
  <img src={notfound} className='p-10 h-[500px] w-full' alt="" />
  </>
}
