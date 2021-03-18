import React from "react";

import styles from "./ui.module.css";

// "#b5e3ae"
const FillButton = ({
    fillColor = "green",
    color = "white",
    bgColor = "white",
    width = "3rem",
    height = "3rem",
    onClick,
    children,
}) => {
    return (
        <div
            className={styles.fillBtn + " " + styles[color]}
            style={{ backgroundColor: bgColor, width, height }}
            onClick={onClick}
        >
            <div className={styles.fillTransition + " " + styles[fillColor]}></div>
            <span className="z-1">{children}</span>
        </div>
    );
};

export default FillButton;
