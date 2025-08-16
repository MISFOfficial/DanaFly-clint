import React from 'react';
import { FaHome, FaSignOutAlt } from 'react-icons/fa';
// import { IoInformationCircleSharp } from 'react-icons/io5';
// import { MdOutlineTravelExplore } from 'react-icons/md';
// import { RiUserCommunityLine } from 'react-icons/ri';
import { NavLink, useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import useAuth from '../../Hooks/useAuth';
import useAxiosSecure from '../../Hooks/useAxiosSecure';

const Navlink = () => {

    const { user, logOut } = useAuth()
    const navigate = useNavigate()
    const axiosSecure = useAxiosSecure()

    const handleLogOut = async () => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You will be logged out of your account!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#00A99D',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, log me out!',
            cancelButtonText: 'Cancel'
        }).then((result) => {
            if (result.isConfirmed) {
                logOut()
                    .then(async () => {
                        Swal.fire({
                            title: 'Logged out!',
                            icon: 'success',
                            text: 'You have been successfully logged out.',
                            showConfirmButton: false,
                            timer: 1500
                        });

                        await axiosSecure.post('/logout');
                        // //console.log('Token remove wor', res)

                        navigate('/login')
                    })
                    .catch((error) => {
                        Swal.fire(
                            'Error!',
                            'Something went wrong while logging out.',
                            'error'
                        );
                        console.error(error);
                    });
            }
        });
    };


    return (
        <>
            <li>
                <NavLink
                    to="/"
                    className={({ isActive }) =>
                        isActive
                            ? 'bg-[#00A99D] text-white p-2 rounded-md delay-100'
                            : 'p-2 text-[#1b130d] hover:text-[#00A99D] '
                    }
                >
                    Home
                </NavLink>
            </li>
            <li>
                <NavLink
                    to="/community"
                    className={({ isActive }) =>
                        isActive
                            ? 'bg-[#00A99D] text-white p-2 rounded-md'
                            : 'p-2 text-[#1b130d] hover:text-[#00A99D]'
                    }
                > 
                    Community
                </NavLink>
            </li>
            <li>
                <NavLink
                    to="/trips"
                    className={({ isActive }) =>
                        isActive
                            ? 'bg-[#00A99D] text-white p-2 rounded-md'
                            : 'p-2 text-[#1b130d] hover:text-[#00A99D]'
                    }
                > 
                    Trips
                </NavLink>
            </li>
            <li>
                <NavLink
                    to="/about"
                    className={({ isActive }) =>
                        isActive
                            ? 'bg-[#00A99D] text-white p-2 rounded-md'
                            : 'p-2 text-[#1b130d] hover:text-[#00A99D]'
                    }
                >
                   
                    About Us
                </NavLink>
            </li>
            {user &&
                <ul className='lg:hidden'>
                    <div className='divider mb-0'></div>
                    <li>
                        <NavLink
                            to="/deshboard"
                            className={({ isActive }) =>
                                isActive
                                    ? 'bg-[#00A99D] text-white p-2 rounded-md'
                                    : 'p-2 text-[#1b130d] hover:text-[#00A99D]'
                            }
                        >
                            Deshboard
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/*"
                            className={({ isActive }) =>
                                isActive
                                    ? 'bg-[#00A99D] text-white p-2 rounded-md'
                                    : 'p-2 text-[#1b130d] hover:text-[#00A99D]'
                            }
                        >
                            Offer Announcement
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/*"
                            className={({ isActive }) =>
                                isActive
                                    ? 'bg-[#00A99D] text-white p-2 rounded-md'
                                    : 'p-2 text-[#1b130d] hover:text-[#00A99D]'
                            }
                        >
                            Setting
                        </NavLink>
                    </li>
                    <li onClick={handleLogOut}>
                        <div className='flex items-center gap-2 cursor-pointer text-red-600 hover:text-red-800'>
                            <span ><FaSignOutAlt /></span>
                            <span>Log Out</span>
                        </div>
                    </li>
                </ul>
            }
        </>
    );
};

export default Navlink;
