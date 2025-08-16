import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { FaStar } from 'react-icons/fa';
// import useAxiosInstance from '../../Hooks/useAxiosInstance';
import useAxiosSecure from '../../Hooks/useAxiosSecure';


const Testimonials = () => {
    const axiosSecure=useAxiosSecure()

    const { data: testimonials = [], isLoading } = useQuery({
        queryKey: ['stories'],
        queryFn: async () => {
            const res = await axiosSecure.get('/all_story');
            return res.data;
        },
    });

    if (isLoading) {
        return 'loading.......';
    }

    return (
        <div className="max-w-[1280px] mx-auto p-6 mt-10">
            <h1 className="text-xl md:text-3xl font-bold text-start mb-10 text-[#00A99D]">What Tourists Say</h1>
            <div className="grid md:grid-cols-3 gap-6">
                {testimonials.slice(0, 3).map((t, index) => {
                    const rating = parseInt(t.rating) || 0;
                    return (
                        <div key={index} className="bg-white rounded-xl shadow-lg p-5 flex flex-col items-center text-center">
                            <img src={t.photo[0]} alt={t.posterName} className="w-20 h-20 rounded-full border-4 border-[#00A99D] mb-3 object-cover" />
                            <h3 className="text-lg font-semibold text-[#00A99D]">{t.posterName}</h3>
                            <p className="text-gray-600 my-2 text-sm md:text-lg">{t.description}</p>
                            <div className="flex items-center gap-1 mt-2">
                                {[...Array(rating)].map((_, i) => (
                                    <FaStar key={i} className="text-yellow-500" />
                                ))}
                                <span className="text-sm text-gray-600">({rating})</span>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Testimonials;
