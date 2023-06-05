import React, { createContext, useContext, useEffect, useReducer } from 'react'
import auth from '@react-native-firebase/auth'


const AuthContext = createContext()
const initialState = { isAuthenticated: false }
const reducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            return { isAuthenticated: true, user: action.payload.user }
        case 'LOGOUT':
            return { isAuthenticated: false }
        default:
            return state;
    }
}
export function AuthContextProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, initialState)

    useEffect(() => {
        auth().onAuthStateChanged(user => {
            if (user) {
                dispatch({ type: 'LOGIN', payload: { user: user } })
            } else {
                dispatch({ type: 'LOGOUT' })
            }
        })
    }, [])
    return (
        <AuthContext.Provider value={{ ...state, dispatch }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext)
} 