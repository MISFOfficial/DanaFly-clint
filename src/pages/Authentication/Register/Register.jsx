import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import Logo from '../../../Component/Navigation/Logo';
import { Link, useLocation, useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import useAuth from '../../../Hooks/useAuth';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useAxiosInstance from '../../../Hooks/useAxiosInstance';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const Register = () => {
    const { createUser, userProfile } = useAuth();
    const navigate = useNavigate();
    const axiosInstance = useAxiosInstance()
    const axiosSecure = useAxiosSecure()

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [parcentLoader, setParcentLoader] = useState('');
    const [profile, setProfile] = useState(null);
    const location = useLocation()

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors }
    } = useForm();

    const from = location.state?.from || '/'

    const handlePhoto = async (e) => {
        const image = e.target.files[0];
        if (!image) return toast.error('Please select an image file.');

        const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
        if (!allowedTypes.includes(image.type)) return toast.error('Only JPG, PNG, or GIF files are allowed.');

        const formData = new FormData();
        formData.append('image', image);
        setParcentLoader(0);

        try {
            const res = await axios.post(
                `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_ImBB_key}`,
                formData,
                {
                    headers: { 'Content-Type': 'multipart/form-data' },
                    onUploadProgress: (progressEvent) => {
                        if (progressEvent.total) {
                            const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                            setParcentLoader(percent);
                        }
                    }
                }
            );
            setProfile(res.data.data.url);
            toast.success('Image uploaded successfully!');
        } catch (error) {
            console.error('Image upload failed:', error);
            toast.error('Image upload failed. Please try again.');
        }
    };

    const onSubmit = (data) => {
        if (!profile) return toast.error('Please upload your profile picture first.');
        const userInfo = { displayName: data.name, photoURL: profile };

        createUser(data.email, data.password)
            .then(async (result) => {
                const loggedUser = {
                    email: result.user.email,
                    // role: role
                };
                await axiosSecure.post('/jwt', loggedUser);
                userProfile(userInfo).then(() => {

                    const userToDB = {
                        name: data.name,
                        email: data.email,
                        photoURL: profile,
                        role: 'user',
                        createdAt: new Date().toISOString()
                    };

                    //console.log(result)

                    axiosInstance.post('/users', userToDB).then(res => {
                        if (res.data.insertedId || res.data.inserted === false) {
                            Swal.fire({
                                title: 'Register Successfully!',
                                icon: 'success',
                                text: 'You have been successfully register.',
                                showConfirmButton: false,
                                timer: 1500
                            });
                            navigate(from);
                        }
                    });
                });
            });
    };

    const password = watch('password');

    return (
        <div
            className="min-h-screen flex items-center justify-center  p-4 md:p-0 bg-p1"
        >
            <ToastContainer position="top-center" autoClose={3000} />
            <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-lg">
                <div className="flex justify-center mb-10">
                    <Link to="/"><Logo /></Link>
                </div>

                <h2 className="text-light text-center text-2xl font-bold  mb-6">
                    Create Your DanaFly Account
                </h2>

                {/* Name */}
                <div className="mb-4">
                    <label className="block text-light font-medium mb-2">Full Name</label>
                    <input
                        type="text"
                        {...register('name', { required: 'Name is required' })}
                        placeholder="Enter your full name"
                        className="w-full rounded-xl border border-[#e7d9cf] bg-p2 h-12 px-4 text-light focus:outline-none"
                    />
                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
                </div>

                {/* Email */}
                <div className="mb-4">
                    <label className="block text-light font-medium mb-2">Email</label>
                    <input
                        type="email"
                        {...register('email', { required: 'Email is required' })}
                        placeholder="Enter your email"
                        className="w-full rounded-xl border border-[#e7d9cf] bg-p2 h-12 px-4 text-light focus:outline-none"
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                </div>

                {/* Profile Picture */}
                <div className="mb-4">
                    <label className="block text-light font-medium mb-2">Profile Picture</label>
                    <div className="relative">
                        <input
                            type="file"
                            // accept="image/*"
                            onChange={handlePhoto}
                            className="w-full rounded-xl border border-[#e7d9cf] bg-p2 px-4 py-2 text-sm text-light3 focus:outline-none cursor-pointer"
                        />
                        {parcentLoader && (
                            <p className="text-green-600 absolute top-2 right-4 text-sm">{parcentLoader}%</p>
                        )}
                    </div>
                </div>

                {/* Password */}
                <div className="mb-4">
                    <label className="block text-light font-medium mb-2">Password</label>
                    <div className="relative">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            {...register('password', {
                                required: true,
                                minLength: 6,
                                pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).*$/
                            })}
                            placeholder="Enter your password"
                            className="w-full rounded-xl border border-[#e7d9cf] bg-p2 h-12 px-4 pr-10 text-light focus:outline-none"
                        />
                        <span
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute top-4 right-4 cursor-pointer text-light3"
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </span>
                    </div>
                    {errors.password && <p className="text-red-500 text-sm mt-1">Invalid password</p>}
                </div>

                {/* Confirm Password */}
                <div className="mb-6">
                    <label className="block text-light font-medium mb-2">Confirm Password</label>
                    <div className="relative">
                        <input
                            type={showConfirm ? 'text' : 'password'}
                            {...register('confirmPassword', {
                                required: 'Confirm password is required',
                                validate: value => value === password || 'Passwords do not match'
                            })}
                            placeholder="Confirm your password"
                            className="w-full rounded-xl border border-[#e7d9cf] bg-p2 h-12 px-4 pr-10 text-light focus:outline-none"
                        />
                        <span
                            onClick={() => setShowConfirm(!showConfirm)}
                            className="absolute top-4 right-4 cursor-pointer text-light3"
                        >
                            {showConfirm ? <FaEyeSlash /> : <FaEye />}
                        </span>
                    </div>
                    {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>}
                </div>

                {/* Submit */}
                <button
                    type="submit"
                    className="w-full h-12 cta-btn text-light rounded-full font-bold text-sm hover:bg-[#3d7672] transition"
                >
                    Sign Up
                </button>

                {/* Login Link */}
                <p className="text-light3 text-sm text-center underline mt-6">
                    Already have an account? <Link to="/login">Login</Link>
                </p>
            </form>
        </div>
    );
};

export default Register;
