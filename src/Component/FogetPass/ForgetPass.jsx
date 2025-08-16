// src/pages/Auth/ForgetPass.jsx
import React from 'react';
import { FaArrowCircleLeft, FaHome } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router'; // FIXED: was 'react-router'
import useAuth from '../../Hooks/useAuth';
import { toast } from 'react-toastify';

const ForgetPass = () => {
    const { forgetPass } = useAuth();

    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault();
        const email = e.target.email.value;

        if (!email) return toast.error("Please enter your email");

        forgetPass(email)
            .then(() => {
                //console.log('worked')
                //console.log("response", res)
                toast.success("Password reset email sent. Check your inbox!");
                navigate('/login')
                // e.target.reset(); // Clear input field
            })
            .catch((error) => {
                // console.error(error);
                toast.error(error.message || "Something went wrong.");
            });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
                <div className='text-[#00A99D] text-2xl flex items-center justify-between mb-4'>
                    <Link to='/login'><FaArrowCircleLeft /></Link>
                    <Link to='/'><FaHome /></Link>
                </div>
                <h2 className="text-2xl font-bold text-center text-[#00A99D] mb-6">Forgot Password</h2>
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Email Address
                        </label>
                        <input
                            type="email"
                            name="email"
                            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#00A99D]"
                            placeholder="Enter your email"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-[#00A99D] text-white py-2 rounded-lg font-semibold hover:bg-[#008f84] transition-colors"
                    >
                        Send Reset Link
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ForgetPass;
