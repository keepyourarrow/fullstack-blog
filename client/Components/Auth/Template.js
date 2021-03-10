import React from "react";
import Link from "next/link";

import styles from "./auth.module.css";

const Template = ({ type, authError, form }) => {
    const isSignup = type === "signup";

    return (
        <main className={styles.main}>
            <nav className={styles.main__nav}>
                <div className="auth-main-content__nav-link">
                    {isSignup ? "Already a member? " : "Are you new? "}
                    <Link href={"/auth/" + (isSignup ? "login" : "signup")}>
                        <a className="more-link secondary-link secondary-hover">
                            <em>Sign{isSignup ? " in " : " up "}</em>
                        </a>
                    </Link>
                </div>
            </nav>
            <section className={styles.main__section}>
                <div className={styles.main__titleContainer}>
                    <h2 className={styles.main__title}>
                        Sign{isSignup ? " up " : " in "} to Bloggy-chan
                    </h2>
                    <div className="divider"></div>
                </div>

                <div className={styles.main__authForm}>
                    {/* display backend auth errors like: "username already exists" */}
                    {authError && (
                        <>
                            {Object.values(authError).map((err, index) => {
                                return (
                                    <div className="error" key={index}>
                                        {err}
                                    </div>
                                );
                            })}
                        </>
                    )}
                    {form}
                </div>
            </section>
        </main>
    );
};

export default Template;
