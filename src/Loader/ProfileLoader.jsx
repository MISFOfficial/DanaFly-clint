import React from 'react';
import { FaUserEdit } from 'react-icons/fa';
import { MdEmail, MdOutlineVerifiedUser } from 'react-icons/md';

const ProfileLoader = () => {
    return (

        <div className=' p-4 md:p-12'>
             <h2 className="text-3xl font-bold  text-transparent mb-5 bg-gray-200 rounded-lg ">Welcome, 👋 </h2>
            <div className="bg-white shadow rounded-lg p-6 space-y-6 animate-pulse">
                <div className="flex flex-col md:flex-row items-center gap-6">
                    <img
                        src='https://www.iprcenter.gov/image-repository/blank-profile-picture.png/@@images/image.png'
                        alt="Profile"
                        className="w-28 h-28 rounded-full border-4 border-[#00A99D] object-cover "
                    />
                    <div className="space-y-2">
                        <h3 className="text-xl font-semibold flex items-center gap-2">
                            <FaUserEdit className="text-[#00A99D]" /> <span className='bg-gray-200 px-7 rounded-lg text-transparent '>none</span>
                        </h3>
                        <p className="text-gray-600 flex items-center gap-2">
                            <MdEmail className="text-[#00A99D]" /> <span className='bg-gray-200 px- rounded-lg text-transparent '>muksitul44@gmail.com</span>
                        </p>
                        <p className="text-gray-600 flex items-center gap-2">
                            <MdOutlineVerifiedUser className="text-[#00A99D]" /> <span className='bg-gray-200 px-7 rounded-lg text-transparent '>none</span>
                        </p>
                    </div>
                </div>

                <div className="flex gap-4 ">
                    <button
                        className="bg-[#00A99D]  px-5 py-2 rounded hover:bg-[#00796b] transition w-full md:w-fit text-transparent "
                    >
                        Edit Profile
                    </button>
                    <button

                        className="bg-white border border-[#00A99D] text-transparent px-5 py-2 rounded hover:bg-[#00A99D] hover:text-white transition w-full md:w-fit "
                    >
                        Apply For Tour Guide
                    </button>
                </div>
            </div>
        </div>

    );
};

export default ProfileLoader;