import React from "react";
import Link from "next/link";

import styles from "./common.module.css";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/opacity.css";

import { getDate } from "../../helpers/time";
import { MdModeComment } from "react-icons/md";

const BlogCard = ({
    id,
    image,
    slug,
    title,
    category,
    short_preview,
    created_at,
    comments,
    type,
}) => {
    return (
        <div className={styles.blogCard} key={id}>
            <Link href={`/blogs/${slug}`}>
                <a>
                    <LazyLoadImage effect="opacity" src={image} className={styles.blogCard__img} />
                </a>
            </Link>

            <div className={styles.blogCard__body}>
                <Link href={`/blogs/${slug}`}>
                    <a
                        className={`${(type = "category" ? "uppercase" : "capitalize")} ${
                            styles.blogCard__title
                        }`}
                    >
                        <h3>{title}</h3>
                    </a>
                </Link>

                <div className={styles.blogCard__footerContainer}>
                    <div className={styles.blogCard__footer}>
                        <div className={styles.blogCard__date}>{getDate(created_at)}</div>

                        <Link href={`/blogs/${slug}/#comments`}>
                            <a className={styles.blogCard__comments}>
                                <span>
                                    <MdModeComment />
                                </span>
                                <span className="ml-1">{comments}</span>
                            </a>
                        </Link>
                    </div>
                </div>

                <p className={`capitalize ${styles.blogCard__preview}`}>{short_preview}</p>
            </div>
        </div>
    );
};

export default BlogCard;
