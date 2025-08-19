import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import useAuth from '../../../Hooks/useAuth';
import useAxiosInstance from '../../../Hooks/useAxiosInstance';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';

const MyAssignedTours = () => {
    const { user } = useAuth();
    const axiosInstance = useAxiosInstance();
    const axiosSecure = useAxiosSecure();

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const { data: bookings = [], refetch, isLoading } = useQuery({
        queryKey: ['assignedTours', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/booking-packages?guideEmail=${user?.email}`);
            return res.data;
        }
    });

    const handleAccept = async (id) => {
        try {
            const res = await axiosInstance.patch(`/booking-packages/accept/${id}`, {
                status: 'accepted'
            });
            if (res.data.modifiedCount > 0) {
                Swal.fire('Success', 'Tour has been accepted!', 'success');
                refetch();
            }
        } catch (error) {
            Swal.fire('Error', error.message, 'error');
        }
    };

    const handleReject = async (id) => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: "Rejecting will mark this tour as rejected.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, reject it!',
            cancelButtonText: 'Cancel'
        });

        if (result.isConfirmed) {
            try {
                const res = await axiosInstance.patch(`/booking-packages/reject/${id}`, {
                    status: 'rejected'
                });
                if (res.data.modifiedCount > 0) {
                    Swal.fire('Rejected!', 'Tour has been rejected.', 'success');
                    refetch();
                }
            } catch (error) {
                Swal.fire('Error', error.message, 'error');
            }
        }
    };

    // Pagination logic
    const totalPages = Math.ceil(bookings.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentBookings = bookings.slice(startIndex, startIndex + itemsPerPage);

    return (
        <section>
            <title>DanaFly - Deshboard/My Assigned Tour</title>
            <h2 className="text-2xl font-bold text-light mb-6">My Assigned Tours</h2>

            <div className="overflow-x-auto rounded-lg">
                <table className="min-w-full bg-p1">
                    <thead className="cta-btn text-light">
                        <tr>
                            <th className="py-3 px-4 text-left">Package Name</th>
                            <th className="py-3 px-4 text-left">Tourist Name</th>
                            <th className="py-3 px-4 text-left">Tour Date</th>
                            <th className="py-3 px-4 text-left">Price</th>
                            <th className="py-3 px-4 text-left">Status</th>
                            <th className="py-3 px-4 text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody>

                        {isLoading ? <tr>
                            <td colSpan="5" className="text-center py-6">Loading...</td>
                        </tr> :
                            (
                                bookings.length === 0 ? (<p className="text-center text-light3">No assigned tours found.</p>) :
                                    currentBookings.map(booking => (
                                        <tr key={booking._id} className="border-b border-gray-500">
                                            <td className="py-2 px-4">{booking.packageName}</td>
                                            <td className="py-2 px-4">{booking.touristName}</td>
                                            <td className="py-2 px-4">{booking.tourDate}</td>
                                            <td className="py-2 px-4">${booking.price}</td>
                                            <td className="py-2 px-4 capitalize">{booking.status}</td>
                                            <td className="py-2 px-4 space-x-2">
                                                <button
                                                    onClick={() => handleAccept(booking._id)}
                                                    disabled={(booking.status === 'accepted' || booking.status === 'rejected' || booking.status === 'pending')}
                                                    className={`px-3 py-1 rounded text-light ${(booking.status === 'accepted' || booking.status === 'rejected' || booking.status === 'pending')
                                                        ? 'bg-gray-400 cursor-not-allowed'
                                                        : 'bg-green-600 hover:bg-green-700'
                                                        }`}
                                                >
                                                    Accept
                                                </button>
                                                <button
                                                    onClick={() => handleReject(booking._id)}
                                                    disabled={(booking.status === 'accepted' || booking.status === 'rejected')}
                                                    className={`px-3 py-1 rounded text-light ${(booking.status === 'accepted' || booking.status === 'rejected')
                                                        ? 'bg-gray-400 cursor-not-allowed'
                                                        : 'bg-red-600 hover:bg-red-700'
                                                        }`}
                                                >
                                                    Reject
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                            )
                        }

                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="mt-6 flex justify-center items-center gap-2 text-sm">
                <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="px-3 py-1 cta-btn rounded disabled:opacity-50"
                >
                    Previous
                </button>
                {[...Array(totalPages).keys()].map(pageNum => (
                    <button
                        key={pageNum + 1}
                        onClick={() => setCurrentPage(pageNum + 1)}
                        className={`px-3 py-1 rounded ${currentPage === pageNum + 1 ? 'cta-btn text-light' : 'bg-p1'}`}
                    >
                        {pageNum + 1}
                    </button>
                ))}
                <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="px-3 py-1 cta-btn rounded disabled:opacity-50"
                >
                    Next
                </button>
            </div>
        </section>
    );
};

export default MyAssignedTours;
