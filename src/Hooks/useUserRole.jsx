// useAdmin.js
import React from 'react';
import useAuth from './useAuth';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from './useAxiosSecure';

const useUserRole = () => {
    const { user, loading } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: role, isLoading: roleLoading, refetch } = useQuery({
        queryKey: ['role', user?.email],
        enabled: !!user?.email && !loading, // only run if user is logged in
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/role/${user.email}`);
            // //console.log(res)
            return res.data?.role; 
        }
    });

    

    return {role, roleLoading, loading, user, refetch};
};

export default useUserRole;
