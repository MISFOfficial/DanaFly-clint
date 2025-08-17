import React, { useState } from 'react';
import Select from 'react-select';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';

const roleOptions = [
    { value: '', label: 'All Roles' },
    { value: 'admin', label: 'Admin' },
    { value: 'tour-guide', label: 'Tour Guide' },
    { value: 'user', label: 'User' },
];

const ManageUsers = () => {
    const axiosSecure = useAxiosSecure();
    const [searchText, setSearchText] = useState('');
    const [selectedRole, setSelectedRole] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 10;

    const { data: users = [], refetch, isLoading } = useQuery({
        queryKey: ['users', searchText, selectedRole],
        queryFn: async () => {
            const roleQuery = selectedRole ? `role=${selectedRole}` : '';
            const searchQuery = searchText ? `search=${searchText}` : '';
            const queryStr = [roleQuery, searchQuery].filter(Boolean).join('&');
            const res = await axiosSecure.get(`/filter-users?${queryStr}`);
            return res.data;
        },
    });

    const handleSearch = (e) => {
        setSearchText(e.target.value);
        setCurrentPage(1);
        refetch();
    };

    const handleRoleChange = (option) => {
        setSelectedRole(option?.value || '');
        setCurrentPage(1);
        refetch();
    };

    // Pagination logic
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
    const totalPages = Math.ceil(users.length / usersPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    const nextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));
    const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

    return (
        <div>
            <h2 className="text-2xl font-semibold mb-4 text-light">Manage Users</h2>

            <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <input
                    type="text"
                    placeholder="Search by name or email"
                    className="border border-gray-300 px-4 py-2 rounded w-full sm:w-1/2"
                    value={searchText}
                    onChange={handleSearch}
                />
                <div className="w-full sm:w-1/3">
                    <Select
                        options={roleOptions}
                        onChange={handleRoleChange}
                        isClearable
                        placeholder="Filter by role"
                    />
                </div>
            </div>

            <div className="overflow-x-auto rounded-lg">
                <table className="w-full border border-gray-200 rounded shadow-sm">
                    <thead className="bg-[#00A99D] text-light">
                        <tr>
                            <th className="p-4 border">#</th>
                            <th className="p-4 border">Name</th>
                            <th className="p-4 border">Email</th>
                            <th className="p-4 border">Image</th>
                            <th className="p-4 border">Role</th>
                        </tr>
                    </thead>
                    <tbody>
                        {isLoading ? (
                            <tr>
                                <td colSpan="5" className="text-center py-6">Loading...</td>
                            </tr>
                        ) : currentUsers.length === 0 ? (
                            <tr>
                                <td colSpan="5" className="text-center py-6 text-gray-500">No users found</td>
                            </tr>
                        ) : (
                            currentUsers.map((user, index) => (
                                <tr key={user._id} className='border-b border-gray-300'>
                                    <td className="p-4 text-center">{indexOfFirstUser + index + 1}</td>
                                    <td className="p-4">{user.name}</td>
                                    <td className="p-4">{user.email}</td>
                                    <td className="p-4 text-center">
                                        <img
                                            src={user.photoURL || 'https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png'}
                                            alt="user"
                                            className="w-12 h-12 rounded-full object-cover mx-auto"
                                        />
                                    </td>
                                    <td className="p-2 text-center capitalize">
                                        {user.role || 'Tourist'}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-6 gap-2 flex-wrap">
                <button
                    onClick={prevPage}
                    disabled={currentPage === 1}
                    className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
                >
                    Previous
                </button>
                {Array.from({ length: totalPages }, (_, i) => (
                    <button
                        key={i + 1}
                        onClick={() => paginate(i + 1)}
                        className={`px-3 py-1 rounded ${currentPage === i + 1 ? 'bg-[#00A99D] text-light' : 'bg-gray-100 hover:bg-gray-300'}`}
                    >
                        {i + 1}
                    </button>
                ))}
                <button
                    onClick={nextPage}
                    disabled={currentPage === totalPages}
                    className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default ManageUsers;
