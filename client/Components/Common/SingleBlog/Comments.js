import React, { useState } from "react";
import { findLinkInString } from "../../../helpers/findLinkInString";
import { smoothScroll } from "../../../helpers/nativeJS";
import { getDateAndTime } from "../../../helpers/time";

import styles from "../common.module.css";

const Comments = ({ title, scrolled }) => {
    const [comments, setComments] = useState([]);

    const [form, setForm] = useState({ comment: "", name: "", email: "", notify: false });

    const [errors, setErrors] = useState({});

    const submitComment = (e) => {
        e.preventDefault();

        // if no comment
        let newErrors = {};
        if (!form.comment) {
            newErrors.comment = true;
        }

        // if notify checkbox is checked but no email

        if (form.notify && !form.email) {
            newErrors.email = true;
        }

        // if any errors exist
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        // no errors everything ok to submit
        setErrors({});
        let comment = JSON.parse(JSON.stringify(form));

        comment.date = getDateAndTime(new Date());

        setComments([...comments, comment]);
        setForm({ comment: "", name: "", email: "", notify: false });
    };

    const handleChange = (name, value) => {
        let newForm = { ...form };
        if (name == "notify") {
            value = !form.notify;
        }

        console.log({ value });
        newForm[name] = value;
        setForm(newForm);
    };
    return (
        <div id="comments" className={styles.comments}>
            <div className="flex-between mt-4">
                <div className={styles.comments__title}>
                    Comments
                    <span className="ml-2">{comments.length}</span>
                </div>

                <a className="stylish-btn" onClick={() => smoothScroll("write_comment")}>
                    post a comment
                </a>
            </div>
            {scrolled && (
                <div className="border__top mt-4">
                    {comments.map((comment, index) => {
                        /* display comments */
                        let name = comment.name || "anonymous";
                        let body = findLinkInString(comment.comment);
                        return (
                            <div className={styles.comment__container} key={index}>
                                <div className={styles.comment__name}>{name} says...</div>
                                <div
                                    className={styles.comment__body}
                                    dangerouslySetInnerHTML={{ __html: body }}
                                ></div>
                                <div className={styles.comment__footer + " flex-between"}>
                                    <span className={styles.comment__date}>{comment.date}</span>

                                    <button
                                        className={
                                            styles.comment__reply +
                                            " secondary-link secondary-hover uppercase"
                                        }
                                        onClick={() => {}}
                                    >
                                        reply
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            <form className={styles.comments__form}>
                <label htmlFor="textarea" className={styles.comments__form__inputLabel}>
                    Comment
                </label>
                <div>
                    <textarea
                        className="form-textarea w-100"
                        style={{ border: errors.comment && "1px solid red" }}
                        rows="13"
                        id="textarea"
                        value={form.comment}
                        onChange={(e) => handleChange("comment", e.target.value)}
                    ></textarea>
                </div>

                <div>
                    <label htmlFor="name" className={styles.comments__form__inputLabel}>
                        Name
                    </label>
                    <div>
                        <input
                            className="form-input w-100"
                            id="name"
                            value={form.name}
                            autoComplete="off"
                            onChange={(e) => handleChange("name", e.target.value)}
                        ></input>
                    </div>
                </div>

                <div>
                    <label htmlFor="email" className={styles.comments__form__inputLabel}>
                        Email
                    </label>
                    <div>
                        <input
                            className="form-input w-100"
                            style={{ border: errors.email && "1px solid red" }}
                            id="email"
                            value={form.email}
                            autoComplete="off"
                            onChange={(e) => handleChange("email", e.target.value)}
                        ></input>
                    </div>
                </div>

                <div className={styles.comments__form__notify}>
                    <label htmlFor="notify">NOTIFY ME OF FOLLOW-UP COMMENTS BY EMAIL.</label>

                    <div>
                        <input
                            type="checkbox"
                            name="notify"
                            id="notify"
                            checked={form.notify}
                            className={styles.comments__form__checkbox}
                            onChange={(e) => handleChange("notify", e.target.value)}
                        />
                    </div>
                </div>

                <div className={styles.comments__btnContainer}>
                    <button className="stylish-btn" id="write_comment" onClick={submitComment}>
                        post a comment{" "}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Comments;
