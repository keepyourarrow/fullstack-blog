import React from "react";

import { motion } from "framer-motion";

import styles from "./alert.module.css";

const Alert = () => {
    return (
        <motion.div
            className={styles.container}
            key="notification"
            transition={{ duration: 0.9, ease: "easeOut" }}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
        >
            "helllo"
        </motion.div>
    );
};

export default Alert;
