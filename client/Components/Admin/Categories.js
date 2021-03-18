import React from "react";

import styles from "./admin.module.css";
import Table from "./Template/Table";
import Container from "./Template/Container";

const Categories = ({ categories }) => {
    const updatedColumnsOrder = ["name", "views"];
    return (
        <Container title="Categories">
            <div className={styles.tableContainer}>
                <Table data={categories} columnNames={updatedColumnsOrder} />
            </div>
        </Container>
    );
};

export default Categories;
