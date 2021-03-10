import React from "react";
import { withAdmin } from "../../hoc/withAdmin";
import { useAuth } from "../../hooks/useAuth";

import CreateBlog from "../../Components/Admin/CreateBlog";

// const CreateBlog = dynamic(() => import("../../Components/Admin/Content/CreateBlog").then(mod => mod.CreateBlog), {
//     ssr: false,
// });

const createBlogPage = () => {
    const { hasPermission } = useAuth();

    // so it doesnt flash
    if (!hasPermission) {
        return <></>;
    }

    return <CreateBlog />;
};

export default withAdmin(createBlogPage);
