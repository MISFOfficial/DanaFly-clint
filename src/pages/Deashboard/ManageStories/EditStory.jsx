import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams, useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import axios from 'axios';
import useAxiosInstance from '../../../Hooks/useAxiosInstance';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';

const EditStory = () => {
    const { id } = useParams();
    const axiosInstance = useAxiosInstance()
    const axiosSecure = useAxiosSecure()
    const navigate = useNavigate();

    //console.log(id)

    const { register, handleSubmit, reset } = useForm();
    const [story, setStory] = useState(null);
    const [newPhotos, setNewPhotos] = useState([]);
    const [isUploading, setIsUploading] = useState(false);
    const [photoUpdate, setPhotoUpdate] = useState(false)

    useEffect(() => {
        axiosSecure.get(`/story/${id}`).then(res => {
            setStory(res.data);
            reset(res.data);
        });
    }, [id, axiosSecure, reset]);

    const handleImageUpload = async (e) => {
        const files = e.target.files;
        setIsUploading(true);
        const uploaded = [];

        for (let file of files) {
            const formData = new FormData();
            formData.append('image', file);
            const res = await axios.post(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_ImBB_key}`, formData);
            uploaded.push(res.data.data.url);
        }

        setNewPhotos(uploaded);
        setIsUploading(false);
    };

    const handleRemovePhoto = async (photoUrl) => {
        const res = await axiosInstance.patch(`/stories/${id}/remove-photo`, { photoUrl });
        setStory(prev => ({
            ...prev,
            photo: prev.photo.filter(p => p !== photoUrl)

        }));
        if (res.data.modifiedCount > 0) {
            setPhotoUpdate(true)
            // navigate('/deshboard/mangeStories');
        }
    };

    const onSubmit = async (data) => {
        const payload = {
            ...data,
            newPhotos
        };

        //console.log(data)

        const res = await axiosInstance.patch(`/stories/${id}`, payload);
        //console.log(res.data.modifiedCount)
        if (res.data.modifiedCount > 0 || photoUpdate === true) {
            Swal.fire({
                title: 'Success',
                text: 'Story updated successfully!',
                icon: 'success',
                showConfirmButton: false,
                timer: 1500
            });
            navigate('/deshboard/mangeStories');
        }

        else {
            Swal.fire('Nothing Updated!');
            // navigate('/deshboard/mangeStories');
        }

    };

    if (!story) return <p>Loading...</p>;

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <title>DanaFly - Deshboard/Edite Story</title>
            <h1>Title</h1>
            <input {...register('title')} className="border p-2 w-full" placeholder="Title" />
            <h1>Discription</h1>
            <textarea {...register('description')} className="border p-2 w-full" placeholder="Description" />

            <div className="flex gap-2 flex-wrap">
                {story.photo?.map((img, i) => (
                    <div key={i} className="relative">
                        <img src={img} alt="" className="w-24 h-24 rounded" />
                        <button
                            type="button"
                            onClick={() => handleRemovePhoto(img)}
                            className="absolute top-0 right-0 bg-red-500 text-light p-1 text-xs rounded"
                        >
                            ✕
                        </button>
                    </div>
                ))}
                {newPhotos.map((img, i) => (
                    <img key={i} src={img} className="w-24 h-24 rounded" alt="" />
                ))}

            </div>

            <input type="file" multiple onChange={handleImageUpload} />
            <button type="submit" disabled={isUploading} className="bg-[#00A99D] text-light px-4 py-2 rounded">
                {isUploading ? 'Uploading...' : 'Update Story'}
            </button>
        </form>
    );
};

export default EditStory;
