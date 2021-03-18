import React from "react";

import styles from "./admin.module.css";
import Table from "./Template/Table";
import Container from "./Template/Container";

const Blogs = ({ blogs }) => {
    const updatedColumnsOrder = [
        "image",
        "title",
        "views",
        "category",
        "created_at",
        "updated_at",
        "likes",
        "dislikes",
        "comments",
    ];
    return (
        <Container title="Blogs">
            <div className={styles.tableContainer}>
                <Table data={blogs} columnNames={updatedColumnsOrder} />
            </div>
        </Container>
    );
};

export default Blogs;
