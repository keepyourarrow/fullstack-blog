import React from "react";
import { withAdmin } from "../../hoc/withAdmin";
import { useAuth } from "../../hooks/useAuth";

import Categories from "../../Components/Admin/Categories";

// const CreateBlog = dynamic(() => import("../../Components/Admin/Content/CreateBlog").then(mod => mod.CreateBlog), {
//     ssr: false,
// });

const categories = [
    {
        id: 1,
        name: "A very cute name",
        views: 100,
    },
    {
        id: 2,
        name: "Aaaamzing",
        views: 1000,
    },
    {
        id: 3,
        name: "Not sure about the title",
        views: 50,
    },
];
const CategoriesPage = () => {
    const { hasPermission } = useAuth();

    // so it doesnt flash
    if (!hasPermission) {
        return <></>;
    }

    return <Categories categories={categories} />;
};

export default withAdmin(CategoriesPage);
