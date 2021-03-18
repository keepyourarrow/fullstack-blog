import React from "react";

import styles from "./ui.module.css";

const Hamburger = ({ openNav }) => {
    return (
        <div className={styles.hamburger}>
            <div className={`${styles.bar} ${openNav ? styles.bar1 : ""}`}></div>
            <div className={styles.bar} style={{ opacity: openNav ? 0 : 1 }}></div>
            <div className={`${styles.bar} ${openNav ? styles.bar3 : ""}`}></div>
        </div>
    );
};

export default Hamburger;
