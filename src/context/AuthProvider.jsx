
import React, { createContext, useContext, useState } from 'react'

const AuthContext = createContext();

const useAuth = () => {
    return useContext(AuthContext);
}

export default function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null);

    const signIn = () => {
        
    }


    const value = {
        currentUser: currentUser
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}
