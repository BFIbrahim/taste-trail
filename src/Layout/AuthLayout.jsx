import React from 'react';
import { Link, Outlet } from 'react-router';
import { GiCampCookingPot } from "react-icons/gi";


const AuthLayout = () => {
    return (
        <div className='max-w-4xl mx-auto'>
            <div className='flex items-center justify-between mt-10 mb-10'>
                <Link to="/" className="md:text-2xl">
                    <h1 className='text-primary font-bold flex items-center gap-2'><GiCampCookingPot className='text-secondary md:text-3xl' /> TASTETRAIL</h1>
                </Link>

                <Link to="/"><button className=' btn btn-primary text-white'>Back Home</button></Link>
            </div>
            <Outlet />
        </div>
    );
};

export default AuthLayout;