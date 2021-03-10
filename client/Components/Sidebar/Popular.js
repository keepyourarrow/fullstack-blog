import React from "react";
import Link from "next/link";

import styles from "./sidebar.module.css";

const Popular = () => {
  return (
    <aside className={`${styles.aside} ${styles.topBorder}`}>
      <div className={styles.body}>
        <h4 className={styles.titlePrimary}>
          <em>Design</em>
        </h4>
        <h3 className={styles.titleSecondary + " uppercase"}>most popular</h3>
        <ol className={styles.popularLinks}>
          <li className={styles.popularLink}>
            <Link href="/blogs/my-sister's-home-makeover">
              <a className="secondary-hover">My Sister’s Home Makeover</a>
            </Link>
          </li>
          <li className={styles.popularLink}>
            <Link href="/blogs/8-awesome-podcasts">
              <a className="secondary-hover">8 Awesome Podcasts</a>
            </Link>
          </li>
          <li className={styles.popularLink}>
            <Link href="/blogs/John-derian-lives-in-a-sea-captain's-house">
              <a className="secondary-hover">
                John Derian Lives in a Sea Captain’s House
              </a>
            </Link>
          </li>
          <li className={styles.popularLink}>
            <Link href="/blogs/behind-the-scenes-making-a-magazine-cover">
              <a className="secondary-hover">
                Behind the Scenes: Making a Magazine Cover
              </a>
            </Link>
          </li>
          <li className={styles.popularLink}>
            <Link href="/blogs/what's-the-most-beautiful-thing-you've-ever-read">
              <a className="secondary-hover">
                What’s the Most Beautiful Thing You’ve Ever Read?
              </a>
            </Link>
          </li>
        </ol>

        <Link href="/category/design">
          <a className="more-link secondary-link secondary-hover">
            <em>load more</em>
          </a>
        </Link>
      </div>
    </aside>
  );
};

export default Popular;
