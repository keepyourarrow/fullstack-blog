import React from "react";

import styles from "./sidebar.module.css";

const Disclosure = () => {
  return (
    <aside className={`${styles.aside} ${styles.topBorder}`}>
      <div className={styles.body}>
        <h4 className={styles.titlePrimary}>
          <em>Disclosure</em>
        </h4>
        <p className={styles.disclosure}>
          In order to grow our small business, <strong>Bloggy-chan</strong>{" "}
          earns revenue in a few different ways. We publish several sponsored
          posts each month, which are always labeled at the top. We also
          sometimes earn an affiliate commission on the sales of products we
          link to. We feature only items we genuinely love and want to share,
          and this is an arrangement between the retailer and{" "}
          <strong>Bloggy-chan</strong> (readers never pay more for products).
          These are the ways we support <strong>Bloggy-chan</strong>, and allow
          us to run the site and engage with this community we truly love. Thank
          you for reading!
        </p>
      </div>
    </aside>
  );
};

export default Disclosure;
