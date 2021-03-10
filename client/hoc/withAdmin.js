import { useEffect, useState } from "react";
import Router from "next/router";
import { useAuth } from "../hooks/useAuth";

// for normal users
export const withAdmin = (WrappedComponent) => {
    const AdminWrapper = (props) => {
        const { user, accessToken, isAdmin, setHasPermission } = useAuth();

        // if (process.browser && !accessToken && (!user || !isAdmin())) {
        //     Router.push("/");
        // }

        // only runs on browser
        useEffect(() => {
            // if access token exists, we are logged in
            if (accessToken) {
                // wait for user to be fetched
                if (user) {
                    if (!isAdmin()) {
                        return Router.push("/");
                        console.log("DENIED");
                    } else {
                        setHasPermission(true);
                        console.log("PERMITTED");
                    }
                }
            }
            if (!accessToken) {
                return Router.push("/");
            }
        }, [user]);

        return <WrappedComponent {...props} />;
    };

    return AdminWrapper;
};
