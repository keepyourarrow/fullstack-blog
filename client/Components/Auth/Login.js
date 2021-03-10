import React, { useState, useEffect } from "react";

import { useNormalFetch } from "../../hooks/useNormalFetch";
import { useAuth } from "../../hooks/useAuth";

import Template from "./Template";

import styles from "./auth.module.css";

const Login = () => {
    const { login: setCookies } = useAuth();
    const [body, setBody] = useState(null);
    const [userField, setUserField] = useState("");
    const [password, setPassword] = useState("");
    const [callback, setCallback] = useState();

    const { error: authError, loading, res } = useNormalFetch({
        //custom hook to post user
        body,
        type: "post",
        url: "auth/login",
        callback,
    });

    useEffect(() => {
        if (res) {
            setPassword("");
        }
    }, [res]);

    const handleSubmit = (e) => {
        if (userField.length <= 4 || password.length <= 5) {
            return;
        }

        e.preventDefault();

        let tempUser = {
            userField,
            password,
        };

        setCallback(() => (data) => {
            setCookies(data);
        });
        setBody(tempUser);
    };

    return (
        <Template
            type="login"
            authError={authError}
            form={
                <form>
                    <div className="field-group">
                        {/* email or username*/}
                        <div className="field">
                            <label className="label" htmlFor="user-field">
                                Username or Email Address
                            </label>
                            <input
                                className="form-input"
                                type="text"
                                id="user-field"
                                name="user-field"
                                value={userField}
                                required
                                minLength={4}
                                onChange={(e) => setUserField(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="field-group">
                        {/* password */}
                        <div className="field">
                            <label className="label" htmlFor="password">
                                Password
                            </label>
                            <input
                                className="form-input"
                                type="password"
                                id="password"
                                name="password"
                                value={password}
                                required
                                minLength={5}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className={styles.submitField}>
                        <input
                            className={"btn btn-main " + styles.submitBtn}
                            type="submit"
                            onClick={handleSubmit}
                            disabled={loading}
                            value="Sign In"
                        />
                    </div>
                </form>
            }
        />
    );
};

export default Login;
