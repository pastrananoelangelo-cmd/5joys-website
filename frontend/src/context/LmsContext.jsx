import React, {
    createContext,
    useContext,
    useMemo,
    useState,
} from "react";

import {
    login as apiLogin,
    logout as apiLogout,
    getStoredUser,
} from "../services/lms/authService";

const LmsContext = createContext(null);

export function LmsProvider({ children }) {
    const [currentUser, setCurrentUser] =
        useState(getStoredUser());

    const login = async (
        employeeNumber,
        password
    ) => {
        const result = await apiLogin(
            employeeNumber,
            password
        );

        const user = {
            employeeNumber: result.employeeNumber,
            role: result.role,
        };

        localStorage.setItem(
            "lms_token",
            result.token
        );

        localStorage.setItem(
            "lms_user",
            JSON.stringify(user)
        );

        setCurrentUser(user);

        return user;
    };

    const logout = () => {
        apiLogout();
        setCurrentUser(null);
    };

    const value = useMemo(
        () => ({
            currentUser,
            login,
            logout,
        }),
        [currentUser]
    );

    return (
        <LmsContext.Provider value={value}>
            {children}
        </LmsContext.Provider>
    );
}

export function useLms() {
    const ctx = useContext(LmsContext);

    if (!ctx) {
        throw new Error(
            "useLms must be used within LmsProvider"
        );
    }

    return ctx;
}