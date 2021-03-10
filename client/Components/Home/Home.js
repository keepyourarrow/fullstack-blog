import React from "react";
import DisplaySingleBlog from "../Common/DisplaySingleBlog";

export const Home = ({ blogs }) => {
    return (
        <section className="blog-section">
            {blogs.map((blog) => {
                const {
                    id,
                    title,
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
                    <DisplaySingleBlog
                        blog={{ ...blog }}
                        author={blog.user}
                        created_at={blog.created_at}
                        comments={blog.comments}
                    />
                );
            })}
        </section>
    );
};
