import React, { useState, useRef, useEffect } from "react";

import styles from "./modal.module.css";

const DeleteModal = ({ name, exitModal, callback }) => {
    const [input, setInput] = useState("");
    const inputRef = useRef();
    const handleCopy = (e) => {
        e.preventDefault();
    };

    useEffect(() => {
        inputRef.current.focus();
    }, [name]);

    return (
        <div className={styles.deleteModal} onClick={(e) => e.stopPropagation()}>
            <h3 className={styles.deleteModal__header} onCopy={handleCopy}>
                Delete '{name}'
            </h3>

            <div style={{ padding: "0 1rem" }}>
                <div className={styles.deleteModal__warning} onCopy={handleCopy}>
                    Are you sure you want to delete <strong>{name}</strong>
                    This action cannot be undone
                </div>
            </div>

            <div className={styles.deleteModal__body}>
                <div className={styles.deleteModal__enterName}>Enter title</div>
                <input
                    className={styles.deleteModal__input}
                    onChange={(e) => setInput(e.target.value)}
                    type="text"
                    ref={inputRef}
                />
            </div>

            <div className={styles.deleteModal__footer}>
                <div>
                    <button
                        className={`non-focusable ${styles.cancelButton}`}
                        onClick={() => exitModal(false)}
                    >
                        Cancel
                    </button>
                    <button
                        className="non-focusable main-transition delete-button"
                        onClick={callback}
                        disabled={input === name ? false : true}
                    >
                        Delete Blog
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteModal;
