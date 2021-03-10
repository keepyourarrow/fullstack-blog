import React from "react";
import About from "./About";
import Contact from "./Contact";
import Disclosure from "./Disclosure";
import Popular from "./Popular";

import styles from "./sidebar.module.css";

const Sidebar = () => {
  return (
    <div className={styles.container}>
      <About />
      <Contact />
      <Popular />
      <Disclosure />
    </div>
  );
};

export default Sidebar;
