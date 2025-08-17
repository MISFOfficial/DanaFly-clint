import React from 'react';
import { FaSignOutAlt } from 'react-icons/fa';

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
            <li className='text-[18px]'>
                <NavLink
                    to="/"
                    className={({ isActive }) =>
                        isActive
                            ? 'cta-btn text-light p-2 rounded-md delay-100'
                            : 'p-2 text-light hover:text-light '
                    }
                >
                    Home
                </NavLink>
            </li>
            <li  className='text-[18px]'>
                <NavLink
                    to="/community"
                    className={({ isActive }) =>
                        isActive
                            ? 'cta-btn text-light p-2 rounded-md'
                            : 'p-2 text-light hover:text-light'
                    }
                > 
                    Community
                </NavLink>
            </li>
            <li className='text-[18px]'>
                <NavLink
                    to="/trips"
                    className={({ isActive }) =>
                        isActive
                            ? 'cta-btn text-light p-2 rounded-md'
                            : 'p-2 text-light hover:text-light'
                    }
                > 
                    Trips
                </NavLink>
            </li>
            <li className='text-[18px]'>
                <NavLink
                    to="/about"
                    className={({ isActive }) =>
                        isActive
                            ? 'cta-btn text-light p-2 rounded-md'
                            : 'p-2 text-light hover:text-light'
                    }
                >
                   
                    About Us
                </NavLink>
            </li>

            {/* small device */}
            {user &&
                <ul className='lg:hidden'>
                    <div className='divider mb-0'></div>
                    <li >
                        <NavLink
                            to="/deshboard"
                            className={({ isActive }) =>
                                isActive
                                    ? 'cta-btn text-light p-2 rounded-md'
                                    : 'p-2 text-light hover:text-light'
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
                                    ? 'cta-btn text-light p-2 rounded-md'
                                    : 'p-2 text-light hover:text-light'
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
                                    ? 'cta-btn text-light p-2 rounded-md'
                                    : 'p-2 text-light hover:text-light'
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
