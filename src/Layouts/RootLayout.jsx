import React from 'react';
import { Outlet } from 'react-router';
import Footer from '../Component/Footer/Footer';
import useAuth from '../Hooks/useAuth';
import Loder from '../pages/Loader/Loder';
import Navigation from '../Component/Navigation/Navigation';

const RootLayout = () => {

    const {loader}=useAuth('')

    if(loader){
        return <Loder></Loder>
    }

    return (
        <div className='flex flex-col'>
            <Navigation></Navigation>
            <div className=''>
                <Outlet></Outlet>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default RootLayout;