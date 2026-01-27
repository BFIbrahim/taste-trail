import React from 'react';
import { Link, NavLink } from 'react-router';
import { GiCampCookingPot } from "react-icons/gi";


const Navbar = () => {

    const user = true

    const navLinks = <>
        <li><NavLink>Home</NavLink></li>
        <li><NavLink to='/recipes'>All recipies</NavLink></li>
        <li><NavLink>Dashboard</NavLink></li>
    </>

    return (
        <div>
            <div className="navbar">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                        </div>
                        <ul
                            tabIndex="-1"
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                            {navLinks}
                        </ul>
                    </div>
                    <Link className="md:text-2xl">
                        <h1 className='text-primary font-bold flex items-center gap-2'><GiCampCookingPot className='text-secondary md:text-3xl'/> TASTETRAIL</h1>
                    </Link>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {navLinks}
                    </ul>
                </div>
                <div className="navbar-end">
                    {
                        user && <Link className="btn btn-primary border-none text-white">Logout</Link>
                    }
                </div>
            </div>
        </div>
    );
};

export default Navbar;