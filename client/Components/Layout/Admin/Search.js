import React, { useState } from "react";

import { AiOutlineSearch } from "react-icons/ai";

import { AnimatePresence } from "framer-motion";
import styles from "./adminLayout.module.css";
import dynamic from "next/dynamic";

const SearchModal = dynamic(() => import("../../Common/Modal/SeachModal"), { ssr: false });

const Search = () => {
    const [openSearhModal, setOpenSearhModal] = useState(false);
    return (
        <>
            <div
                className={`${styles.searchContainer} main-transition`}
                onClick={() => setOpenSearhModal(true)}
            >
                <span className={styles.searchIcon}>
                    <AiOutlineSearch />
                </span>
                <span>Search for a blog</span>
            </div>

            <AnimatePresence exitBeforeEnter>
                {openSearhModal && (
                    <SearchModal setOpenSearhModal={setOpenSearhModal}></SearchModal>
                )}
            </AnimatePresence>
        </>
    );
};

export default Search;
