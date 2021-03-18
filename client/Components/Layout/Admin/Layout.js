import React, { useEffect, useState } from "react";
import { useAuth } from "../../../hooks/useAuth";

import { AnimatePresence, motion } from "framer-motion";

import styles from "./adminLayout.module.css";

import Nav from "./Nav";
import Sidebar from "./Sidebar";
import Alert from "../../Common/Alert/Alert";

const Layout = ({ children }) => {
    const { notification, setNotification } = useAuth();
    const [openSidebar, setOpenSidebar] = useState(false);

    useEffect(() => {
        if (notification) {
            setTimeout(() => {
                setNotification(false);
            }, 5000);
        }
    }, [notification]);
    return (
        <div>
            <Nav openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} />

            <AnimatePresence>{notification && <Alert />}</AnimatePresence>
            <div className={styles.body}>
                <div
                    className={`${styles.mobileSidebar_blackBackground} ${
                        openSidebar ? "d-block" : "d-none"
                    } `}
                ></div>
                <Sidebar openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} />
                {children}
            </div>
        </div>
    );
};

export default Layout;
