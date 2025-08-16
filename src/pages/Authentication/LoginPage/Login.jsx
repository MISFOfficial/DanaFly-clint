import React, { useState } from 'react';
import { FaEye, FaEyeSlash, FaGoogle } from 'react-icons/fa';
import { Link, useLocation, useNavigate } from 'react-router'; // use react-router-dom
import { useForm } from 'react-hook-form';
import useAuth from '../../../Hooks/useAuth';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import Logo from '../../../Component/Navigation/Logo';
import useAxiosInstance from '../../../Hooks/useAxiosInstance';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
// import { useQuery } from '@tanstack/react-query';

const Login = () => {
    const { signIn, googleAuth } = useAuth();
    const navigate = useNavigate();
    const axiosInstance = useAxiosInstance()
    const axiosSecure = useAxiosSecure()

    // const {}=

    const [showPassword, setShowPassword] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm();

    const togglePassword = () => setShowPassword(!showPassword);

    const location = useLocation()
    // //console.log(location)
    // const from = location.state || '/'
    const from = location.state?.from || '/'

    // getting the user role


    const onSubmit = (data) => {

        signIn(data.email, data.password)
            .then(async (result) => {
                Swal.fire({
                    title: 'Log In!',
                    icon: 'success',
                    text: 'You have been successfully log In.',
                    showConfirmButton: false,
                    timer: 1500
                });

                const loggedUser = {
                    email: result.user.email,
                    // role: role
                };

                //console.log(loggedUser)
                await axiosSecure.post('/jwt', loggedUser);
                navigate(from);
            })
            .catch((error) => {
                console.error('Login failed:', error);
                toast.error('Invalid email or password');
            });
    };

    const handleGoogle = () => {
        googleAuth()
            .then(async(result) => {
                //console.log(result.user.displayName)
                const userToDB = {
                    name: result?.user?.displayName,
                    email: result?.user?.email,
                    photoURL: result?.user?.photoURL,
                    role: 'user',
                    createdAt: new Date().toISOString()
                };
                //console.log(userToDB)

                const loggedUser = {
                    email: result.user.email,
                    // role: role
                };
                // console.log(loggedUser)
                await axiosSecure.post('/jwt', loggedUser);
                axiosInstance.post('/users', userToDB).then(async (res) => {
                    await axiosSecure.post('/jwt', loggedUser);
                    if (res.data.insertedId || res.data.inserted === false) {
                        Swal.fire(
                            'Log In.',
                            'You have been successfully Log In.',
                            'success',
                        );
                        navigate(from);
                    }
                });
            })
            .catch(() => {
                toast.error('Google sign-in failed');
            });
    };

    return (
        <div
            className="min-h-screen flex flex-col items-center justify-center p-4 md:p-0"
        >
            <Link to='/' className='mb-10'>
                <Logo></Logo>
            </Link>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="w-full max-w-lg"
            >
                <h2 className="text-[#1b130d] text-2xl font-bold text-center mb-6">
                    Welcome to Travel Bangladesh
                </h2>

                {/* Email */}
                <div className="mb-4">
                    <label className="block text-[#1b130d] font-medium mb-2">Email</label>
                    <input
                        type="email"
                        {...register('email', { required: 'Email is required' })}
                        placeholder="Enter your email"
                        className="w-full rounded-xl border border-[#e7d9cf] bg-[#fcfaf8] h-12 px-4 text-base text-[#1b130d] placeholder:text-[#9a6b4c] focus:outline-none"
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                </div>

                {/* Password */}
                <label className="block text-[#1b130d] font-medium mb-2">Password</label>
                <div className='relative'>
                    <input
                        type={showPassword ? 'text' : 'password'}
                        {...register('password', { required: 'Password is required' })}
                        placeholder="Enter your password"
                        className="w-full rounded-xl border border-[#e7d9cf] bg-[#fcfaf8] h-12 px-4 text-base text-[#1b130d] placeholder:text-[#9a6b4c] focus:outline-none pr-10"
                    />
                    <span
                        className="absolute top-4 right-4  cursor-pointer text-[#9a6b4c]"
                        onClick={togglePassword}
                    >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </span>
                </div>
                {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}

                {/* Forgot Password */}
                <div className="text-right text-sm text-[#9a6b4c] underline mb-4">
                    <Link to='/forgetPass'>Forgot password?</Link>
                </div>

                {/* Submit */}
                <button
                    type="submit"
                    className="w-full h-12 bg-[#00A99D] text-[#fcfaf8] rounded-full font-bold text-sm hover:bg-[#3d7672] transition cursor-pointer"
                >
                    Log in
                </button>

                {/* Divider */}
                <p className="text-[#9a6b4c] text-sm text-center mt-6 mb-3">Or continue with</p>

                {/* Google Auth */}
                <button
                    onClick={handleGoogle}
                    type="button"
                    className="w-full cursor-pointer h-12 flex items-center justify-center gap-2 bg-[#f3ece7] text-[#1b130d] rounded-full font-bold text-sm hover:bg-[#e7d9cf] transition"
                >
                    <FaGoogle /> Continue with Google
                </button>

                {/* Signup Link */}
                <p className="text-[#9a6b4c] text-sm text-center underline mt-6">
                    Don't have an account? <Link to="/register">Sign up</Link>
                </p>
            </form>
        </div>
    );
};

export default Login;
