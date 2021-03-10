import React from "react";
import Link from "next/link";
import NavLinks from "./NavLinks";
import Search from "./Search";
import SignupLink from "./SignupLink";
import Logout from "./Logout";
import Profile from "./Profile";

import { useAuth } from "../../../hooks/useAuth";
import styles from "./header.module.css";

const Header = () => {
    const { user } = useAuth();

    return (
        <header style={{ paddingTop: "3.5rem" }}>
            <nav>
                {/* add logo later */}
                <h2 className={styles.siteLogoHeader}>
                    <Link href="/">
                        <a> BLOGGY-CHAN</a>
                    </Link>
                </h2>
            </nav>
            <nav className={styles.primaryNav}>
                <NavLinks />
                <div className={styles.primaryNavSecondaryLinks}>
                    {!user ? (
                        <>
                            <SignupLink />
                        </>
                    ) : (
                        <>
                            <Profile />
                            {/* <Logout /> */}
                        </>
                    )}
                    <Search />
                </div>
            </nav>
        </header>
    );
};

export default Header;
