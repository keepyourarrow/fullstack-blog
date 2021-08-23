import React from "react";

import styles from "./common.module.css";

import BlogCard from "./BlogCard";

const DisplayBlogsAsGrid = ({ blogs, type }) => {
    return (
        <article className={styles.blogsInGrid}>
            {blogs.map((blog) => {
                // relatedBlogs show category as a title

                if (type === "relatedBlogs") {
                    blog.title = blog.category;
                    blog.type = "category";
                }
                return <BlogCard {...blog} />;
            })}
        </article>
    );
};

export default DisplayBlogsAsGrid;
