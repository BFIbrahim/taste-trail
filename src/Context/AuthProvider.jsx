import React from 'react';
import { AuthContext } from './AuthContext';
import { useCurrentUser } from '../Hooks/useCurrentUser';

const AuthProvider = ({ children }) => {
    const { data: user, isLoading, refetch } = useCurrentUser();

    const authInfo = {
        user,            // current logged-in user
        loading: isLoading,
        refetchUser: refetch, // manually refetch if token changes
    };

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
