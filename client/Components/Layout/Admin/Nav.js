import React, { useState } from "react";
import { useAuth } from "../../../hooks/useAuth";
import Link from "next/link";

import styles from "./adminLayout.module.css";

import { GiHamburgerMenu } from "react-icons/gi";
import { RiCloseLine } from "react-icons/ri";

import FillButton from "../../Common/Ui/FillButton";

import Search from './Search';

import Hamburger from "../../Common/Ui/Hamburger";

const Nav = ({ openSidebar, setOpenSidebar }) => {
    const { user } = useAuth();

    return (
        <nav className={styles.nav}>
            <div className="flex-align-c">
                <div className={styles.mobileNav} onClick={() => setOpenSidebar(!openSidebar)}>
                    <FillButton>
                        <Hamburger openNav={openSidebar} />
                    </FillButton>
                </div>
                <Link href="/">
                    <a className={styles.nav__logo}>raphi-blog</a>
                </Link>
            </div>
            <Search/>

            <div className={styles.nav__logo}>{user?.userName}</div>
        </nav>
    );
};

export default Nav;
