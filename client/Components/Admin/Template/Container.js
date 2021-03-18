import React from "react";

import styles from "../admin.module.css";

const Container = ({ title, containerRef, children }) => {
    // containerRef is optional for BlogForm scrollToTop
    return (
        <main className={styles.main}>
            <div
                className={styles.title}
                dangerouslySetInnerHTML={{ __html: title }}
                ref={containerRef}
            ></div>
            {children}
        </main>
    );
};

export default Container;
