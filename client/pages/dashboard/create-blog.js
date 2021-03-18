import React from "react";
import { withAdmin } from "../../hoc/withAdmin";
import { useAuth } from "../../hooks/useAuth";

import BlogForm from "../../Components/Admin/BlogForm";

// const CreateBlog = dynamic(() => import("../../Components/Admin/Content/CreateBlog").then(mod => mod.CreateBlog), {
//     ssr: false,
// });

const createBlogPage = () => {
    const { hasPermission } = useAuth();

    // so it doesnt flash
    if (!hasPermission) {
        return <></>;
    }

    return <BlogForm />;
};

export default withAdmin(createBlogPage);
