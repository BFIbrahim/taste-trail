import { GiCampCookingPot, GiHotMeal } from 'react-icons/gi';
import { Link, NavLink, Outlet } from 'react-router';
import { GoGraph, GoHomeFill } from "react-icons/go";
import { MdOutlineTrackChanges } from 'react-icons/md';
import { FaBook, FaClipboardList } from 'react-icons/fa';
import { BiSolidCategory } from 'react-icons/bi';
import { FaCirclePlus } from 'react-icons/fa6';
import { useContext } from 'react';
import { AuthContext } from '../Context/AuthContext';



const DashboardLayout = () => {

    const {user} = useContext(AuthContext);

    return (
        <div>
            <div className="drawer lg:drawer-open">
                <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content">
                    <nav className="navbar w-full bg-base-200">
                        <label htmlFor="my-drawer-4" aria-label="open sidebar" className="btn btn-square btn-ghost">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="my-1.5 inline-block size-4"><path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path><path d="M9 4v16"></path><path d="M14 10l2 2l-2 2"></path></svg>
                        </label>
                        <Link className="md:text-2xl">
                            <h1 className='text-primary font-bold flex items-center gap-2'><GiCampCookingPot className='text-secondary md:text-3xl' /> TASTETRAIL</h1>
                        </Link>
                    </nav>
                    <Outlet />
                </div>

                <div className="drawer-side is-drawer-close:overflow-visible">
                    <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
                    <div className="flex min-h-full flex-col items-start bg-primary text-white is-drawer-close:w-20 is-drawer-open:w-64">
                        <ul className="menu w-full grow">
                            <li>
                                <NavLink to="/" className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Homepage">
                                    <GoHomeFill className='text-2xl' />
                                    <span className="is-drawer-close:hidden">Homepage</span>
                                </NavLink>
                            </li>

                            {
                                user?.role === 'user' && (
                                    <li>
                                        <NavLink
                                            to="/dashboard/overview"
                                            className={({ isActive }) =>
                                                `is-drawer-close:tooltip is-drawer-close:tooltip-right flex items-center gap-3 px-4  rounded-md transition ${isActive ? "bg-gray-700  text-white" : ""}`
                                            }
                                            data-tip="Overview"
                                        >
                                            <GoGraph className="text-2xl" />
                                            <span className="is-drawer-close:hidden">Overview</span>
                                        </NavLink>
                                    </li>

                                )
                            }
                            {
                                user?.role === 'user' && (
                                    <li>
                                        <NavLink
                                            to="/dashboard/mealplanner"
                                            className={({ isActive }) =>
                                                `is-drawer-close:tooltip is-drawer-close:tooltip-right flex items-center gap-3 px-4  rounded-md transition ${isActive ? "bg-gray-700 text-white" : ""}`
                                            }
                                            data-tip="Meal Planner"
                                        >
                                            <GiHotMeal className="text-2xl" />
                                            <span className="is-drawer-close:hidden">Meal Planner</span>
                                        </NavLink>
                                    </li>

                                )
                            }
                            {
                                user?.role === 'user' && (
                                    <li>
                                        <NavLink
                                            to="/dashboard/track-cooking"
                                            className={({ isActive }) =>
                                                `is-drawer-close:tooltip is-drawer-close:tooltip-right flex items-center gap-3 px-4  rounded-md transition ${isActive ? "bg-gray-700 text-white" : ""}`
                                            }
                                            data-tip="Track Cooking"
                                        >
                                            <MdOutlineTrackChanges className="text-2xl" />
                                            <span className="is-drawer-close:hidden">Track Cooking</span>
                                        </NavLink>
                                    </li>

                                )
                            }
                            {
                                user?.role === 'user' && (
                                    <li>
                                        <NavLink
                                            to="/dashboard/personal-cookbook"
                                            className={({ isActive }) =>
                                                `is-drawer-close:tooltip is-drawer-close:tooltip-right flex items-center gap-3 px-4  rounded-md transition ${isActive ? "bg-gray-700 text-white" : ""}`
                                            }
                                            data-tip="Personal Cookbook"
                                        >
                                            <FaBook className="text-2xl" />
                                            <span className="is-drawer-close:hidden">Personal Cookbook</span>
                                        </NavLink>
                                    </li>

                                )
                            }

                            {
                                user?.role === 'admin' && (
                                    <li>
                                        <NavLink
                                            to="/dashboard/add-new-recipe"
                                            className={({ isActive }) =>
                                                `is-drawer-close:tooltip is-drawer-close:tooltip-right flex items-center gap-3 px-4 rounded-md transition ${isActive ? "bg-gray-700 text-white" : ""}`
                                            }
                                            data-tip="Add new Recipe"
                                        >
                                            <FaCirclePlus className="text-2xl" />
                                            <span className="is-drawer-close:hidden">Add new Recipe</span>
                                        </NavLink>
                                    </li>

                                )
                            }

                            {
                                user?.role === 'admin' && (
                                    <li>
                                        <NavLink
                                            to="/dashboard/personal-cookbook"
                                            className={({ isActive }) =>
                                                `is-drawer-close:tooltip is-drawer-close:tooltip-right flex items-center gap-3 px-4 rounded-md transition ${isActive ? "bg-gray-700 text-white" : ""}`
                                            }
                                            data-tip="Manage recipes"
                                        >
                                            <FaClipboardList className="text-2xl" />
                                            <span className="is-drawer-close:hidden">Manage Recipes</span>
                                        </NavLink>
                                    </li>

                                )
                            }

                            {
                                user?.role === 'admin' && (
                                    <li>
                                        <NavLink
                                            to="/dashboard/manage-categories"
                                            className={({ isActive }) =>
                                                `is-drawer-close:tooltip is-drawer-close:tooltip-right flex items-center gap-3 px-4 rounded-md transition ${isActive ? "bg-gray-700 text-white" : ""}`
                                            }
                                            data-tip="Manage Category"
                                        >
                                            <BiSolidCategory className="text-2xl" />
                                            <span className="is-drawer-close:hidden">Manage Category</span>
                                        </NavLink>
                                    </li>

                                )
                            }
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;