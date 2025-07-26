import React from 'react';
import useAuth from '../../Hooks/useAuth';

const MenuProfile = () => {

    const {user}=useAuth()

    return (
        <div className=' flex flex-col items-center mt-5 gap-1'>
            <img className='w-20 h-20 object-contain' src={user?.photoURL} alt="" />
            <h1 className='text-center text-sm'>{user?.displayName}</h1>
            <h1 className='text-center text-sm'>{user?.email}</h1>
        </div>
    );
};

export default MenuProfile;