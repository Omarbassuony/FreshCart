import React, { useEffect, useState } from 'react';
import { Link} from "react-router-dom";
import { useQuery } from '@tanstack/react-query';
import axios from "axios";
export default function useProducts(){
    
    function getRecentProduct(){
        return axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
    }
    let productRespose=useQuery({
        queryKey: ['recentProduct'],
        queryFn:getRecentProduct
    })
    
    
    
    return productRespose;
}