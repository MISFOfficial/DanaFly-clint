import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { toast } from 'react-toastify';
import axios from 'axios';
import useAuth from '../../../Hooks/useAuth';
import Swal from 'sweetalert2';
import useAxiosInstance from '../../../Hooks/useAxiosInstance';
import { useNavigate } from 'react-router';

const AddStory = () => {
    const { user } = useAuth();
    const axiosInstance = useAxiosInstance()

    const navigate = useNavigate()

    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
        reset
    } = useForm();

    const [photo, setPhoto] = useState([]);
    const [isUploading, setIsUploading] = useState(false);

    const handleImageChange = async (e) => {
        const files = e.target.files;
        if (!files || files.length === 0) return toast.error('Please select at least one image.');

        const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
        const uploadedImages = [];

        setIsUploading(true);
        setPhoto([]);

        for (let i = 0; i < files.length; i++) {
            const image = files[i];
            if (!allowedTypes.includes(image.type)) {
                toast.error(`${image.name} is not an allowed file type.`);
                continue;
            }

            const formData = new FormData();
            formData.append('image', image);

            try {
                const res = await axios.post(
                    `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_ImBB_key}`,
                    formData,
                    {
                        headers: { 'Content-Type': 'multipart/form-data' },
                    }
                );
                uploadedImages.push(res.data.data.url);
            } catch (error) {
                console.error('Image upload failed:', error);
                toast.error(`Failed to upload ${image.name}`);
            }
        }

        setPhoto(uploadedImages);
        setIsUploading(false);
    };

    const onSubmit = async (data) => {
        // if (!photo || photo.length === 0) {
        //     Swal.fire({
        //         icon: 'warning',
        //         title: 'Photo Missing!',
        //         text: 'Please upload a photo before submitting the story.',
        //     });
        //     return;
        // }

        const storyData = {
            ...data,
            posterName: user.displayName,
            posterEmail: user.email,
            photo: photo,
            postAt: new Date().toDateString(),
        };

        //console.log(storyData)

        try {
            const res = await axiosInstance.post('/story', storyData);
            if (res.data.insertedId) {
                Swal.fire({
                    icon: 'success',
                    title: 'Story Added!',
                    text: 'Your story was successfully submitted.',
                    showConfirmButton: false,
                    timer: 1500
                });
                navigate('/deshboard/mangeStories')
                reset();
            }
        } catch (error) {
            console.error('Story submission failed:', error);
            Swal.fire({
                icon: 'error',
                title: 'Submission Failed',
                text: 'Something went wrong. Please try again.',
            });
        }
    };

    return (
        <div >
            <title>DanaFly - Deshboard/Add Storysr</title>
            <h2 className="text-3xl font-bold text-[#00A99D] mb-6 text-start">Add Your Story</h2>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="bg-white p-8 rounded-xl border-t-8 border-[#00A99D] shadow space-y-6"
            >
                {/* Title */}
                <div>
                    <label className="block font-semibold mb-1">Title</label>
                    <input
                        type="text"
                        {...register('title', { required: 'Title is required' })}
                        className="w-full border-[#00A99D] border px-4 py-2 rounded focus:outline-none"
                        placeholder="Enter your story title"
                    />
                    {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
                </div>

                {/* Description */}
                <div>
                    <label className="block font-semibold mb-1">Description</label>
                    <textarea
                        {...register('description', { required: 'Description is required' })}
                        rows={5}
                        className="w-full border-[#00A99D] border px-4 py-2 rounded resize-none focus:outline-none"
                        placeholder="Share your experience..."
                    />
                    {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
                </div>

                {/* Story Type */}
                <div>
                    <label className="block font-semibold mb-1">Story Type</label>
                    <select
                        {...register('type', { required: 'Please select a story type' })}
                        className="w-full border-[#00A99D] border px-4 py-2 rounded"
                    >
                        <option value="">Select type</option>
                        <option value="Nature">Nature</option>
                        <option value="Adventure">Adventure</option>
                        <option value="Cultural">Cultural</option>
                        <option value="Food">Food</option>
                    </select>
                    {errors.type && <p className="text-red-500 text-sm">{errors.type.message}</p>}
                </div>

                {/* Date & Image Upload */}
                <div className="flex flex-col md:flex-row gap-5">
                    <div className="w-fit">
                        <label className="block font-semibold mb-1">Travel Date</label>
                        <Controller
                            control={control}
                            name="date"
                            rules={{ required: 'Please select a date' }}
                            render={({ field }) => (
                                <DatePicker
                                    {...field}
                                    selected={field.value}
                                    onChange={field.onChange}
                                    className="w-full border-[#00A99D] border px-4 py-2 rounded"
                                    placeholderText="Choose date"
                                />
                            )}
                        />
                        {errors.date && <p className="text-red-500 text-sm">{errors.date.message}</p>}
                    </div>

                    <div className="w-full md:w-1/4 ">
                        <label className="block font-semibold mb-1">Rating</label>
                        <div className="relative w-full">
                            <input
                                {...register('rating', { required: 'Please input rating out of 5 ' })}
                                type="number"
                                maxLength={5}
                                className="w-full border-[#00A99D] border px-4 py-2 rounded cursor-pointer"
                            />
                        </div>
                    </div>
                    <div className="w-full ">
                        <label className="block font-semibold mb-1">Upload Images</label>
                        <div className="relative">
                            <input
                                type="file"
                                multiple
                                onChange={handleImageChange}
                                className="w-full border-[#00A99D] border px-4 py-2 rounded cursor-pointer"
                            />
                            {isUploading && (
                                <div className="absolute top-2 right-4">
                                    <svg className="animate-spin h-5 w-5 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                    </svg>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Location */}
                <div>
                    <label className="block font-semibold mb-1">Location (optional)</label>
                    <input
                        type="text"
                        {...register('location')}
                        className="w-full border-[#00A99D] border px-4 py-2 rounded"
                        placeholder="e.g., Cox's Bazar"
                    />
                </div>

                {/* Tags */}
                <div>
                    <label className="block font-semibold mb-1">Tags (comma separated)</label>
                    <input
                        type="text"
                        {...register('tags')}
                        className="w-full border-[#00A99D] border px-4 py-2 rounded"
                        placeholder="e.g., beach, sunset, fun"
                    />
                </div>

                {/* Submit */}
                <div className="text-right">
                    <button
                        type="submit"
                        disabled={isUploading}
                        className={`bg-[#00A99D] text-white px-6 py-2 rounded hover:bg-[#00796b] transition ${isUploading ? 'cursor-not-allowed' : ''}`}>
                        {/* {isUploading ? 'Uploading...' : 'Submit Story'} */}
                        Submit Story
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddStory;
