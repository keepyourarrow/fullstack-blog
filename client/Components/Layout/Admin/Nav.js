import React, { useState } from "react";
import { useAuth } from "../../../hooks/useAuth";
import Link from "next/link";

import styles from "./adminLayout.module.css";

import { GiHamburgerMenu } from "react-icons/gi";
import { RiCloseLine } from "react-icons/ri";

import FillButton from "../../Common/Ui/FillButton";
import { AnimatePresence, motion } from "framer-motion";

const Nav = () => {
    const { user } = useAuth();
    const [close, setClose] = useState(false);

    return (
        <nav className={styles.nav}>
            <div className="flex-align-c">
                <div className={styles.mobileNav}>
                    <FillButton>
                        <div onClick={() => setClose(!close)} className="relative">
                            <AnimatePresence>
                                {close ? (
                                    <motion.span
                                        layout
                                        key="close"
                                        // transition={{ duration: 0.2, ease: "easeOut" }}
                                        initial={{ y: "100%", opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        exit={{ y: "100%", position: "absolute", opacity: 0 }}
                                    >
                                        <RiCloseLine />
                                    </motion.span>
                                ) : (
                                    <motion.span
                                        layout
                                        key="open"
                                        // transition={{ duration: 0.2, ease: "easeOut" }}
                                        initial={{ x: 0, opacity: 1 }}
                                        animate={{ x: "100%", opacity: 0 }}
                                        exit={{ x: 0, position: "absolute", opacity: 0 }}
                                    >
                                        <GiHamburgerMenu />
                                    </motion.span>
                                )}
                            </AnimatePresence>
                        </div>
                    </FillButton>
                </div>
                <Link href="/">
                    <a className={styles.nav__logo}>raphi-blog</a>
                </Link>
            </div>

            <div className={styles.nav__logo}>{user?.userName}</div>
        </nav>
    );
};

export default Nav;
