import React from 'react';
import useAuth from '../Hooks/useAuth';
import Loder from '../pages/Loader/Loder';
import { Navigate, useLocation } from 'react-router';

const PrivetRoute = ({children}) => {
    const { loader, user } = useAuth()
    const location = useLocation()
    // //console.log(location)

    if (loader) {
        return <Loder></Loder>
    }

    if (!user) {
        return <Navigate to='/login' state={{ from: location }} replace></Navigate>
    }
    return children
};

export default PrivetRoute;