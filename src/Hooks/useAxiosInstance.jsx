import axios from 'axios';
import React from 'react';


const axiosInstance = axios.create({
    baseURL: `https://dana-fly-server.vercel.app`,
})
const useAxiosInstance = () => {
    return axiosInstance
};

export default useAxiosInstance;