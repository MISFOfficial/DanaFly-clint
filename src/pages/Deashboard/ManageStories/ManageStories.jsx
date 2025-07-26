import React from 'react';
import { useNavigate } from 'react-router';
import { FaEdit, FaTrashAlt, FaMapMarkerAlt, FaTag } from 'react-icons/fa';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../Hooks/useAuth';
import Swal from 'sweetalert2';
import useAxiosInstance from '../../../Hooks/useAxiosInstance';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import MSLoader from '../../Loader/MSLoader/MSLoader';

const ManageStories = () => {
    const navigate = useNavigate();

    const { user } = useAuth()
    const axiosInstance = useAxiosInstance()
    const axiosSecure = useAxiosSecure()

    const { data: stories = [], isLoading, refetch } = useQuery({
        queryKey: ['myStories', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/stories?email=${user.email}`);
            return res.data;
        },
    });

    //console.log(stories)

    if (isLoading) {
         return (
            <section className="px-4 py-20 flex items-center justify-center">
                <title>DanaFly - Deshboard/Manage Story</title>
                <div className="p-6 rounded-lg shadow-lg bg-white text-center max-w-md w-full">
                    <div className="flex justify-center mb-4">
                        <div className="w-10 h-10 border-4 border-t-[#00A99D] border-[#b2dfdb] rounded-full animate-spin"></div>
                    </div>
                    <h2 className="text-xl font-semibold text-[#00A99D] mb-1">Loading...</h2>
                    <p className="text-gray-600 text-sm">
                        Please wait while we check your application status.
                    </p>
                </div>
            </section>
        );
    }

    const handleEdit = (id) => {
        //console.log(id)
        navigate(`/deshboard/edit-story/${id}`)
    }

    const handleDelete = async (id) => {
        //console.log(id)
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'Cancel'
        });
        if (result.isConfirmed) {
            try {
                const res = await axiosInstance.delete(`/stories/${id}`);
                if (res.data.success) {
                    Swal.fire('Deleted!', 'Your story has been deleted.', 'success');

                } else {
                    Swal.fire('Error', 'Something went wrong.', 'error');
                }
            } catch (error) {
                Swal.fire('Error', error.message, 'error');
            }
            refetch()
        }
        // refetch()
    };

    return (
        <section >
            <h1 className="text-3xl font-bold text-start text-[#00A99D] mb-5">Manage Your Stories</h1>

            {stories.length === 0 ? (
                <p className="text-center text-gray-500">No stories found. Start by adding some!</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {stories.map((story) => (
                        <div key={story.id} className="bg-white rounded-lg shadow-md overflow-hidden p-4">
                            {/* Images */}
                            {story.photo?.length > 0 && (
                                <div className="flex gap-2 overflow-x-auto scroll-auto pb-2">
                                    {story.photo.map((img, i) => (
                                        <img
                                            key={i}
                                            src={img}
                                            alt={`story-${i}`}
                                            className="h-28 w-36 object-cover rounded "
                                        />
                                    ))}
                                </div>
                            )}

                            {/* Story Info */}
                            <div className="mt-4">
                                <h2 className="text-xl font-bold text-[#00A99D]">{story.title}</h2>
                                <p className="text-gray-700 mt-2">{story.description}</p>

                                <p className="text-sm text-gray-500 mt-2 flex items-center">
                                    <FaMapMarkerAlt className="mr-1" /> {story.location}
                                </p>

                                {story.tags?.length > 0 && (
                                    <div className="mt-3 flex flex-wrap gap-2 text-sm">
                                        <span className="bg-[#00A99D] text-white px-2 py-1 rounded flex items-center gap-1">
                                            <FaTag /> {story.tags}
                                        </span>
                                    </div>
                                )}
                            </div>

                            {/* Actions */}
                            <div className="mt-6 flex justify-end gap-4">
                                <button
                                    onClick={() => handleEdit(story._id)}
                                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded flex items-center gap-2"
                                >
                                    <FaEdit /> Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(story._id)}
                                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded flex items-center gap-2"
                                >
                                    <FaTrashAlt /> Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
};

export default ManageStories;
