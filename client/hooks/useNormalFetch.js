import { useEffect, useState } from "react";
import { useAuth } from "./useAuth";

import { normalFetch } from "../api/normalFetch";
import { fetchWithAuth } from "../api/fetchWithAuth";

import cookie from "js-cookie";

/**
 *
 * @param body required (send null initially and update it through state when you want to use fetch)
 * @param type required (string like 'body)
 * @param url = comments (no slash) or auth/login
 * @param withAuth (optional) if you want to force withAuth option
 * @param callback (what to perform after fetch completes)
 * @returns res (what we get from the server), error (potential), loading(status)
 *
 * @example
 * const {
        error: serverError,
        loading,
        res,
    } = useNormalFetch({
        //custom hook to post
        body: submittedForm,
        type: apiType,
        url: "comments",
    });
 */
export const useNormalFetch = ({
    body = null,
    type,
    url,
    withAuth = false,
    callback /*optional */,
}) => {
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const { setNotification } = useAuth();
    const [res, setRes] = useState(null);

    const fetchFunc = withAuth ? fetchWithAuth : normalFetch;

    useEffect(() => {
        console.log("!!! useNormalFetch", { body, url });
        // on initial load
        if (!body) {
            return;
        }
        post(body);
    }, [body]);

    const post = async (body) => {
        setLoading(true);
        try {
            const { data } = await fetchFunc(url, type, body);
            if (!url.includes("login") && data?.access_token) {
                cookie.set("access_token", data.access_token, { expires: 365 });
                delete data.access_token;
            }
            console.log(data, "useNORMALFETCH");
            setRes(data);
            setLoading(false);
            callback?.(data); //optional
        } catch (err) {
            console.log(err, "ERRRORRR");
            if (err?.response?.status == 401) {
                setNotification({ type: error, message: "You are not authorized" });
            } else if (err?.response?.status == 403) {
                setNotification({ type: error, message: "You are forbidden from viewing this" });
            }
            setLoading(false);
            console.log(err?.response?.data);
            setError(err?.response?.data);
        }
    };

    return { error, loading, res };
};
