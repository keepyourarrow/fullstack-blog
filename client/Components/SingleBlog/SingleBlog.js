import React from "react";
import Image from "next/image";
import DisplaySingleBlog from "../Common/SingleBlog/DisplaySingleBlog";

const SingleBlog = ({ blog }) => {
    return <DisplaySingleBlog blog={blog} userName={blog.user} />;
};

export default SingleBlog;
