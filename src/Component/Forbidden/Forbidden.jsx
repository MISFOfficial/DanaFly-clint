import React from 'react';
import { FaLock } from 'react-icons/fa';
import { Link } from 'react-router';

const Forbidden = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-red-100 via-red-200 to-red-300">
            <div className="bg-white p-10 rounded-3xl shadow-xl max-w-lg text-center animate-fadeIn">
                <div className="text-red-500 text-6xl mb-4">
                    <FaLock />
                </div>
                <h1 className="text-5xl font-bold text-gray-800 mb-4">403</h1>
                <h2 className="text-2xl font-semibold text-gray-700 mb-2">Access Forbidden</h2>
                <p className="text-gray-500 mb-6">
                    You don’t have permission to access this page.<br />
                    Please contact the administrator if you believe this is an error.
                </p>
                <Link
                    to="/"
                    className="inline-block px-6 py-3 bg-red-500 text-light font-semibold rounded-full shadow hover:bg-red-600 transition duration-300"
                >
                    Back to Home
                </Link>
            </div>
        </div>
    );
};

export default Forbidden;