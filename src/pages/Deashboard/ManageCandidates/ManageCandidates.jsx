import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import useAxiosInstance from '../../../Hooks/useAxiosInstance';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';

const ManageCandidates = () => {
    const axiosInstance = useAxiosInstance();
    const axiosSecure = useAxiosSecure();

    const [currentPage, setCurrentPage] = useState(1);
    const candidatesPerPage = 10;

    // Fetch all applications
    const { data: candidates = [], isLoading, refetch } = useQuery({
        queryKey: ['candidates'],
        queryFn: async () => {
            const res = await axiosSecure.get('/tour-guide-applications');
            return res.data;
        },
    });

    // Accept handler
    const handleAccept = async (email) => {
        try {
            await axiosInstance.patch(`/tour-guide-applications/accept/${email}`);
            toast.success(`✅ Accepted & activated: ${email}`, { theme: 'colored' });
            refetch();
        } catch {
            toast.error('❌ Failed to accept candidate', { theme: 'colored' });
        }
    };

    // Reject handler
    const handleReject = async (email) => {
        try {
            await axiosInstance.delete(`/tour-guide-applications/${email}`);
            toast.warn(`🚫 Rejected & removed: ${email}`, { theme: 'colored' });
            refetch();
        } catch {
            toast.error('❌ Failed to reject candidate', { theme: 'colored' });
        }
    };

    // Pagination logic
    const indexOfLastCandidate = currentPage * candidatesPerPage;
    const indexOfFirstCandidate = indexOfLastCandidate - candidatesPerPage;
    const currentCandidates = candidates.slice(indexOfFirstCandidate, indexOfLastCandidate);
    const totalPages = Math.ceil(candidates.length / candidatesPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    const nextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));
    const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

    // if (isLoading) {
    //     return (
    //         <div className="text-center py-20">
    //             <span className="text-xl text-light font-semibold">Loading candidates...</span>
    //         </div>
    //     );
    // }

    return (
        <section >r
            <title>DanaFly - Deshboard/Mange Candidate</title>
            <h2 className="text-2xl font-bold text-light mb-6">Manage Tour Guide Candidates</h2>

            <div className="overflow-x-auto">
                <table className="w-full table-auto text-sm md:text-base border-collapse">
                    <thead className="cta-btn text-light">
                        <tr>
                            <th className="p-2 border">#</th>
                            <th className="p-2 border">Name</th>
                            <th className="p-2 border">Email</th>
                            <th className="p-2 border">Phone</th>
                            <th className="p-2 border">Experience</th>
                            <th className="p-2 border">Location</th>
                            <th className="p-2 border">Status</th>
                            <th className="p-2 border">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {isLoading ? (
                            <tr>
                                <td colSpan="8" className="text-center py-6 text-gray-500">
                                    Loading.....
                                </td>
                            </tr>
                        ) : currentCandidates.length > 0 ? (
                            currentCandidates.map((candidate, index) => (
                                <tr key={candidate._id} className="text-center border-t">
                                    <td className="p-2">{indexOfFirstCandidate + index + 1}</td>
                                    <td className="p-2">{candidate.name || 'N/A'}</td>
                                    <td className="p-2">{candidate.email}</td>
                                    <td className="p-2">{candidate.phone}</td>
                                    <td className="p-2">{candidate.experienceYears} yrs</td>
                                    <td className="p-2">{candidate.location}</td>
                                    <td className="p-2 capitalize">
                                        <span className={`px-2 py-1 rounded text-light text-xs ${candidate.status === 'active'
                                            ? 'bg-green-500'
                                            : candidate.status === 'pending'
                                                ? 'bg-yellow-500'
                                                : 'bg-gray-400'
                                            }`}>
                                            {candidate.status || 'unknown'}
                                        </span>
                                    </td>
                                    <td className="p-2 space-x-2">
                                        <button
                                            onClick={() => handleAccept(candidate.email)}
                                            disabled={candidate.status === 'active'}
                                            className={`px-3 py-1 rounded text-light transition ${candidate.status === 'active'
                                                ? 'bg-gray-400 cursor-not-allowed'
                                                : 'bg-green-500 hover:bg-green-600'
                                                }`}
                                        >
                                            Accept
                                        </button>
                                        <button
                                            onClick={() => handleReject(candidate.email)}
                                            className="bg-red-500 hover:bg-red-600 text-light px-3 py-1 rounded"
                                        >
                                            Reject
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="8" className="text-center py-6 text-gray-500">
                                    No candidates found.
                                </td>
                            </tr>
                        )}


                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-6 gap-2 flex-wrap">
                <button
                    onClick={prevPage}
                    disabled={currentPage === 1}
                    className="px-3 py-1 rounded cta-btn disabled:opacity-50"
                >
                    Previous
                </button>
                {Array.from({ length: totalPages }, (_, i) => (
                    <button
                        key={i + 1}
                        onClick={() => paginate(i + 1)}
                        className={`px-3 py-1 rounded ${currentPage === i + 1 ? 'cta-btn text-light' : 'bg-amber-50p1'
                            }`}
                    >
                        {i + 1}
                    </button>
                ))}
                <button
                    onClick={nextPage}
                    disabled={currentPage === totalPages}
                    className="px-3 py-1 rounded cta-btn disabled:opacity-50"
                >
                    Next
                </button>
            </div>
        </section>
    );
};

export default ManageCandidates;
