import React, { useContext } from 'react';
import { AuthContext } from '../Context/AuthContext';
import { Navigate, useLocation } from 'react-router';
import Loading from '../Components/Loading';

const PrivetRoute = ({ children }) => {

    const { user, loading } = useContext(AuthContext);
    const location = useLocation();


    if (loading) {
        return <Loading />
    }

    if (!user) {
        return (
            <Navigate
                to="/auth/login"
                state={{ from: location.pathname }}
                replace
            />
        );
    }

    return children
};

export default PrivetRoute;