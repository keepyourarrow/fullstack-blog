import React, { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/router";
import DataGrid from "react-data-grid";

import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/opacity.css";

import { TiPencil } from "react-icons/ti";
import { BsTrash2Fill } from "react-icons/bs";
import styles from "../admin.module.css";
import { Modal } from "../../Common/Modal/Modal";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";

import slugify from "slugify";
import DeleteModal from "../../Common/Modal/DeleteModal";

const Table = ({ data, columnNames }) => {
    const router = useRouter();
    const [[queryType, queryValue], setQuery] = useState(["title", undefined]);
    // modal
    const [deleteModal, setDeleteModal] = useState(false);

    //table
    const [rows, setRows] = useState(initRows(data, columnNames));
    // const [columns] = useState(initColumns(columnNames, setDeleteModal));
    const [[sortColumn, sortDirection], setSort] = useState(["views", "NONE"]);

    useEffect(() => {
        if (Object.keys(router.query).length > 0) {
            setQuery([
                Object.keys(router.query).join(" "),
                Object.values(router.query).join(" ").replaceAll("-", " "),
            ]);
        }
    }, [router]);

    const initColumns = useMemo(() => {
        console.log("initColumns called");
        function actionsFormatter({ row }) {
            let name = row.title;
            return (
                <div className={styles.table__actions}>
                    <a href="/dashboard/edit-blog" className={styles.table__pencil} target="_blank">
                        <span>
                            <TiPencil />
                        </span>
                    </a>

                    <motion.button
                        className={styles.table__trash}
                        onTap={() => setDeleteModal(name)}
                    >
                        <span>
                            <BsTrash2Fill />
                        </span>
                    </motion.button>
                </div>
            );
        }

        let columns = [
            {
                key: "_id",
                name: "Id",
                width: 10,
                frozen: true,
            },
        ];
        //only for blogs
        if (columnNames.includes("title")) {
            columns.push({
                key: "actions",
                name: "Actions",
                width: 20,
                frozen: true,
                formatter: ({ row }) => actionsFormatter({ row }),
            });
        }

        const wideColumn = ["comments", "name", "category"];

        for (let columnName of columnNames) {
            let formatterToUse = regularFormatter;

            let props = {
                minWidth: undefined,
                width: undefined,
                isFrozen: false,
                sortable: true,
                name: columnName.charAt(0).toUpperCase() + columnName.slice(1),
            };

            if (columnName === "title") {
                props.minWidth = 200;
                formatterToUse = linkFormatter;
            } else if (wideColumn.includes(columnName)) {
                props.minWidth = 120;
                formatterToUse = columnName !== "comments" ? linkFormatter : regularFormatter;
            } else if (wideColumn.includes(columnName)) {
                props.minWidth = 120;
            } else if (columnName === "image") {
                props.isFrozen = true;
                props.width = 40;
                props.sortable = false;
                formatterToUse = imageFormatter;
            } else if (columnName === "created_at") {
                props.name = "Created on";
                props.minWidth = 120;
            } else if (columnName === "updated_at") {
                props.minWidth = 120;
                props.name = "Updated last";
            }

            columns = [
                ...columns,
                {
                    key: columnName,
                    ...props,
                    formatter: (props) => formatterToUse(props.row, props.column.key, columnName),
                },
            ];
        }

        console.log(columns);
        return columns;
    }, [rows]);

    const handleSort = (columnKey, direction) => {
        setSort([columnKey, direction]);
    };

    const sortedRows = useMemo(() => {
        if (sortDirection === "NONE" && !queryValue) return rows;
        else if (sortDirection === "NONE" && queryValue) {
            let sortedRows = [...rows];
            let howManyFound = 0;

            for (let i in rows) {
                if (rows[i][queryType].toLowerCase() === queryValue) {
                    sortedRows[i] = rows[0];
                    sortedRows[0] = rows[i];
                    howManyFound++;
                }
            }
            if (howManyFound > 1) {
                sortedRows = sortedRows.sort((a, b) => {
                    if (a._id < b._id) return -1;
                    else if (a._id > b._id) return 1;
                });
            }

            console.log(howManyFound, "after");
            return sortedRows;
        }

        let sortedRows = [...rows];

        sortedRows = sortedRows.sort((a, b) => {
            if (a[sortColumn] < b[sortColumn]) return -1;
            else if (a[sortColumn] > b[sortColumn]) return 1;
        });

        return sortDirection === "DESC" ? sortedRows.reverse() : sortedRows;
    }, [rows, sortDirection, sortColumn, queryValue]);

    const handleDelete = () => {
        let newRows = [...rows];
        let title = deleteModal; // yes I know that it's not clear that a usual boolean variable stores a name

        setRows(rows.filter((row) => row.title !== title));
        setDeleteModal(false);
    };

    return (
        <>
            <DataGrid
                className="rdg-light"
                columns={initColumns}
                rows={sortedRows}
                rowKeyGetter={(row) => row.id}
                sortColumn={sortColumn}
                sortDirection={sortDirection}
                onSort={handleSort}
                rowClass={(row) =>
                    row[queryType].toLowerCase().includes(queryValue)
                        ? styles.tableHighlight
                        : undefined
                }
            ></DataGrid>

            {/* if user created the room and clicks on delete */}
            <AnimatePresence exitBeforeEnter>
                {deleteModal && (
                    <Modal setOpenModal={setDeleteModal} maxWidth="30rem">
                        <DeleteModal
                            exitModal={setDeleteModal}
                            name={deleteModal}
                            callback={() => handleDelete()}
                        />
                    </Modal>
                )}
            </AnimatePresence>
        </>
    );
};

export default Table;

//functions
const initRows = (data, columnNames) => {
    let sortedData = data.sort((a, b) => {
        if (a.views > b.views) return -1;
        else if (a.views < b.views) return 1;
    });

    return sortedData.map((item, index) => {
        let row = {
            id: item.id, // for unique identifier
            _id: index + 1, // to show in the table
        };

        for (let columName of columnNames) {
            row = { ...row, [columName]: item[columName] };
        }

        return row;
    });
};

// formatters

function regularFormatter(row, column, field) {
    let title = "";
    if (row[field] !== null) {
        title = row[field];
        // classNames = (!currentRow.is_refundable && !currentRow.is_cancellable) ? 'disabled-cell' : '';
    }
    return <span title={title}>{title}</span>;
}

function linkFormatter(row, column, field) {
    let title = "";
    let type = "";
    if (row[field]) {
        title = row[field];
        // classNames = (!currentRow.is_refundable && !currentRow.is_cancellable) ? 'disabled-cell' : '';
        type = ["name", "category"].includes(column) ? "category" : "blogs";
    }

    return (
        <a
            href={`/${type}/${slugify(title.toLowerCase())}`}
            className="secondary-link secondary-hover"
            title={title}
            target="_blank"
        >
            {title}
        </a>
    );
}

function imageFormatter(row) {
    const image = row?.image;
    return (
        <div style={{ width: "100%", height: "100%", position: "absolute", left: 0 }}>
            <Zoom zoomMargin={40} transitionDuration={500}>
                <LazyLoadImage effect="opacity" src={image} />
            </Zoom>
        </div>
    );
}
