import Router, { useRouter } from "next/router";
import { useState, useEffect, createContext } from "react";
import useSWR from "swr";
import { getSingleUser } from "../api/user";
import cookie from "js-cookie";
import jwt_decode from "jwt-decode";

// import cookie from 'js-cookie'
import DefaultLayout from "../Components/Layout/DefaultLayout";
import AdminLayout from "../Components/Layout/Admin/Layout";

import "../styles/globals.css";

export const UserContext = createContext();

function MyApp({ Component, pageProps }) {
    const router = useRouter();

    // get the token from the cookie

    const [accessToken, setAccessToken] = useState(cookie.get("access_token"));
    const [refreshToken, setRefreshToken] = useState(cookie.get("refresh_token"));
    const [user, setUser] = useState();
    const [hasPermission, setHasPermission] = useState(false); // withUser withAdmin

    const [notification, setNotification] = useState(false); // for styling

    const { data: fetchedUser } = useSWR(
        accessToken ? [`/api/user/${jwt_decode(accessToken).userId}`] : null,
        getSingleUser,
        { revalidateOnFocus: false }
    );

    useEffect(() => {
        console.log(fetchedUser, "fetchedUser _app.js");
        if (fetchedUser) {
            setUser(fetchedUser.data);
        }
    }, [fetchedUser]);

    useEffect(() => {}, [accessToken, refreshToken]);

    const login = (token) => {
        // save the token from the login response in a cookie
        const in45Minutes = new Date(new Date().getTime() + 45 * 60 * 1000);
        cookie.set("access_token", token.access_token, { expires: 365 });
        cookie.set("refresh_token", token.refresh_token, { expires: 365 });
        setAccessToken(token.access_token);
        setRefreshToken(token.refresh_token);

        setUser(jwt_decode(token.access_token));
        Router.push("/");
    };

    const logout = () => {
        setUser(null);
        cookie.remove("access_token");
        cookie.remove("refresh_token");
    };

    const isAdmin = () => {
        if (user) return user.role === "ADMIN";

        return false;
    };

    const checkAccessToken = (data) => {
        if (data?.data?.access_token) {
            cookie.set("access_token", data.access_token, { expires: 365 });
            delete data.access_token;
        }
        return data;
    };

    let components = (
        <DefaultLayout>
            <Component {...pageProps} />
        </DefaultLayout>
    );

    if (router.pathname.includes("dashboard")) {
        components = (
            <AdminLayout>
                <Component {...pageProps} />
            </AdminLayout>
        );
    } else if (router.pathname.includes("auth")) {
        components = <Component {...pageProps} />;
    }

    return (
        <UserContext.Provider
            value={{
                user,
                accessToken,
                refreshToken,
                login,
                logout,
                setUser,
                isAdmin,
                checkAccessToken,
                hasPermission,
                setHasPermission,
                notification,
                setNotification,
            }}
        >
            {components}
        </UserContext.Provider>
    );
}

export default MyApp;

// custom functions

/*
 the point of this function is to not cause an error
"cannot replace of undefined" when it fetches
*/
const getToken = (accessToken) => {
    return accessToken !== "undefined" ? jwt_decode(accessToken).userId : "";
};
