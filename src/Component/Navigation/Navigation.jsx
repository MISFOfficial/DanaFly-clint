import React from 'react';
import { Link, NavLink } from 'react-router';
import SignInBtn from '../Buttons/SignInBtn';
import Menu from './Menu';
import Logo from './Logo';
import useAuth from '../../Hooks/useAuth';
import Profile from './Profile';
import Navlink from './Navlink';

const Navigation = () => {

    const { user } = useAuth()

    // //console.log(user)

    return (
        <div className='flex justify-between items-center py-2 px-3 md:px-20  sticky top-0 z-1000 bg-white shadow-md'>

            <Logo></Logo>
            
            <div className='hidden lg:flex items-center gap-10'>
                <ul className='flex gap-3 text-md'>
                    <Navlink></Navlink>
                </ul>

                {user ? <div className='w-13 h-13 '>
                    <Profile></Profile>
                    {/* <Logout></Logout> */}
                </div> : <SignInBtn></SignInBtn>}
            </div>
            <Menu></Menu>

        </div>
    );
};

export default Navigation;