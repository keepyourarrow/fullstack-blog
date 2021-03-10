import React from "react";

const Notification = ({ message, setClose }) => {
    return (
        <div className="fixed notification">
            <span className="notification__message">{message}</span>
            <button className="esc-btn notification__exit" onClick={() => setClose(false)}>
                esc
            </button>
        </div>
    );
};

export default Notification;
