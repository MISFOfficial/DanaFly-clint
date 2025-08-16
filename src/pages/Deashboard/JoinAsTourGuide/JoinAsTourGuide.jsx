import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../Hooks/useAuth';
import useAxiosInstance from '../../../Hooks/useAxiosInstance';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';

const JoinAsTourGuide = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure()
    const axiosInstance = useAxiosInstance()
    const { register, handleSubmit, reset } = useForm();

    // ✅ Fetch application by user email
    const { data: application, isLoading, isError, refetch } = useQuery({
        queryKey: ['tour-guide-application', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/tour-guide-applications?email=${user.email}`);
            return res.data;
        },
    });

    const onSubmit = async (formData) => {
        const newData = {
            ...formData,
            email: user?.email,
            photo: user?.photoURL,
            name: user?.displayName,
            status: 'pending'
        };

        try {
            const res = await axiosInstance.post('/tour-guide-applications', newData);
            if (res.status === 201) {
                toast.success('✅ Application submitted!', { theme: 'colored' });
                reset();
                refetch();
            }
        } catch (err) {
            if (err.response?.data?.alreadyApplied) {
                toast.warning('You have already applied.', { theme: 'colored' });
            } else {
                toast.error('Something went wrong. Please try again.', { theme: 'colored' });
            }
        }
    };

    if (isLoading) {
        return (
            <section className="px-4 py-20 flex items-center justify-center">
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

    if (isError) {
        return <div className="text-red-500 text-center py-10">Failed to load data.</div>;
    }

    return (
        <section >
            <title>DanaFly - Deshboard/Join as Toure Guider</title>
            <h1 className="text-3xl font-bold text-[#00A99D] mb-6 text-start">Join as a Tour Guide</h1>
            <div className="p-6 bg-white rounded shadow mt-5">
                <p className="mb-6 text-gray-700">
                    Please fill out the application to become a tour guide on DanaFly.
                </p>

                {/* ✅ Conditional Messages */}
                {application?.status === 'active' || application?.status === 'accepted' ? (
                    <div className="text-center text-xl text-[#388e3c] font-semibold bg-green-50 border border-green-200 p-4 rounded">
                        🎉 <strong>Congrats!</strong> You are now an official Tour Guide!
                    </div>
                ) : application?.status === 'pending' ? (
                    <div className="text-center text-xl text-[#f57c00] font-semibold bg-orange-50 border border-orange-200 p-4 rounded">
                        🕒 You have already applied. Please wait for admin review.
                    </div>
                ) : (
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                            <div className="md:col-span-2">
                                <label className="block font-semibold mb-1">Application Title</label>
                                <input
                                    type="text"
                                    {...register('applicationTitle')}
                                    required
                                    placeholder="e.g. Passionate Tour Expert"
                                    className="w-full border rounded px-3 py-2"
                                />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block font-semibold mb-1">Why do you want to be a Tour Guide?</label>
                                <textarea
                                    rows={4}
                                    {...register('motivation')}
                                    required
                                    placeholder="Explain your motivation..."
                                    className="w-full border rounded px-3 py-2"
                                />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block font-semibold mb-1">CV / Portfolio Link</label>
                                <input
                                    type="url"
                                    {...register('cvLink')}
                                    required
                                    placeholder="https://example.com/your-cv"
                                    className="w-full border rounded px-3 py-2"
                                />
                            </div>
                            <div>
                                <label className="block font-semibold mb-1">Phone Number</label>
                                <input
                                    type="tel"
                                    {...register('phone')}
                                    required
                                    placeholder="+8801XXXXXXX"
                                    className="w-full border rounded px-3 py-2"
                                />
                            </div>
                            <div>
                                <label className="block font-semibold mb-1">Location</label>
                                <input
                                    type="text"
                                    {...register('location')}
                                    required
                                    placeholder="City or Region"
                                    className="w-full border rounded px-3 py-2"
                                />
                            </div>
                            <div>
                                <label className="block font-semibold mb-1">Years of Experience</label>
                                <input
                                    type="number"
                                    min={0}
                                    {...register('experienceYears')}
                                    required
                                    className="w-full border rounded px-3 py-2"
                                />
                            </div>
                            <div>
                                <label className="block font-semibold mb-1">Languages Spoken</label>
                                <input
                                    type="text"
                                    {...register('languages')}
                                    required
                                    placeholder="English, Bengali..."
                                    className="w-full border rounded px-3 py-2"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-[#00A99D] text-white py-3 rounded hover:bg-[#00796b] transition font-semibold"
                        >
                            Submit Application
                        </button>
                    </form>
                )}
            </div>
        </section>
    );
};

export default JoinAsTourGuide;
