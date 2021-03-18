import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";

import { motion } from "framer-motion";
import { BiSearch } from "react-icons/bi";
import { VscFile } from "react-icons/vsc";
import { FiCornerDownLeft } from "react-icons/fi";

import styles from "./modal.module.css";

import { handleEscape } from "../../../helpers/keyPresses";
import slugify from "slugify";
// only for Admin/dashboard
// Modal.js is not being used!

const modalVariant = {
    initial: {
        top: "-50px",
        transition: { type: "spring", damping: 100, stifness: 10 },
    },
    animate: { top: "70px" },
};

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
    {
        id: 4,
        title: "THat's a ver ynice title in a whiel actuallyl yq qowro",
        category: "Adventure",
        created_at: "2021-03-08T22:43:34.697Z",
        updated_at: "2021-03-08T23:43:45.411Z",
        likes: 15,
        dislikes: 100,
        views: 50,
        image: "https://i.redd.it/s89xhw8dyql61.png",
        comments: 0,
    },
    {
        id: 5,
        title: "Another adventure another title",
        category: "Adventure",
        created_at: "2021-03-08T22:43:34.697Z",
        updated_at: "2021-03-08T23:43:45.411Z",
        likes: 15,
        dislikes: 100,
        views: 50,
        image: "https://i.redd.it/s89xhw8dyql61.png",
        comments: 0,
    },
    {
        id: 6,
        title: "What's so great about tailwind anyway",
        category: "Adventure",
        created_at: "2021-03-08T22:43:34.697Z",
        updated_at: "2021-03-08T23:43:45.411Z",
        likes: 15,
        dislikes: 100,
        views: 50,
        image: "https://i.redd.it/s89xhw8dyql61.png",
        comments: 0,
    },
    {
        id: 7,
        title: "Web dev junkie really feels too condescending and co-cocky?",
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

const SeachModal = ({ setOpenSearhModal }) => {
    const [searchResult, setSearchResult] = useState([]);
    const inputRef = useRef();

    useEffect(() => {
        inputRef.current.focus();
    }, [setOpenSearhModal]);

    const handleSearch = (e) => {
        const searchReq = e.target.value;

        if (!searchReq) {
            return setSearchResult([]);
        }
        const found = blogs
            .filter((blog) => {
                return Object.keys(blog).some((key) =>
                    ["title", "category"].includes(key)
                        ? blog[key].toString().toLowerCase().includes(searchReq.toLowerCase())
                        : false
                );
            })
            .map((item) => {
                let newTitle = item.title.replace(
                    new RegExp(searchReq, "gi"),
                    (match) =>
                        `<mark style="background: transparent; color: #ea4cb9;">${match}</mark>`
                );

                let newCategory = item.category.replace(
                    new RegExp(searchReq, "gi"),
                    (match) =>
                        `<mark style="background: transparent; color: #ea4cb9;">${match}</mark>`
                );

                let type = "title";
                let markedContent = newTitle;
                let name = item.title;

                if (newCategory.includes("mark")) {
                    type = "category";
                    markedContent = newCategory;
                    name = item.category;
                }

                return {
                    ...item,
                    markedContent,
                    type,
                    name,
                };
            })
            .sort((a, b) => {
                if (a.views < b.views) return 1;
                else if (a.views > b.views) return -1;
            });

        console.log(found);
        setSearchResult(found);
    };

    const handleCloseModal = () => {
        setOpenSearhModal(false);
    };
    return (
        <div
            className={`fixed inset-0 ${styles.searchModalContainer}`}
            onClick={handleCloseModal}
            onKeyDown={(e) => handleEscape(e, () => handleCloseModal())}
        >
            <motion.div
                className={`relative ${styles.modal}`}
                key="modal"
                {...modalVariant}
                onClick={(e) => e.stopPropagation()}
            >
                <div className={styles.searchInput}>
                    <div className="flex-align-c w-100">
                        <span className={styles.searchIcon}>
                            <BiSearch />
                        </span>
                        <input
                            type="text"
                            className="w-100"
                            placeholder="Search blogs by category/title "
                            onChange={handleSearch}
                            ref={inputRef}
                        />
                    </div>
                    <span>
                        <button className="esc-btn notification__exit" onClick={handleCloseModal}>
                            esc
                        </button>
                    </span>
                </div>

                {/* search results */}
                {searchResult.length > 0 && (
                    <div className={styles.searchModal__resultsContainer}>
                        <h4 className={styles.results__title}>Search results</h4>

                        {searchResult.slice(0, 5).map((item) => (
                            <Link
                                href={`/dashboard/blogs?${item.type}=${slugify(
                                    item.name.toLowerCase()
                                )}`}
                                key={item.id}
                            >
                                <div
                                    className={styles.searchResults}
                                    key={item.id}
                                    onClick={handleCloseModal}
                                >
                                    <div className="flex-align-c">
                                        <div className={styles.searchResults__iconFile}>
                                            <VscFile />
                                        </div>
                                        <div
                                            className={styles.searchResults__title}
                                            dangerouslySetInnerHTML={{
                                                __html: item.markedContent,
                                            }}
                                            title={`Category: ${item.category}`}
                                        ></div>
                                    </div>

                                    <div className={styles.searchResults__iconLink}>
                                        <FiCornerDownLeft />
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </motion.div>
        </div>
    );
};

export default SeachModal;
