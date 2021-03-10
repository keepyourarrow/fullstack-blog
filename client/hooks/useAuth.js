import { useContext } from "react";
import { UserContext } from "../pages/_app";

// you dont have to do this, but it's neater if we'd want more things in context later

export const useAuth = () => {
    const {
        user,
        accessToken,
        refreshToken,
        login,
        logout,
        setUser,
        isAdmin,
        hasPermission,
        setHasPermission,
        notification,
        setNotification,
    } = useContext(UserContext);
    return {
        user,
        accessToken,
        refreshToken,
        login,
        logout,
        setUser,
        isAdmin,
        hasPermission,
        setHasPermission,
        notification,
        setNotification,
    };
};
