import React from "react";
import { useRouter } from "next/router";
import { withAdmin } from "../../../hoc/withAdmin";
import { useAuth } from "../../../hooks/useAuth";
import { normalFetch } from "../../../api/normalFetch";

import BlogForm from "../../../Components/Admin/BlogForm";
import useSWR from "swr";

const createBlogPage = () => {
    const { hasPermission, checkAccessToken } = useAuth();
    const {
        query: { id: queryId },
    } = useRouter();

    const { data, error } = useSWR(queryId ? [`blogs/${queryId}`, "get"] : null, normalFetch, {
        revalidateOnFocus: false,
        onSuccess: checkAccessToken,
    });

    if (!data) {
        return <div>Loading...</div>;
    }
    if (error) {
        return <div>ERror....</div>;
    }
    // console.log(error, "error");
    // so it doesnt flash
    if (!hasPermission) {
        return <></>;
    }

    const blog = data.data;

    return <BlogForm title={`Edit <strong>'${blog.title}'</strong>`} blog={blog} />;
};

export default withAdmin(createBlogPage);
