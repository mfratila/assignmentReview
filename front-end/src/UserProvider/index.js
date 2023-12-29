import React, { useContext, useReducer } from 'react'
import { useLocalState } from '../util/useLocalStorage'

const UserContext = React.createContext();


const UserProvider = ({ children }) => {
    const [jwt, setJwt] = useLocalState("", "jwt");

    const value = { jwt, setJwt };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
};

function useUser() {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error('useUser must be used within a UserProvider')
    }
    return context;
};

export { UserProvider, useUser }; 