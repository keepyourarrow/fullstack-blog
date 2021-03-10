import React from "react";
import Link from "next/link";
import { FaFacebookF } from "react-icons/fa";
import { AiOutlineTwitter } from "react-icons/ai";
import { FaPinterest } from "react-icons/fa";
import { ImInstagram } from "react-icons/im";

import styles from "./sidebar.module.css";

const Contact = () => {
    return (
        <aside className={`${styles.aside} ${styles.topBorder}`}>
            <div className={styles.body}>
                <h4 className={styles.titlePrimary + " main-transition"}>
                    <em>let’s hang out</em>
                </h4>
                <div className={styles.contactContainer}>
                    <div className="flex-align-c">
                        <a
                            href="https://facebook.com"
                            className="social-links social-links--facebook secondary-transition"
                        >
                            <FaFacebookF />
                        </a>
                        <a
                            href="https://twitter.com"
                            className="social-links social-links--twitter secondary-transition"
                        >
                            <AiOutlineTwitter />
                        </a>
                        <a
                            href="https://pinterest.com"
                            className="social-links social-links--pinterest secondary-transition"
                        >
                            <FaPinterest />
                        </a>
                        <a
                            href="https://instagram.com"
                            className="social-links social-links--instagram secondary-transition"
                        >
                            <ImInstagram />
                        </a>
                    </div>
                </div>

                <Link href="/contact">
                    <a className="more-link secondary-link secondary-hover">
                        <em>contact me</em>
                    </a>
                </Link>
            </div>
        </aside>
    );
};

export default Contact;
