import React from 'react';
import Lottie from 'lottie-react';
import loader from '../../assets/Loader.json';

const Loder = () => {
    return (
        <div className="min-h-screen flex justify-center items-center bg-white px-4">
            <div className="w-40 md:w-100">
                <Lottie animationData={loader} loop={true} />
            </div>
        </div>
    );
};

export default Loder;
