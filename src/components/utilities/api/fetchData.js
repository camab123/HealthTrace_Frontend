import React from 'react';
import axios from 'axios';

//const baseURL = "http://0.0.0.0:8000/api/v1/health/"
//const baseURL = "http://192.168.0.11:1337/api/v1/health/"
//const baseURL = "http://34.198.190.79:8000/api/v1/health/"
const baseURL = "https://healthtrace.io/api/v1/health/"
export const axiosInstance = axios.create({
    baseURL: baseURL,
    timeout: 100000,
    headers: {
        //'Authorization': `JWT ${localStorage.getItem(tokens.ACCESS)}`,
        'Content-Type': 'application/json',
    }
});

export const apiStates = {
    LOADING: 'LOADING',
    SUCCESS: 'SUCCESS',
    ERROR: 'ERROR',
  };

export function getApi(url){
    return async () => {
      const {data} = await axiosInstance.get(url) 
      return data
    }
  }