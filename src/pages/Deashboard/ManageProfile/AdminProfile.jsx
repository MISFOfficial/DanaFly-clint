import React from 'react';
import { useQuery } from '@tanstack/react-query';
import CountUp from 'react-countup';
// import useAxiosInstance from '../../../Hooks/useAxiosInstance';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import AdminLoader from '../../Loader/AdminLoader/AdminLoader';

const AdminProfile = () => {

    const axiosSecure=useAxiosSecure()

    const { data: paymentData = [] } = useQuery({
        queryKey: ['paidPayments'],
        queryFn: async () => {
            const res = await axiosSecure.get('/payments?status=paid');
            return res.data;
        }
    });

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
            const res = await axiosSecure.get('/active-tour-guides');
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

    // get all story
    const { data: story = [], isLoading: storyLoading } = useQuery({
        queryKey: ['story'],
        queryFn: async () => {
            const res = await axiosSecure.get('/all_story');
            return res.data;
        },
    });

    if (usersLoading || storyLoading || packagesLoading || guidesLoading) {
        return <AdminLoader></AdminLoader>
    }

    // //console.log(paymentData)
    // //console.log(story)

    const totalPaid = paymentData.reduce((sum, item) => {
        const price = parseFloat(item.price);
        return sum + (isNaN(price) ? 0 : price);
    }, 0);

    // //console.log("Total Paid Price:", totalPaid);

    return (
        <div className="py-5">
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-light">
                <div className="cta-btn rounded-2xl p-12">
                    <h4 className="text-lg">Total Payment</h4>
                    <p className="text-2xl font-bold">৳
                        <CountUp
                            end={totalPaid}
                            duration={2}
                        // formattingFn={formatNumber}
                        />
                    </p>
                </div>
                <div className="bg-p1 text-light3 p-12 rounded-2xl">
                    <h4 className="text-lg">Total Tour Guides</h4>
                    <p className="text-2xl font-bold">
                        <CountUp
                            end={tourGuides.length}
                            duration={2}
                        // formattingFn={formatNumber}
                        />
                    </p>
                </div>
                <div className="bg-p1 text-light3 p-12 rounded-2xl">
                    <h4 className="text-lg">Total Packages</h4>
                    <p className="text-2xl font-bold">
                        <CountUp
                            end={packages.length}
                            duration={2}
                        // formattingFn={formatNumber}
                        />
                    </p>
                </div>
                <div className="bg-p1 text-light3 p-12 rounded-2xl">
                    <h4 className="text-lg">Total Clients</h4>
                    <p className="text-2xl font-bold">
                        <CountUp
                            end={users.length}
                            duration={2}
                        // formattingFn={formatNumber}
                        />
                    </p>
                </div>
                <div className="bg-p1 text-light3 p-12 rounded-2xl">
                    <h4 className="text-lg">Total Stories</h4>
                    <p className="text-2xl font-bold">
                        <CountUp
                            end={story.length}
                            duration={2}
                        // formattingFn={formatNumber}
                        />
                    </p>
                </div>
            </div>

        </div>
    );
};

export default AdminProfile;
