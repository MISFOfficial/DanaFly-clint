import React from 'react';
import { HiMenuAlt3 } from 'react-icons/hi';
import SignInBtn from '../Buttons/SignInBtn';
import Logo from './Logo';
import Navlink from './NavLink';
import useAuth from '../../Hooks/useAuth';
import Logout from '../Buttons/Logout';
import MenuProfile from './MenuProfile';

const Menu = () => {
    const {user}=useAuth()
    return (
        <div className="drawer  w-fit lg:hidden z-[100]">
            <input id="my-drawer" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
                {/* Page content here */}
                <label htmlFor="my-drawer" className="bg-[#00A99D] btn btn-primary drawer-button border-none"><HiMenuAlt3></HiMenuAlt3></label>
            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="menu bg-base-200 text-base-content min-h-full w-70 md:w-80 p-4">
                    {/* Sidebar content here */}
                    <div className='flex items-end sticky  top-5 z-999'>
                        <Logo></Logo>
                    </div>

                    {user && <MenuProfile></MenuProfile>}

                    <div className='my-5'>
                        <Navlink></Navlink>
                    </div>
                    {!user && <SignInBtn></SignInBtn>}
                </ul>
            </div>
        </div>
    );
};

export default Menu;