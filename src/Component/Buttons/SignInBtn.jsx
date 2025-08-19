import React from 'react';
import { Link } from 'react-router';

const SignInBtn = () => {
    return (
        <div>
            <Link to='/login'><button className=' cta-btn text-light px-5 py-2 cursor-pointer rounded-3xl '>Login</button></Link>
        </div>
    );
};

export default SignInBtn;