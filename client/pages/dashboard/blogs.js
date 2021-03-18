import React from "react";
import { withAdmin } from "../../hoc/withAdmin";
import { useAuth } from "../../hooks/useAuth";

import Blogs from "../../Components/Admin/Blogs";

// const CreateBlog = dynamic(() => import("../../Components/Admin/Content/CreateBlog").then(mod => mod.CreateBlog), {
//     ssr: false,
// });

const blogs = [
    {
        id: 1,
        title: "A very cute name",
        category: "Life",
        created_at: "2021-03-10T13:58:38.793Z",
        updated_at: "2021-03-10T13:58:38.797Z",
        likes: 0,
        dislikes: 10,
        views: 100,
        image: "https://digitaltemplatemarket.com/wp-content/uploads/2019/03/Bluebox.jpg",
        comments: 10,
    },
    {
        id: 2,
        title: "Aaaamzing",
        category: "Life",
        created_at: "2021-03-08T22:50:59.701Z",
        updated_at: "2021-03-08T23:26:15.778Z",
        likes: 5,
        dislikes: 0,
        views: 1000,
        image:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1200px-Image_created_with_a_mobile_phone.png",
        comments: 150,
    },
    {
        id: 3,
        title: "Not sure about the title",
        category: "Adventure",
        created_at: "2021-03-08T22:43:34.697Z",
        updated_at: "2021-03-08T23:43:45.411Z",
        likes: 15,
        dislikes: 100,
        views: 50,
        image: "https://i.redd.it/s89xhw8dyql61.png",
        comments: 0,
    },
];
const BlogsPage = () => {
    const { hasPermission } = useAuth();

    // so it doesnt flash
    if (!hasPermission) {
        return <></>;
    }

    return <Blogs blogs={blogs} />;
};

export default withAdmin(BlogsPage);
