import React from 'react';
import useAuth from '../Hooks/useAuth';
import useUserRole from '../Hooks/useUserRole';
import { Navigate, useLocation } from 'react-router';
import Loder from '../pages/Loader/Loder';

const AdminRoute = ({ children }) => {

    const { user, loader } = useAuth()
    const { role , roleLoading } = useUserRole()

    //console.log(role)

    const location = useLocation()

    if (loader || roleLoading) {
        return <Loder></Loder>
    }

    if (!user || role !== 'admin' ) {
        return <Navigate to='/forbidden' state={{ from: location }} replace></Navigate>
    }
    return children
};

export default AdminRoute;