import { useEffect, useState } from "react";

import { normalFetch } from "../api/normalFetch";

export const useFetchWithParam = ({ param = null, type, url, callback }) => {
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [res, setRes] = useState(null);

    useEffect(() => {
        // on initial load
        if (!param) {
            return;
        }
        fetch(param);
    }, [param]);

    const fetch = async (param) => {
        setLoading(true);
        try {
            const { data } = await normalFetch(url + param, type);
            setRes(data);
            setLoading(false);
            setError("");
            callback();
        } catch (err) {
            setLoading(false);
            setError(err?.response?.data);
            callback(err);
        }
    };

    return { error, loading, res };
};
