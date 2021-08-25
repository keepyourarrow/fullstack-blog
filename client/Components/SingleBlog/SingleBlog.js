import React from "react";
import DisplaySingleBlog from "../Common/SingleBlog/DisplaySingleBlog";

const SingleBlog = ({ blog }) => {
    return <DisplaySingleBlog blog={blog} userName={blog.user} />;
};

export default SingleBlog;
