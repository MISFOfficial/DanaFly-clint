import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { FaUserEdit } from 'react-icons/fa';
import { MdEmail, MdOutlineVerifiedUser } from 'react-icons/md';
import useAuth from '../../../Hooks/useAuth';
import AdminProfile from './AdminProfile';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import ProfileLoader from '../../../Loader/ProfileLoader';
import TourGuideProfile from '../../TourGuideProfile/TourGuideProfile';
import useAxiosInstance from '../../../Hooks/useAxiosInstance';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
const ManageProfile = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [photo, setPhoto] = useState()

    const axiosInstance = useAxiosInstance()
    const axiosSecure = useAxiosSecure()

    const { register, handleSubmit } = useForm();

    const { userProfile } = useAuth()


    const { data: userInfo, isLoading, refetch } = useQuery({
        queryKey: ['user', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/role/${user?.email}`);
            return res.data;
        }
    });

    if (isLoading) {
        return <ProfileLoader></ProfileLoader>
    }

    //console.log(userInfo)

    const handlePhoto = async (e) => {
        const image = e.target.files[0];
        if (!image) return toast.error('Please select an image file.');

        const formData = new FormData();
        formData.append('image', image);

        const res = await axios.post(
            `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_ImBB_key}`,
            formData,
            {
                headers: { 'Content-Type': 'multipart/form-data' },
            }
        );

        //console.log(res?.data?.data?.url)
        setPhoto(res?.data?.data?.url)
    };

    //console.log(photo)


    const handleSave = (data) => {
        // Implement user profile update logic here
        // For example, call Firebase updateProfile()
        // e.preventDefault()
        setIsModalOpen(false);
        // //console.log('worked', data)
        const displayName = data?.name
        const photoURL = photo

        const userInfo = {
            displayName, photoURL
        }

        //console.log(userInfo)

        userProfile(userInfo)
            .then(async () => {
                //console.log(r)
                const updatedUser = {
                    name: data?.name,
                    photoURL: photo
                };

                const res = await axiosInstance.put(`/users/${user?.email}`, updatedUser);
                if (res.data.message) {
                    Swal.fire('Updated', 'Profile updated successfully!', 'success');
                    refetch();
                }
            })
        // refetch()
    };


    return (
        <section className=" ">
            <h2 className="text-3xl font-bold  text-[#00A99D] mb-5">Welcome, {userInfo?.name || 'User'} 👋</h2>

            <div className="bg-white shadow rounded-lg p-6 space-y-6">
                <div className="flex flex-col md:flex-row items-center gap-6">
                    <img
                        src={userInfo?.photoURL}
                        alt="Profile"
                        className="w-28 h-28 rounded-full border-4 border-[#00A99D] object-cover"
                    />
                    <div className="space-y-2">
                        <h3 className="text-xl font-semibold flex items-center gap-2">
                            <FaUserEdit className="text-[#00A99D]" /> {userInfo?.name}
                        </h3>
                        <p className="text-gray-600 flex items-center gap-2">
                            <MdEmail className="text-[#00A99D]" /> {userInfo?.email}
                        </p>
                        <p className="text-gray-600 flex items-center gap-2">
                            <MdOutlineVerifiedUser className="text-[#00A99D]" /> Role: <span className="uppercase font-bold">{userInfo?.role}</span>
                        </p>
                    </div>
                </div>

                <div className="flex gap-4 ">
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="bg-[#00A99D] text-white px-5 py-2 rounded hover:bg-[#00796b] transition w-full md:w-fit"
                    >
                        Edit Profile
                    </button>
                    {userInfo?.role !== 'admin' &&
                        <button
                            onClick={() => navigate('/deshboard/asTourGuide')}
                            className="bg-white border border-[#00A99D] text-[#00A99D] px-5 py-2 rounded hover:bg-[#00A99D] hover:text-white transition w-full md:w-fit"
                        >
                            Apply For Tour Guide
                        </button>}
                </div>
            </div>

            {/* Edit Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4">
                    <div className="bg-white p-6 rounded-xl w-full max-w-lg">
                        <h3 className="text-xl font-bold text-[#00A99D] mb-4">Edit Profile</h3>

                        <form onSubmit={handleSubmit(handleSave)} className="space-y-4">
                            <div>
                                <label className="block font-medium mb-1">Name</label>
                                <input
                                    type="text"
                                    {...register("name", { required: "Name is required" })}
                                    defaultValue={user.displayName}
                                    className="w-full border px-3 py-2 rounded"
                                />

                            </div>

                            {/* Profile Picture */}
                            <div className="mb-4">
                                <label className="block text-[#1b130d] font-medium mb-2">Profile Picture</label>
                                <div className="relative">
                                    <input
                                        type="file"
                                        onChange={handlePhoto}
                                        className="w-full rounded-xl border border-[#e7d9cf] bg-[#fcfaf8] px-4 py-2 text-sm text-[#9a6b4c] focus:outline-none cursor-pointer"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block font-medium mb-1">Email</label>
                                <input
                                    type="email"
                                    {...register("email")}
                                    readOnly
                                    defaultValue={user.email}
                                    className="w-full border px-3 py-2 rounded bg-gray-100 text-gray-500"
                                />
                            </div>

                            <div>
                                <label className="block font-medium mb-1">Role</label>
                                <input
                                    type="text"
                                    {...register("role")}
                                    readOnly
                                    defaultValue={userInfo?.role}
                                    className="w-full border px-3 py-2 rounded bg-gray-100 text-gray-500"
                                />
                            </div>

                            <div className="flex justify-end gap-4">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-4 py-2 border rounded hover:bg-gray-100"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-[#00A99D] text-white rounded hover:bg-[#00796b]"
                                >
                                    Save Changes
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}



            <div>
                {userInfo?.role === 'admin' && <AdminProfile></AdminProfile>}
            </div>

            {/* <ProfileLoader></ProfileLoader> */}
            {/* <TourGuideProfile></TourGuideProfile> */}
        </section>
    );
};

export default ManageProfile;
