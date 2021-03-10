import React from "react";

import styles from "./ui.module.css";

const FillButton = ({ children }) => {
    return (
        <div className={styles.fillBtn}>
            <div className={styles.fillTransition}></div>
            <span>{children}</span>
        </div>
    );
};

export default FillButton;
