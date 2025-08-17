import React from 'react';
import useAuth from '../../Hooks/useAuth';
import Logout from '../Buttons/Logout';
import { FaBullhorn, FaCog, FaSignOutAlt, FaTachometerAlt } from 'react-icons/fa';
import { RiProfileLine } from 'react-icons/ri';
import { GiCaptainHatProfile } from 'react-icons/gi';
import Swal from 'sweetalert2';
import { Link, useNavigate } from 'react-router';
// import useAxiosInstance from '../../Hooks/useAxiosInstance';
import useAxiosSecure from '../../Hooks/useAxiosSecure';

const Profile = () => {
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
        <div className="dropdown dropdown-end ">
            <img tabIndex={0} role="button" className='object-cover h-13 w-13 rounded-full cursor-pointer' src={user.photoURL} alt="" />
            <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-1 w-50 md:w-80 p-4 shadow-sm mt-8 space-y-5 border-y-4 border-[#00A99D] ">
                <div className=' rounded-lg shadow-lg bg-[#00A99D] flex flex-col justify-center items-center p-3'>
                    <img className='w-15 h-15 object-cover rounded-full cursor-pointer' src={user.photoURL} alt="" />
                    <h1 className='mt-3 text-light text-center'>{user.displayName}</h1>
                    <p className='text-light text-center'>{user.email}</p>
                </div>
                <ul className=' flex flex-col gap-1.5'>

                    <Link to='/deshboard'>
                        <li>
                            <div className='flex items-center gap-2'>
                                <span className='text-xl text-gray-600'><GiCaptainHatProfile /></span>
                                <span>Dashboard</span>
                            </div>
                        </li>
                    </Link>

                    <li>
                        <div className='flex items-center gap-2'>
                            <span className='text-xl text-gray-600'><FaBullhorn /></span>
                            <span>Offer Announcements</span>
                        </div>
                    </li>

                    <li>
                        <div className='flex items-center gap-2'>
                            <span className='text-xl text-gray-600'><FaCog /></span>
                            <span>Setting</span>
                        </div>
                    </li>

                    <li onClick={handleLogOut}>
                        <div className='flex items-center gap-2 cursor-pointer text-red-600 hover:text-red-800'>
                            <span className='text-xl'><FaSignOutAlt /></span>
                            <span>Log Out</span>
                        </div>
                    </li>
                </ul>
            </ul>
        </div>
    );
};

export default Profile;