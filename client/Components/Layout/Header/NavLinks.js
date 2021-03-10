import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import styles from "./header.module.css";

const NavLinks = () => {
  const router = useRouter();

  return (
    <ul className={styles.primaryNavLinks}>
      <li className={"bold uppercase " + styles.primaryNavLink}>
        <Link href="/category/style">
          <a
            className={
              "primary-hover " +
              (router.pathName == "/category/travel" ? "active-link" : "")
            }
          >
            Style
          </a>
        </Link>
      </li>
      <li className={"bold uppercase " + styles.primaryNavLink}>
        <Link href="/category/design">
          <a
            className={
              "primary-hover " +
              (router.pathName == "/category/design" ? "active-link" : "")
            }
          >
            design
          </a>
        </Link>
      </li>
      <li className={"bold uppercase " + styles.primaryNavLink}>
        <Link href="/category/relationships">
          <a
            className={
              "primary-hover " +
              (router.pathName == "/category/relationships"
                ? "active-link"
                : "")
            }
          >
            relationships
          </a>
        </Link>
      </li>
      <li className={"bold uppercase " + styles.primaryNavLink}>
        <Link href="/category/food">
          <a
            className={
              "primary-hover " +
              (router.pathName == "/category/food" ? "active-link" : "")
            }
          >
            food
          </a>
        </Link>
      </li>
      <li className={"bold uppercase " + styles.primaryNavLink}>
        <Link href="/category/travel">
          <a
            className={
              "primary-hover " +
              (router.pathName == "/category/travel" ? "active-link" : "")
            }
          >
            Travel
          </a>
        </Link>
      </li>
      <li className={"bold uppercase " + styles.primaryNavLink}>
        <Link href="/category/life">
          <a
            className={
              "primary-hover " +
              (router.pathName == "/category/life" ? "active-link" : "")
            }
          >
            life
          </a>
        </Link>
      </li>
    </ul>
  );
};

export default NavLinks;
