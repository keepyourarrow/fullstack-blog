import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

import styles from "./modal.module.css";

export const Modal = ({ setOpenModal, maxWidth = "28 rem", exitButton = true, children }) => {
    return (
        <div
            className={`flex-center fixed inset-0 ${styles.modalContainer}`}
            onClick={() => (!exitButton ? setOpenModal(false) : "")}
        >
            <motion.div
                className={`relative ${styles.modal}`}
                style={{ maxWidth }}
                key="modal"
                transition={{ duration: 0.1, ease: "easeInOut" }}
                initial={{ opacity: 0, scale: 0.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.1 }}
            >
                {children}
                {exitButton && (
                    <button
                        type="button"
                        className="absolute top-0 right-0 -mx-8 w-6 h-6 focus:outline-none hover:text-gray-800"
                        onClick={() => setOpenModal(false)}
                    >
                        x
                    </button>
                )}
            </motion.div>
        </div>
    );
};
