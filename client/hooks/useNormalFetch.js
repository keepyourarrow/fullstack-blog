import { useEffect, useState } from "react";
import { useAuth } from "./useAuth";

import { normalFetch } from "../api/normalFetch";
import { fetchWithAuth } from "../api/fetchWithAuth";

import cookie from "js-cookie";

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
        // on initial load
        if (!body) {
            return;
        }
        post(body);
    }, [body]);

    const post = async (body) => {
        setLoading(true);
        try {
            console.log(fetchFunc);
            const { data } = await fetchFunc(url, type, body);
            if (data?.access_token) {
                cookie.set("access_token", data.access_token, { expires: 365 });
                delete data.access_token;
            }
            console.log(data);
            setRes(data);
            setLoading(false);
            callback?.(data);
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
