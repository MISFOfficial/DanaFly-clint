import React, { useEffect, useState } from 'react';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import CounterLoader from '../../Loader/CounterLoader/CounterLoader';


// Helper function
const formatNumber = (num) => {
    if (num >= 1_000_000) return (num / 1_000_000).toFixed(1) + 'm';
    if (num >= 1_000) return (num / 1_000).toFixed(1) + 'k';
    return num.toString();
};

const Counter = () => {
    const axiosSecure = useAxiosSecure()
    const [startCounter, setStartCounter] = useState(false);
    const { ref, inView } = useInView({ threshold: 0.5 });

    useEffect(() => {
        if (inView) {
            setStartCounter(false);
            setTimeout(() => setStartCounter(true), 50);
        }
    }, [inView]);

    // All users
    const { data: users = [], isLoading: usersLoading } = useQuery({
        queryKey: ['users/all'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users');
            return res.data;
        },
    });

    // Only tour guides
    const { data: tourGuides = [], isLoading: guidesLoading } = useQuery({
        queryKey: ['users/tour-guide'],
        queryFn: async () => {
            const res = await axiosSecure.get('/active-tour-guides?status=active');
            return res.data;
        },
    });

    // get total packages
    const { data: packages = [], isLoading: packagesLoading } = useQuery({
        queryKey: ['packages'],
        queryFn: async () => {
            const res = await axiosSecure.get('/packages');
            return res.data;
        },
    });

    // //console.log(packages)

    if (usersLoading || guidesLoading || packagesLoading) {
        return (
            <CounterLoader></CounterLoader>
        );
    }

    const stats = [
        { label: 'Total Users', value: users.length },
        { label: 'Registered Tour Guides', value: tourGuides.length },
        { label: 'Tour Packages Available', value: packages.length },
    ];

    return (
        <section
            ref={ref}
            className="py-16"
        >
            <div className="max-w-6xl mx-auto px-6">
                <h2 className="text-xl md:text-4xl font-bold text-center mb-10 text-light">
                    Trusted by Our Growing Community
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 ">
                    {stats.map((stat, index) => (
                        <div
                            key={index}
                            className="bg-p2 shadow-md rounded-lg p-6 text-center w-full "
                        >
                            <h2 className="text-xl md:text-4xl font-bold text-light mb-2">
                                {startCounter ? (
                                    <CountUp
                                        end={stat.value}
                                        duration={2}
                                        formattingFn={formatNumber}
                                    />
                                ) : (
                                    '0'
                                )}
                            </h2>
                            <p className="text-sm md:text-lg text-gray-700 font-medium">{stat.label}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Counter;
