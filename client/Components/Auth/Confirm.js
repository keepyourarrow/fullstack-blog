import React, { useState } from "react";
import { resendLink } from "../../api/auth";

import { useForm } from "react-hook-form";

import styles from "./auth.module.css";

import Loading from "../Common/Loading";
import { useFetchWithParam } from "../../hooks/useFetchWithParam";

const Confirm = ({ email = "dima_p_50@email.com", loading }) => {
    let { register, handleSubmit, errors, setError } = useForm();

    const [displayInput, setDisplayInput] = useState(false);
    const [param, setParam] = useState();
    const [callback, setCallback] = useState();

    let { error: authError, loading: confirmLoad } = useFetchWithParam({
        param: param?.email,
        type: "get",
        url: "resend-email/",
        callback,
    });

    loading = confirmLoad || loading;

    const onSubmit = (data) => {
        setCallback(() => (err) => {
            if (!err) {
                setDisplayInput(false);
            }
            setParam();
        });

        //Wrong email
        if (data.email) {
            setParam({ email: data.email });
        }
        // Send another verification link
        else {
            setParam({ email });
        }
    };

    return (
        <main className={styles.confirmation}>
            <div className={"relative " + styles.confirmation__container}>
                {loading ? (
                    <div>
                        <p>
                            We're sending an email to <strong>{email}</strong> to complete the
                            registration process
                        </p>
                        <Loading />
                    </div>
                ) : (
                    <>
                        <p className={styles.confirmation__status}>
                            Email successfully sent. Please check your Inbox to complete the
                            registration process.
                        </p>
                        <div style={{ paddingBottom: "1rem" }}>
                            <div style={{ marginBottom: "0.4rem" }}>
                                <a className="browser-link" onClick={onSubmit}>
                                    Send another verification email
                                </a>
                            </div>
                            {!displayInput ? (
                                <>
                                    <a
                                        className="browser-link"
                                        onClick={() => setDisplayInput(true)}
                                    >
                                        Wrong email address?
                                    </a>
                                </>
                            ) : (
                                <div>
                                    {authError && <div className="error">{authError.message}</div>}
                                    <form
                                        className={styles.confirmation__inputForm}
                                        onSubmit={handleSubmit(onSubmit)}
                                    >
                                        <input
                                            className={"form-input " + styles.confirmation__input}
                                            type="text"
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

                                        <button
                                            className={
                                                "btn btn-main " + styles.confirmation__button
                                            }
                                        >
                                            Try again
                                        </button>
                                    </form>
                                </div>
                            )}
                            {errors?.email?.message && (
                                <div className="error">{errors?.email?.message}</div>
                            )}
                        </div>
                    </>
                )}
            </div>
        </main>
    );
};

export default Confirm;
