import React from "react";
import Link from "next/link";

import styles from "./Home.module.css";

const DisplayBlogs = ({ blogs }) => {
  return (
    <section className={styles.blogSection}>
      {blogs.map((blog) => {
        const {
          title,
          id,
          slug,
          category,
          image,
          user,
          preview,
          content,
          created_at,
          comments,
        } = blog;
        return (
          <article className={styles.blog} key={id}>
            <h3 className="bold uppercase">
              <Link href={`/category/${category}`}>
                <a
                  title={`Permalink to '${category}' category`}
                  className="secondary-hover"
                >
                  {category}
                </a>
              </Link>
            </h3>
            <h2 className={styles.blogTitle}>
              <Link href={`/blogs/${slug}`}>
                <a
                  title={`Permalink to '${title}'`}
                  className="secondary-hover"
                >
                  {title}
                </a>
              </Link>
            </h2>
            <div className={styles.authorContainer}>
              <span>By</span>
              <Link href={`/author/${user}`}>
                <a
                  className={
                    styles.blogAuthor + " secondary-link secondary-hover"
                  }
                  title={`Posts by '${user}'`}
                >
                  {user}
                </a>
              </Link>
            </div>
            <Link href={`/blogs/${slug}`}>
              <a className={styles.blogImageContainer}>
                <img
                  className={styles.blogImage + " object-cover"}
                  src={image}
                  alt=""
                />
              </a>
            </Link>
            {/* conditional, if we don't have blog.preview, show certain amount of characters of the blog.content */}

            <p className={styles.blogContent}>
              {preview ? preview : content.substring(0, 550) + "..."}
            </p>

            {/* toggle read me if we have blog.content */}
            {content && (
              <h6 className="more-link secondary-link secondary-hover">
                <Link href={`/blogs/${slug}`}>
                  <em>read more &gt;</em>
                </Link>
              </h6>
            )}

            <div className={styles.footer + " uppercase"}>
              <div className={styles.footerSocialLinks}>
                <span>{created_at}</span>
                <span>&#47;</span>
                <span>
                  <a
                    className="secondary-link secondary-hover"
                    href="http://facebook.com"
                  >
                    facebook
                  </a>
                </span>
                <span>&#47;</span>
                <span>
                  <a
                    className="secondary-link secondary-hover"
                    href="http://twitter.com"
                  >
                    tweet
                  </a>
                </span>
                <span>&#47;</span>
                <span>
                  <a
                    className="secondary-link secondary-hover"
                    href="http://pinterest.com"
                  >
                    pin
                  </a>
                </span>
                <span>&#47;</span>
                <span>
                  <a
                    className="secondary-link secondary-hover"
                    href="http://twitter.com"
                  >
                    email
                  </a>
                </span>
              </div>
              <div>
                <Link href={`/blogs/${slug}`}>
                  <a>
                    <span className={styles.footerCommentsName}>
                      <em>Comments</em>
                    </span>
                    <span
                      className={
                        styles.footerComments +
                        " secondary-link secondary-hover"
                      }
                    >
                      {comments.length}
                    </span>
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
export default DisplayBlogs;
