import React from "react";
import useSWR from "swr";
import { normalFetch } from "../../../api/normalFetch";

import DisplayBlogsAsGrid from "../DisplayBlogsAsGrid";

const RelatedBlogs = ({ category, title }) => {
    const { data, error } = useSWR([`blogs/related/${category}/${title}`, "get"], normalFetch, {
        revalidateOnFocus: false,
    });

    const blogs = data?.data || [];

    console.log(data);

    return (
        <>
            {blogs.length > 0 && (
                <h3 className="secondary-title" style={{ marginBottom: "2rem" }}>
                    You may also like...
                </h3>
            )}
            <DisplayBlogsAsGrid blogs={blogs} type="relatedBlogs" />
        </>
    );
};

export default RelatedBlogs;
