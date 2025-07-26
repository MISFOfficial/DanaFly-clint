import React from 'react';
import Lottie from 'lottie-react';
import { Link } from 'react-router';
import errorAnimation from '../../assets/404.json'; // If using local file
// Or you can use the URL: import errorAnimation from 'https://assets9.lottiefiles.com/packages/lf20_qp1q7mct.json';

const ErrorPage = () => {
    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-white text-center px-4">
            <div className="w-full max-w-md">
                <Lottie animationData={errorAnimation} loop={true} />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mt-6">Oops! Page Not Found</h2>
            <p className="text-gray-500 mt-2 mb-6">
                The page you’re looking for doesn’t exist or has been moved.
            </p>
            <Link
                to="/"
                className="bg-[#00A99D] hover:bg-[#007d75] text-white px-6 py-3 rounded-full font-semibold transition"
            >
                Back to Home
            </Link>
        </div>
    );
};

export default ErrorPage;
