import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

import styles from "./modal.module.css";
import FillButton from "../Ui/FillButton";

const modalVariant = {
    initial: {
        bottom: "-10px",
        transition: { type: "spring", damping: 200, stifness: 50 },
    },
    animate: { bottom: 0 },
    exit: { bottom: "-10px" },
};

const exitButtonVariant = {
    initial: {
        opacity: 0,
        top: "-100%",
    },
    animate: { opacity: 1, top: "50px" },
    exit: { opacity: 0, top: "-100%" },
};
export const Modal = ({ setOpenModal, maxWidth = "28rem", children }) => {
    return (
        <div>
            <div
                className={`flex-center fixed inset-0 ${styles.modalContainer}`}
                onClick={() => setOpenModal(false)}
            >
                <div style={{ maxWidth }}>
                    <motion.div
                        // layout
                        className={`relative ${styles.modal}`}
                        key="modal"
                        {...modalVariant}
                        // variants={modalVariant}
                    >
                        {children}
                    </motion.div>
                </div>
            </div>

            <motion.div
                // layout
                className={styles.exitButton}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                // {...exitButtonVariant}
                variants={exitButtonVariant}
                initial="initial"
                animate="animate"
                exit="exit"
            >
                <FillButton
                    bgColor="rgba(0,0,0,0.8)"
                    color="white"
                    fillColor="pink-5"
                    onClick={() => setOpenModal(false)}
                >
                    <button className="non-focusable">x</button>
                </FillButton>
            </motion.div>
        </div>
    );
};
