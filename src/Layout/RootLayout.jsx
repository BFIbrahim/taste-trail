import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../Shared/Navbar';

const RootLayout = () => {
    return (
        <div className='max-w-6xl mx-auto'>
            <Navbar></Navbar>
            <Outlet></Outlet>
        </div>
    );
};

export default RootLayout;