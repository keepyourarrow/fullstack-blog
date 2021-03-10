import React from "react";
import { Link } from "next/link";

import styles from "./common.module.css";

export const DisplayBlogs = ({ blogs }) => {
    return (
        <section className={styles.blogsSection}>
            {blogs.map((blog) => {
                const { title, slug, image, shortdesc, createdAt, comments } = blog;
                return (
                    <article className={`relative ${styles.blogsArticle}`}>
                        <Link href={`/blogs/${slug}`}>
                            <a className={styles.blogsArticle__image} title={title}>
                                <img src={image} alt={title} />
                            </a>
                        </Link>
                        <div className={styles.blogsArticle__body}>
                            <Link href={`/blogs/${slug}`}>
                                <a className={styles.blogsArticle__bodyTitle} title={title}>
                                    <h3>{title}</h3>
                                </a>
                            </Link>
                            {/* hide on hover */}
                            <p className={styles.blogsArticle__body__shortdesc}>{shortdesc}</p>
                            {/* show on hover */}
                            <div className={styles.blogsArticle__body__footer}>
                                <div className={styles.blogsArticle__body__footer__date}>
                                    {createdAt}
                                </div>
                                <Link href={`/blogs/${slug}`}>
                                    <a className={styles.blogsArticle__body__footer__comments}>
                                        <div>{comments}</div>
                                    </a>
                                </Link>
                            </div>
                        </div>
                    </article>
                );
            })}
        </section>
    );
};
