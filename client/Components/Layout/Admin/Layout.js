import React, { useEffect } from "react";
import { useAuth } from "../../../hooks/useAuth";

import { AnimatePresence, motion } from "framer-motion";

import styles from "./adminLayout.module.css";

import Nav from "./Nav";
import Sidebar from "./Sidebar";
import Alert from "../../Common/Alert/Alert";

const Layout = ({ children }) => {
    const { notification, setNotification } = useAuth();

    useEffect(() => {
        if (notification) {
            setTimeout(() => {
                setNotification(false);
            }, 5000);
        }
    }, [notification]);
    return (
        <div>
            <Nav />

            <AnimatePresence>{notification && <Alert />}</AnimatePresence>
            <div className={styles.body}>
                <Sidebar />
                <motion.button
                    animate={{
                        scale: [1, 2, 2, 1, 1],
                        rotate: [0, 0, 360, 360, 0],
                        borderRadius: ["20%", "20%", "50%", "50%", "20%"],
                    }}
                    transition={{
                        duration: 2,
                        ease: "easeInOut",
                        times: [0, 0.2, 0.5, 0.8, 1],
                        loop: Infinity,
                        repeatDelay: 1,
                    }}
                    className="absolute"
                    style={{ background: "#fff", padding: "1rem", left: "50%", top: "50%" }}
                    onClick={() => setNotification(true)}
                >
                    dasd
                </motion.button>
                {children}
            </div>
        </div>
    );
};

export default Layout;
