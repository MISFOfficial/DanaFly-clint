import React from 'react';
import { useParams } from 'react-router';
import {
    HiOutlineMail,
    HiOutlinePhone,
    HiOutlineLocationMarker,
    HiOutlineGlobeAlt,
    HiOutlineStar,
    HiOutlineUserGroup
} from 'react-icons/hi';
import { FaLanguage, FaUserTie } from 'react-icons/fa';
import { useQuery } from '@tanstack/react-query';
// import useaxiosInstance from '../../Hooks/useAxiosInstance';
import useAxiosSecure from '../../Hooks/useAxiosSecure';



const TourGuideProfile = () => {
    const { id } = useParams();

    const axiosSecure = useAxiosSecure()

    const { data: guide = {}, isLoading, isError } = useQuery({
        queryKey: ['guideDetails', id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/api/guide-details/${id}`);
            return res.data;
        },
    });


    const { data: storiesByGuide = [], isLoading: storyLoading } = useQuery({
        queryKey: ['myStories', guide?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/stories?email=${guide.email}`);
            return res.data;
        },
    });


    //console.log(guide)
    //console.log(storiesByGuide)

    if (isLoading || storyLoading) return <div className="text-center py-10 text-lg">Loading...</div>;
    if (isError) return <div className="text-center py-10 text-red-500">Failed to load guide details.</div>;

    return (
        <section className="max-w-6xl mx-auto px-4 py-16">
            <title>DanaFly - Guide Details</title>
            {/* Tour Guide Profile */}
            <div className="bg-white shadow-xl rounded-xl p-6 md:p-8 flex flex-col md:flex-row gap-8 border-t-4 border-[#00A99D] items-center">
                {/* Profile Picture */}
                <div className="flex-shrink-0 flex flex-col items-center">
                    <img
                        src={guide.photo}
                        alt={guide.name}
                        className="w-44 h-44 rounded-full object-cover border-4 border-[#00A99D]"
                    />
                    <div className="mt-4 text-center text-sm text-gray-500 relative group w-fit mx-auto">
                        Guide ID: <span>{guide._id.slice(0, 5)}.....</span>

                        {/* Tooltip */}
                        <div className="absolute left-1/2 -translate-x-1/2 -top-10 w-max px-2 py-1 text-xs text-black bg-white rounded shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
                            {guide._id}
                        </div>
                    </div>
                </div>

                {/* Guide Info */}
                <div className="flex-grow space-y-3">
                    <h1 className="text-xl md:text-3xl font-bold text-[#00A99D] flex items-center gap-2">
                        <FaUserTie /> {guide.name}
                    </h1>
                    <p className="text-gray-600 text-sm md:text-lg text-center">{guide.motivation}</p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700 mt-4">
                        <p className="flex items-center gap-2 text-sm md:text-lg">
                            <HiOutlineLocationMarker className="text-[#00A99D]" />
                            <span><strong>Location:</strong> {guide.location}</span>
                        </p>
                        <p className="flex items-center gap-2 text-sm md:text-lg">
                            <HiOutlinePhone className="text-[#00A99D]" />
                            <span><strong>Phone:</strong> {guide.phone}</span>
                        </p>
                        <p className="flex items-center gap-2 text-sm md:text-lg">
                            <HiOutlineMail className="text-[#00A99D]" />
                            <span><strong>Email:</strong> {guide.email}</span>
                        </p>
                        <p className="flex items-center gap-2 text-sm md:text-lg">
                            <FaLanguage className="text-[#00A99D] text-wrap text-center" />
                            <span><strong>Languages:</strong> {guide.languages}</span>
                        </p>
                        <p className="flex items-center gap-2 text-sm md:text-lg">
                            <HiOutlineUserGroup className="text-[#00A99D]" />
                            <span><strong>Experience:</strong> {guide.experienceYears} years</span>
                        </p>
                        <p className="flex items-center gap-2 text-sm md:text-lg">
                            <HiOutlineStar className="text-yellow-500" />
                            <span><strong>Rating:</strong> {guide.rating} / 5</span>
                        </p>
                    </div>
                </div>
            </div>

            {/* Guide Stories */}


            <div className="mt-16">
                <h2 className="text-xl md:text-2xl font-bold text-[#00A99D] mb-6 text-center md:text-start">Stories by {guide.name}</h2>
                {storiesByGuide.length > 0 ? <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {storiesByGuide.map((story) => (
                        <div
                            key={story._id}
                            className="bg-white shadow-md hover:shadow-lg transition rounded-lg overflow-hidden group"
                        >
                            <img
                                src={story.photo}
                                alt={story.title}
                                className="w-full h-52 object-cover transform group-hover:scale-105 transition duration-300"
                            />
                            <div className="p-5">
                                <h3 className="text-lg font-semibold text-[#00A99D] mb-2">
                                    {story.title}
                                </h3>
                                <p className="text-gray-600 text-sm md:text-lg">{story.description}</p>
                            </div>
                        </div>
                    ))}
                </div> : <div>
                    <h1>No story Uploaded</h1>
                </div>}

            </div>
        </section>
    );
};

export default TourGuideProfile;
