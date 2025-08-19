import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import axios from 'axios';
import 'react-datepicker/dist/react-datepicker.css';
import useAxiosInstance from '../../../Hooks/useAxiosInstance';

const AddPackage = () => {
    const axiosInstance=useAxiosInstance()
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const [photos, setPhotos] = useState([]);
    const [isUploading, setIsUploading] = useState(false);

    const handlePhoto = async (e) => {
        const files = e.target.files;
        if (!files || files.length === 0) {
            toast.error('Please select at least one image.');
            return;
        }

        const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
        const uploadedImages = [];

        setIsUploading(true);
        setPhotos([]); // clear previous uploads

        for (let i = 0; i < files.length; i++) {
            const image = files[i];

            if (!allowedTypes.includes(image.type)) {
                toast.error(`${image.name} is not a supported image format.`);
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

        setPhotos(uploadedImages);
        setIsUploading(false);
    };

    const onSubmit = async (data) => {
        if (isUploading || photos.length === 0) {
            toast.warn('Please wait for image upload to complete.');
            return;
        }

        const packageData = {
            ...data,
            photo: photos,
            create_at: new Date().toISOString()
        };

        try {
            const res = await axiosInstance.post('/packages', packageData);
            if (res.data?.insertedId) {
                toast.success('Package added successfully');
                reset();
                setPhotos([]);
            }
        } catch (err) {
            console.error(err);
            toast.error('Failed to add package');
        }
    };

    return (
        <section >
            <title>DanaFly - Deshboard/Add packages</title>
            <h2 className="text-2xl font-bold mb-6 text-light">Add a Tour Package</h2>
            <div className="p-6 bg-p1 rounded shadow">
                <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 gap-4">

                    {/* Package Name */}
                    <input
                        {...register('packageName')}
                        type="text"
                        placeholder="Package Name"
                        className="border px-4 py-2 rounded"
                        required
                    />

                    {/* Tour Type Dropdown */}
                    <div>
                        <label className="block font-semibold mb-1">Tour Type</label>
                        <select
                            {...register('type', { required: 'Please select a tour type' })}
                            className="w-full  border px-4 py-2 rounded"
                        >
                            <option className='bg-p1' value="">Select type</option>
                            <option  className='bg-p1' value="Nature">Nature</option>
                            <option  className='bg-p1' value="Adventure">Adventure</option>
                            <option  className='bg-p1' value="Cultural">Cultural</option>
                            <option  className='bg-p1' value="Food">Food</option>
                        </select>
                        {errors.type && <p className="text-red-500 text-sm">{errors.type.message}</p>}
                    </div>

                    {/* Multiple Image Upload */}
                    <div className="mb-4">
                        <label className="block text-light font-medium mb-2">Tour Images</label>
                        <div className="relative">
                            <input
                                type="file"
                                multiple
                                onChange={handlePhoto}
                                className="w-full  border px-4 py-2 rounded cursor-pointer"
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

                    {/* Price */}
                    <input
                        {...register('price')}
                        type="number"
                        step="0.01"
                        placeholder="Price (BDT)"
                        className="border px-4 py-2 rounded"
                        required
                    />

                    {/* About Tour */}
                    <textarea
                        {...register('about')}
                        placeholder="About The Tour"
                        className="border px-4 py-2 rounded"
                        required
                    />

                    {/* Day-wise Plans */}
                    <input
                        {...register('day1')}
                        type="text"
                        placeholder="Day 1 Plan"
                        className="border px-4 py-2 rounded"
                        required
                    />
                    <input
                        {...register('day2')}
                        type="text"
                        placeholder="Day 2 Plan"
                        className="border px-4 py-2 rounded"
                        required
                    />
                    <input
                        {...register('day3')}
                        type="text"
                        placeholder="Day 3 Plan"
                        className="border px-4 py-2 rounded"
                        required
                    />

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={isUploading}
                        className={`cta-btn text-light px-6 py-2 rounded hover:bg-[#00796b] transition ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        {isUploading ? 'Uploading...' : 'Post'}
                    </button>
                </form>
            </div>
        </section>
    );
};

export default AddPackage;
