import React from "react";
import { useAuth } from "../../../hooks/useAuth";

const Logout = () => {
    const { logout } = useAuth();

    return (
        <span className="primary-hover uppercase" style={{ marginRight: "1.5rem" }}>
            <a onClick={logout}>logout</a>
        </span>
    );
};

export default Logout;
