import React from "react";
import Link from "next/link";

import styles from "./auth.module.css";

export const Header = () => {
    return (
        <div className={styles.sidebar}>
            <div className={styles.sidebar__content}>
                <header className={styles.sidebar__header}>
                    {/* logo */}
                    <Link href="/">
                        <a>
                            <h1 className={styles.sidebar__link}>bloggy-chan</h1>
                        </a>
                    </Link>
                    <h2 className={styles.sidebar__title}>Just a blog of my daily life</h2>
                </header>
                <div className={styles.sidebar__artwork}>
                    <div className={styles.sidebar__artworkImage}></div>
                </div>
            </div>
        </div>
    );
};
