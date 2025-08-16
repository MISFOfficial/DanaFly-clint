import React from 'react';
import { useParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';
// import useAxiosInstance from '../../Hooks/useAxiosInstance';
import useAxiosSecure from '../../Hooks/useAxiosSecure';


const GuideDetails = () => {
    const { id } = useParams();
    const axiosSecure=useAxiosSecure()

    const { data: guide = {}, isLoading, isError } = useQuery({
        queryKey: ['guideDetails', id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/api/guide-details/${id}`);
            return res.data;
        },
    });

    //console.log(isError)

    if (isLoading) return <div className="text-center py-10 text-lg">Loading...</div>;
    if (isError) return <div className="text-center py-10 text-red-500">Failed to load guide details.</div>;

    return (
        <div className='px-4 py-12'>
            <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-md py-12">
                <div className="flex flex-col md:flex-row items-center gap-6 justify-center">
                    <img src={guide.photo} alt={guide.name} className="w-40 h-40 rounded-full object-cover border-4 border-[#00A99D]" />
                    <div>
                        <h2 className="text-3xl font-bold text-[#00A99D]">{guide.name}</h2>
                        <p className="text-gray-600 italic">{guide.applicationTitle}</p>
                        <p className="mt-2 text-sm"><span className="font-semibold">Email:</span> {guide.email}</p>
                        <p className="text-sm"><span className="font-semibold">Phone:</span> {guide.phone}</p>
                        <p className="text-sm"><span className="font-semibold">Location:</span> {guide.location}</p>
                        <p className="text-sm"><span className="font-semibold">Languages:</span> {guide.languages}</p>
                        <p className="text-sm"><span className="font-semibold">Experience:</span> {guide.experienceYears} years</p>
                    </div>
                </div>

                <div className="mt-6">
                    <h3 className="text-xl font-semibold mb-2 text-[#00A99D]">Motivation</h3>
                    <p className="text-gray-700">{guide.motivation}</p>
                </div>

                <div className="mt-4">
                    <a
                        href={guide.cvLink}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-block mt-3 px-4 py-2 bg-[#00A99D] text-white rounded hover:bg-[#00897B] transition"
                    >
                        View CV
                    </a>
                </div>
            </div>
        </div>
    );
};

export default GuideDetails;
