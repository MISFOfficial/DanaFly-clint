import React from 'react';
import { Link, Outlet, useNavigate } from 'react-router';
import Logo from '../Component/Navigation/Logo';
import { FaBoxOpen, FaHistory, FaHome, FaSearchLocation, FaSignOutAlt, FaUserEdit } from 'react-icons/fa';
import { IoSettings } from "react-icons/io5";
import { useQuery } from '@tanstack/react-query';
import useAuth from '../Hooks/useAuth';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import Loder from '../pages/Loader/Loder';
import Swal from 'sweetalert2';

const DeshboardLayout = () => {

    const { user, logOut } = useAuth()
    const axiosSecure = useAxiosSecure()

    const navigate = useNavigate()

    const { data: role = '' } = useQuery({
        queryKey: ['user-role', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/role/${user.email}`);
            return res.data.role;
        },
    });

    //console.log(role)
    // if(isLoading){
    //     return <Loder></Loder>
    // }
  

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
        <div>
            <title>DanaFly - Deshboard/Profile</title>
            <div className="drawer lg:drawer-open">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col ">
                    {/* Page content here */}
                    <div className="navbar bg-base-300 w-full lg:hidden">
                        <div className="flex items-center">
                            <label htmlFor="my-drawer-2" aria-label="open sidebar" className="btn btn-square btn-ghost">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    className="inline-block h-6 w-6 stroke-current"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    ></path>
                                </svg>
                            </label>
                            <div className="mx-2 flex-1 px-2">Deshboard</div>
                        </div>
                    </div>


                    <div className='p-4 md:p-12 min-h-screen '>
                        <Outlet></Outlet>
                    </div>

                </div>
                <div className="drawer-side">
                    <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                    <div className='min-h-full bg-[#d8d8d8] text-base-content w-60 md:w-80  flex flex-col items-start justify-between'>
                        <ul className="menu  p-4">
                            {/* Sidebar content here */}
                            <Link to='/' className='w-fit mb-5 md:mb-10'><Logo></Logo></Link>
                            <li>
                                <Link to='/deshboard' className="flex items-center gap-2">
                                    <FaHome /> Manage Profile
                                </Link>
                            </li>
                            {role === 'user' &&
                                <li>
                                    <Link to='/deshboard/myBookings' className="flex items-center gap-2">
                                        <FaBoxOpen /> My Booking
                                    </Link>
                                </li>
                            }
                            {(role === 'tour-guide' || role === 'user') &&
                                <>
                                    <li>
                                        <Link to='/deshboard/addStory' className="flex items-center gap-2">
                                            <FaHistory /> Add Story
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to='/deshboard/mangeStories' className="flex items-center gap-2">
                                            <FaSearchLocation /> Mange Stories
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to='/deshboard/asTourGuide' className="flex items-center gap-2">
                                            <FaSearchLocation /> Join as a Tour Guide
                                        </Link>
                                    </li>
                                </>

                            }
                            {role === 'tour-guide' &&
                                <li>
                                    <Link to='/deshboard/myAssignedTours' className="flex items-center gap-2">
                                        <FaUserEdit /> My Assigned Tours
                                    </Link>
                                </li>
                            }

                            {role === 'admin' &&
                                <>
                                    <li>
                                        <Link to='/deshboard/added-packge' className="flex items-center gap-2">
                                            <FaUserEdit /> Add Package
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to='/deshboard/manageUsers' className="flex items-center gap-2">
                                            <FaUserEdit /> Manage Users
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to='/deshboard/manageCandidates' className="flex items-center gap-2">
                                            <FaUserEdit /> Manage Candidates
                                        </Link>
                                    </li>
                                </>
                            }
                        </ul>

                        <div className='w-full mb-5 md:mb-10'>
                            <div className='divider w-full  m-0'></div>
                            <ul className='menu p-4'>
                                <li>
                                    <Link to='/deshboard' className="flex items-center gap-2">
                                        <span><IoSettings /></span> Setting
                                    </Link>
                                </li>
                                <li onClick={handleLogOut}>
                                    <div className='flex items-center gap-2 cursor-pointer text-red-600 hover:text-red-800'>
                                        <span><FaSignOutAlt /></span>
                                        <span>Log Out</span>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DeshboardLayout;