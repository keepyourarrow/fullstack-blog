import React from "react";
import Link from "next/link";

import styles from "./common.module.css";
import { smartSubstr } from "../../helpers/smartSubstr"; // very legit

const DisplaySingleBlog = ({ blog = {}, author, created_at, comments, type }) => {
    let { id, title, slug, category, image, preview, content, shortPost } = blog;
    const inPreviewMode = !slug; // if slug doesnt exist we are in an admin only Preview mode

    const categoryLink = (
        <a title={`Permalink to '${category}' category`} className="secondary-hover">
            {category}
        </a>
    );
    const titleLink = (
        <a title={`Permalink to '${title}'`} className="secondary-hover">
            {title}
        </a>
    );
    const authorLink = (
        <a
            className={styles.blogAuthor + " secondary-link secondary-hover"}
            title={`Posts by '${author}'`}
        >
            {author}
        </a>
    );

    const imageLink = (
        <a className={styles.blogImageContainer}>
            <img
                className={`${image ? styles.blogImageExists : styles.blogNoImage} object-cover`}
                src={image}
                alt=""
            />
        </a>
    );

    const readMoreLink = (
        <a>
            <em>read more &gt;</em>{" "}
        </a>
    );

    const commentsLink = (
        <a>
            <span className={styles.footerCommentsName}>
                <em>Comments</em>
            </span>
            <span className={styles.footerComments + " secondary-link secondary-hover"}>
                {comments}
            </span>
        </a>
    );

    return (
        <article className={styles.blog} key={id}>
            <h3 className="bold uppercase">
                {inPreviewMode ? (
                    <>{categoryLink}</>
                ) : (
                    <Link href={`/category/${category}`}>{categoryLink}</Link>
                )}
            </h3>
            <h2 className={styles.blogTitle}>
                {inPreviewMode ? (
                    <>{titleLink}</>
                ) : (
                    <Link href={`/blogs/${slug}`}>{titleLink}</Link>
                )}
            </h2>
            <div className={styles.authorContainer}>
                <span>By</span>
                {inPreviewMode ? (
                    <>{authorLink}</>
                ) : (
                    <Link href={`/author/${author}`}>{authorLink}</Link>
                )}
            </div>
            {inPreviewMode ? <>{imageLink}</> : <Link href={`/blogs/${slug}`}>{imageLink}</Link>}
            {/* conditional, if we don't have blog.preview, show certain amount of characters of the blog.content */}

            <div className={styles.blogContent}>
                {type === "single" ? (
                    <div dangerouslySetInnerHTML={{ __html: content }}></div>
                ) : preview ? (
                    preview
                ) : (
                    <div
                        dangerouslySetInnerHTML={{ __html: smartSubstr(content, 2500) + "..." }}
                    ></div>
                )}
            </div>

            {/* toggle read me if it's not shortPost or if content is short  */}
            {!shortPost && type !== "single" && (
                <h6 className="more-link secondary-link secondary-hover">
                    {inPreviewMode ? (
                        <>{readMoreLink}</>
                    ) : (
                        <Link href={`/blogs/${slug}`}>{readMoreLink}</Link>
                    )}
                </h6>
            )}

            <div className={styles.footer + " uppercase"}>
                <div className={styles.footerSocialLinks}>
                    <span>{created_at}</span>
                    <span>&#47;</span>
                    <span>
                        <a className="secondary-link secondary-hover" href="http://facebook.com">
                            facebook
                        </a>
                    </span>
                    <span>&#47;</span>
                    <span>
                        <a className="secondary-link secondary-hover" href="http://twitter.com">
                            tweet
                        </a>
                    </span>
                    <span>&#47;</span>
                    <span>
                        <a className="secondary-link secondary-hover" href="http://pinterest.com">
                            pin
                        </a>
                    </span>
                    <span>&#47;</span>
                    <span>
                        <a className="secondary-link secondary-hover" href="http://twitter.com">
                            email
                        </a>
                    </span>
                </div>
                <div>
                    {inPreviewMode ? (
                        <>{commentsLink}</>
                    ) : (
                        <Link href={`/blogs/${slug}/#comments`}>{commentsLink}</Link>
                    )}
                </div>
            </div>
        </article>
    );
};

export default DisplaySingleBlog;
