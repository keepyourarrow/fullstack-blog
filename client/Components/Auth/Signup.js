import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";

import Template from "./Template";
import Confirm from "./Confirm";

import { passwordStrengthChecker, strengthBar } from "./passwordValidator";
import { useNormalFetch } from "../../hooks/useNormalFetch";

import styles from "../../styles/auth.module.css";

const Signup = () => {
    const { handleSubmit, register, errors, watch, setValue } = useForm();
    //#region state
    const [body, setBody] = useState(null);

    //confirm state that will trigger when we register our user
    const [confirm, setConfirm] = useState(false);
    //#endregion

    /* #region  password strength and password matching */
    const [psw, setPsw] = useState(""); // onChange password cause getValues['password'] from useForm creates a shitty endless loop
    const [passwordStrengthValue, setPasswordStrengthValue] = useState(""); //for suggestion
    const [bar, setBar] = useState(); // password strength bar
    // check if the passwords match
    const password = useRef({});
    password.current = watch("password", ""); // react-hook-form

    //custom hook to post user
    const { error: authError, loading, res } = useNormalFetch({
        body,
        type: "post",
        url: "auth/signup",
    });

    //check password strength
    useEffect(() => {
        setPasswordStrengthValue(passwordStrengthChecker(psw));
    }, [psw]);

    // update meter bar
    useEffect(() => {
        setBar(strengthBar(passwordStrengthValue.name));
    }, [passwordStrengthValue]);
    /* #endregion password */

    useEffect(() => {
        if (res) {
            setValue("username", "");
            setValue("email", "");
            setValue("password", "");
            setValue("password_repeat", "");
        }
    }, [res]);

    // submit
    const onSubmit = (data) => {
        let user = {
            userName: data.username,
            email: data.email,
            password: data.password,
        };

        setConfirm(true);
        setBody(user);
    };

    if (confirm) {
        return <Confirm email={body?.email} loading={loading} />;
    }

    return (
        <Template
            type="signup"
            authError={authError}
            form={
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="field-group">
                        {/* username */}

                        <div className="field">
                            <label className="label" htmlFor="username">
                                Username
                            </label>
                            <input
                                className={`form-input ${
                                    errors?.username?.message ? "error-border" : ""
                                }`}
                                type="text"
                                id="username"
                                name="username"
                                ref={register({
                                    required: {
                                        value: true,
                                        message: "This field is required",
                                    },
                                    minLength: { value: 4, message: "Min characters - 4" },
                                    maxLength: { value: 25, message: "Max characters - 25" },
                                    validate: (value) => !!value.trim(),
                                })}
                            />
                            {errors.username && (
                                <span className="error">
                                    {/* if message doesnt exist show a default one */}
                                    {errors?.username?.message
                                        ? errors?.username?.message
                                        : "Incorrect Value"}
                                </span>
                            )}
                        </div>
                    </div>
                    <div className="field-group">
                        <div className="field">
                            {/* email */}

                            <label className="label" htmlFor="email">
                                Email
                            </label>
                            <input
                                className={`form-input ${
                                    errors?.email?.message ? "error-border" : ""
                                }`}
                                type="email"
                                id="email"
                                name="email"
                                ref={register({
                                    required: {
                                        value: true,
                                        message: "This field is required",
                                    },
                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                        message: "invalid email address",
                                    },
                                })}
                            />
                            {errors.email && (
                                <span className="error">{errors?.email?.message}</span>
                            )}
                        </div>
                    </div>
                    <div className="field-group">
                        {/* password */}

                        <div className="field">
                            <label className="label" htmlFor="password">
                                Password
                            </label>
                            <input
                                className={`form-input ${
                                    errors?.password?.message ? "error-border" : ""
                                }`}
                                type="password"
                                id="password"
                                name="password"
                                onChange={(e) => setPsw(e.target.value)}
                                ref={register({
                                    required: {
                                        value: true,
                                        message: "Password is required",
                                    },
                                    pattern: {
                                        value: /^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z!@#$%^&*]{7,}$/,
                                        message: "Password must contain at least one number",
                                    },
                                    minLength: { value: 7, message: "Min characters - 7" },
                                })}
                            />
                            {errors.password && (
                                <span className="error">{errors?.password?.message}</span>
                            )}
                        </div>
                        <div className="field">
                            {/* repeat_password */}

                            <label className="label" htmlFor="password">
                                Repeat Password
                            </label>
                            <input
                                className={`form-input ${
                                    errors?.password_repeat?.message ? "error-border" : ""
                                }`}
                                type="password"
                                id="password_repeat"
                                name="password_repeat"
                                ref={register({
                                    validate: (value) =>
                                        value === password.current || "The passwords do not match",
                                })}
                            />
                            {errors.password_repeat && (
                                <span className="error">{errors?.password_repeat?.message}</span>
                            )}
                        </div>
                    </div>

                    {/* submit button */}
                    <div className={styles.submitField}>
                        <input
                            className={"btn btn-main " + styles.submitBtn}
                            type="submit"
                            disabled={loading}
                            value="Create Account"
                        />

                        {/* password strength checker */}
                        {passwordStrengthValue && (
                            <div className={styles.passwordStrength}>
                                <div>
                                    <div className={styles.passwordStrength__value}>
                                        <div>Password Strength:</div>
                                        <div
                                            style={{ color: bar.color }}
                                            className={styles.passwordStrength__name}
                                        >
                                            {passwordStrengthValue.name}
                                        </div>
                                    </div>
                                    <div className={styles.passwordStrength__bar}>
                                        <div
                                            style={{
                                                width: bar.width,
                                                backgroundColor: bar.color,
                                            }}
                                        ></div>
                                    </div>
                                </div>
                                <div className={styles.passwordStrength__suggestion}>
                                    {passwordStrengthValue.suggestion &&
                                        passwordStrengthValue.suggestion}
                                </div>
                            </div>
                        )}
                    </div>
                </form>
            }
        />
    );
};

export default Signup;
