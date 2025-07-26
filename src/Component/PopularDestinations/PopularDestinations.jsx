import React from 'react';
import { useQuery } from '@tanstack/react-query';
// import useAxiosInstance from '../../Hooks/useAxiosInstance';
import useAxiosSecure from '../../Hooks/useAxiosSecure';

const PopularDestinations = () => {

    const axiosSecure=useAxiosSecure()

    // // Fetch packages
    const { data: destinations = [], isLoading } = useQuery({
        queryKey: ['all-packages'],
        queryFn: async () => {
            const res = await axiosSecure.get('/packages');
            return res.data;
        }
    });

    // //console.log(destinations)

    if (isLoading) {
        return 'loading.......'
    }


    return (
        <div className="max-w-[1280px] mx-auto p-6 ">
            <h1 className="text-xl md:text-3xl font-bold text-start mb-10 text-[#00A99D]">Popular Destinations</h1>
            <div className="grid md:grid-cols-3 gap-6">
                {destinations.slice(0, 3).map(dest => (
                    <div key={dest._id} className="bg-white rounded-lg shadow-md overflow-hidden">
                        <img src={dest.photo} alt={dest.packageName} className="w-full h-48 object-cover" />
                        <div className="p-4">
                            <h2 className="text-xl font-bold text-[#00A99D]">{dest.packageName}</h2>
                            <p className="text-gray-600 mt-2 text-sm md:text-lg">{dest.about}</p>
                            <div className="mt-3 flex flex-wrap gap-2">
                                <span className="px-2 py-1 bg-[#E0F2F1] text-[#00796B] rounded-full text-xs">
                                    #{dest.type}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PopularDestinations;
