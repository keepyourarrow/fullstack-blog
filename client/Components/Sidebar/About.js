import React from "react";
import Link from "next/link";

import styles from "./sidebar.module.css";

const About = () => {
  return (
    <aside className={styles.aside}>
      <Link href="/about">
        <a className={styles.link}>
          <div>
            <img
              className={styles.image}
              src="https://cupofjo.com/wp-content/uploads/2019/05/joanna-toby.jpg"
              alt="Joanna Goddard"
            />
          </div>
          <div className={styles.body}>
            <h4 className={styles.titlePrimary + " main-transition"}>
              <em>About</em>
            </h4>
            <h3 className={styles.titleSecondary + " uppercase"}>
              Joanna Goddard
            </h3>
          </div>
        </a>
      </Link>
    </aside>
  );
};

export default About;
