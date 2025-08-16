import React from 'react';
import Swal from 'sweetalert2';
import useAuth from '../../Hooks/useAuth';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
// import useAxiosSecure from '../../Hooks/useAxiosSecure';
// import useAxiosInstance from '../../Hooks/useAxiosInstance';
import { useNavigate } from 'react-router';

const Logout = () => {
    const { logOut } = useAuth()
    // const axiosInstance=useAxiosInstance()
    const axiosSecure = useAxiosSecure()

    const navigate = useNavigate()

    const handleLogOut = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You will be logged out of your account!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#00A99D',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, log me out!',
            cancelButtonText: 'Cancel'
        }).then(async (result) => {
            if (result.isConfirmed) {
                logOut()
                    .then(async () => {
                        await axiosSecure.post('/logout'); 
                        Swal.fire({
                            title: 'Logged out!',
                            icon: 'success',
                            text: 'You have been successfully logged out.',
                            showConfirmButton: false,
                            timer: 1500
                        });

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
            <button onClick={handleLogOut} className='border-4 border-[#00A99D] bg-[#00A99D] text-white px-5 py-2 cursor-pointer'>Log Out</button>
        </div>
    );
};

export default Logout;