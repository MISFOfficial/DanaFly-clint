import React from 'react';
import { Link } from 'react-router';

const SignInBtn = () => {
    return (
        <div>
            <Link to='/login'><button className='border-4 border-[#00A99D] bg-[#00A99D] text-white px-5 py-2 cursor-pointer rounded-3xl '>Login</button></Link>
        </div>
    );
};

export default SignInBtn;