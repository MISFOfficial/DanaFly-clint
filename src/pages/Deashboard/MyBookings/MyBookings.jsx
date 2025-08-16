import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import useaxiosInstance from '../../../Hooks/useAxiosInstance';
import useAuth from '../../../Hooks/useAuth';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';

const MyBookings = () => {
    const navigate = useNavigate();
    const axiosInstance = useaxiosInstance();
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();

    const [currentPage, setCurrentPage] = useState(1);
    const bookingsPerPage = 10;

    const { data: bookings = [], isLoading, refetch } = useQuery({
        queryKey: ['myBookings', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get('/bookings', {
                params: { userEmail: user.email },
            });
            return res.data;
        },
    });


    const handlePay = (id) => {
        navigate(`/deshboard/payment/${id}`);
    };

    const handleCancelBooking = async (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'This will cancel the booking by removing the assigned tour guide.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#00A99D',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, cancel it!',
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const res = await axiosInstance.patch(`/bookings/remove-guide/${id}`);
                    if (res.data.modifiedCount > 0) {
                        Swal.fire('Cancelled!', 'Your booking has been cancelled.', 'success');
                        refetch();
                    } else {
                        Swal.fire('Failed!', 'Could not cancel the booking.', 'error');
                    }
                } catch (error) {
                    Swal.fire('Error!', 'Something went wrong.', error);
                }
            }
        });
    };

    // Pagination logic
    const indexOfLastBooking = currentPage * bookingsPerPage;
    const indexOfFirstBooking = indexOfLastBooking - bookingsPerPage;
    const currentBookings = bookings.slice(indexOfFirstBooking, indexOfLastBooking);
    const totalPages = Math.ceil(bookings.length / bookingsPerPage);

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    return (
        <section>
            <title>DanaFly - Deshboard/My Bookings</title>
            <h2 className="text-3xl font-bold text-[#00A99D] mb-5">My Bookings</h2>
            <div className="overflow-x-auto rounded-lg">
                <table className="min-w-full bg-white shadow">
                    <thead>
                        <tr className="bg-[#00A99D] text-white text-left">
                            <th className="p-4">Package Name</th>
                            <th className="p-4">Tour Guide</th>
                            <th className="p-4">Tour Date</th>
                            <th className="p-4">Price</th>
                            <th className="p-4">Status</th>
                            <th className="p-4">Payment</th>
                            <th className="p-4 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentBookings.map((booking) => {
                            const isPaid = booking.paymentStatus === 'paid';
                            const isCancelled = !booking.guideEmail;

                            return (
                                <tr key={booking._id} className="border-b border-gray-300 hover:bg-gray-50">
                                    {isLoading ? (
                                        <td colSpan="8" className="text-center py-6 text-gray-500">
                                            Loading.....
                                        </td>
                                    ) : (
                                        <>
                                            <td className="p-4">{booking.packageName}</td>
                                            <td className="p-4">{booking.guideEmail || 'N/A'}</td>
                                            <td className="p-4">{booking.tourDate?.slice(0, 10)}</td>
                                            <td className="p-4">${booking.price}</td>
                                            <td className="p-4 capitalize">{booking.status}</td>
                                            <td className={`p-4 capitalize ${isPaid ? 'bg-green-300' : 'bg-red-300'}`}>
                                                {booking.paymentStatus}
                                            </td>
                                            <td className="p-4 text-center space-x-2">
                                                {isPaid ? (
                                                    <span className="text-green-600 font-semibold">Payment Complete</span>
                                                ) : isCancelled || booking.status === 'rejected' ? (
                                                    <span className="text-red-500 font-semibold">Booking Cancelled</span>
                                                ) : (
                                                    <>
                                                        <button
                                                            onClick={() => handlePay(booking._id)}
                                                            className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                                                        >
                                                            Pay
                                                        </button>
                                                        <button
                                                            onClick={() => handleCancelBooking(booking._id)}
                                                            className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                                                        >
                                                            Cancel
                                                        </button>
                                                    </>
                                                )}
                                            </td>
                                        </>
                                    )}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            {/* Pagination Footer */}
            {totalPages > 1 && (
                <div className="mt-6 flex justify-center items-center gap-2 text-sm">
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="px-3 py-1 border rounded disabled:opacity-50"
                    >
                        Prev
                    </button>
                    {Array.from({ length: totalPages }, (_, i) => (
                        <button
                            key={i + 1}
                            onClick={() => handlePageChange(i + 1)}
                            className={`px-3 py-1 border rounded ${currentPage === i + 1 ? 'bg-[#00A99D] text-white' : ''}`}
                        >
                            {i + 1}
                        </button>
                    ))}
                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="px-3 py-1 border rounded disabled:opacity-50"
                    >
                        Next
                    </button>
                </div>
            )}
        </section>
    );
};

export default MyBookings;
