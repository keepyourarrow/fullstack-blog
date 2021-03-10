import { useEffect, useState } from "react";
import cookie from "js-cookie";
import useSWR from "swr";
import Router, { useRouter } from "next/router";
import { useAuth } from "../hooks/useAuth";

// for normal users
export const withUser = (WrappedComponent) => {
    const Wrapper = (props) => {
        const { user, login } = useAuth();
        const router = useRouter();

        console.log(router);
        console.log(user?.userName);

        // if (user.userName) {
        // }
        //    useEffect(() => {
        //       const redir = getRedirectTo()
        //       if (cookieToken && cookieUserId) {
        //         setToken(cookieToken)
        //         setUserId(cookieUserId)
        //         setShouldGetUser(true)
        //       } else {
        //         Router.replace(`/login?r=${redir.pathname + encodeURIComponent(redir.search)}`, '/login', { shallow: true })
        //       }
        //    }, [shouldGetUser])

        return <WrappedComponent {...props} />;
    };

    return Wrapper;
};
