import React, { useState, useEffect } from "react";
import { findLinkInString } from "../../../helpers/findLinkInString";
import { smoothScroll } from "../../../helpers/nativeJS";
import { getDateAndTime } from "../../../helpers/time";
import { useNormalFetch } from "../../../hooks/useNormalFetch";

import styles from "../common.module.css";

const Comments = ({ title, scrolled, blog_id }) => {
    const [comments, setComments] = useState([]);

    const [form, setForm] = useState({ body: "", name: "", email: "", notify: false });
    const [submittedForm, setSubmittedForm] = useState(null);
    const [apiType, setApiType] = useState("post");

    const [errors, setErrors] = useState({});

    // if user is replying to someone to disable regular comment form (usually false)
    const [isReplyingTo, setIsReplyingTo] = useState({});

    const {
        error: serverError,
        loading,
        res,
    } = useNormalFetch({
        //custom hook to post comment
        body: submittedForm,
        type: apiType,
        withAuth: true,
        url: "comments",
    });

    useEffect(() => {
        if (res) {
            setSubmittedForm(null); //reset
        }
    }, [res]);

    const submitComment = (e) => {
        e.preventDefault();

        // if no body
        let newErrors = {};
        if (!form.body) {
            newErrors.body = true;
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
        comment.blog_id = blog_id;
        console.log(comment, "test");

        let maxId = 0;

        for (let comm of comments) {
            if (comm.id > maxId) {
                maxId = comm.id;
            }
        }

        // for init
        if (maxId == 0) {
            comment.id = 1;
        } else {
            comment.id = maxId + 1; //temp (delete after api)
        }

        // when replying to someone's comment
        if (Object.keys(isReplyingTo).length > 0) {
            for (let comm of comments) {
                if (isReplyingTo.parentId == comm.id) {
                    comment.parentId = comm.id;
                    if (comm.children) {
                        comm.children = [...comm.children, comment];
                    } else {
                        comm.children = [comment];
                    }
                    setComments([...comments]);
                    setIsReplyingTo({});
                }
            }
        } else {
            console.log("here");
            setComments([...comments, comment]);
            setSubmittedForm(comment);
        }

        setForm({ body: "", name: "", email: "", notify: false });
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
                        return (
                            <div key={comment.id}>
                                <Comment
                                    comment={comment}
                                    index={index}
                                    isParent={true}
                                    setIsReplyingTo={setIsReplyingTo}
                                />
                                {Object.keys(isReplyingTo).length == 1 &&
                                    isReplyingTo.parentId == comment.id && (
                                        <div className={styles.comment__replyContainer}>
                                            <div className="flex-between">
                                                <div
                                                    className={
                                                        styles.comment__name + " capitalize font-18"
                                                    }
                                                >
                                                    Reply to {name}
                                                </div>
                                                <button
                                                    className={
                                                        styles.comment__reply +
                                                        " secondary-link secondary-hover uppercase"
                                                    }
                                                    onClick={() => {
                                                        setIsReplyingTo({});
                                                    }}
                                                >
                                                    cancel reply
                                                </button>
                                            </div>

                                            <Form
                                                handleChange={handleChange}
                                                submitComment={submitComment}
                                                form={form}
                                                errors={errors}
                                                isReply={true}
                                            />
                                        </div>
                                    )}
                                {comment.children && (
                                    <div className={styles.comment__replyContainer}>
                                        {comment.children.map((replyComment, index) => {
                                            return (
                                                <Comment
                                                    comment={replyComment}
                                                    index={index}
                                                    isParent={false}
                                                    setIsReplyingTo={setIsReplyingTo}
                                                />
                                            );
                                        })}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            )}

            {/* disable if replying */}
            {Object.keys(isReplyingTo).length == 0 && (
                <Form
                    handleChange={handleChange}
                    submitComment={submitComment}
                    form={form}
                    errors={errors}
                />
            )}
        </div>
    );
};

const Comment = ({ comment, index, isParent, setIsReplyingTo }) => {
    let name = comment.name || "anonymous";
    let body = findLinkInString(comment.body);
    return (
        <div className={styles.comment__container} key={index}>
            <div className={styles.comment__name + " uppercase font-14-5"}>{name} says...</div>
            <div className={styles.comment__body} dangerouslySetInnerHTML={{ __html: body }}></div>
            <div className={styles.comment__footer + " flex-between"}>
                <span className={styles.comment__date}>{comment.date}</span>

                {isParent && (
                    <button
                        className={
                            styles.comment__reply + " secondary-link secondary-hover uppercase"
                        }
                        onClick={() => {
                            setIsReplyingTo({ parentId: comment.id });
                        }}
                    >
                        reply
                    </button>
                )}
            </div>
        </div>
    );
};

const Form = ({ handleChange, submitComment, form, errors, isReply }) => {
    return (
        <form className={styles.comments__form}>
            <label htmlFor="textarea" className={styles.comments__form__inputLabel}>
                Comment
            </label>
            <div>
                <textarea
                    className="form-textarea w-100"
                    style={{ border: errors.body && "1px solid red" }}
                    rows="13"
                    id="textarea"
                    value={form.body}
                    onChange={(e) => handleChange("body", e.target.value)}
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
                    {isReply ? "reply" : "post a comment"}
                </button>
            </div>
        </form>
    );
};

export default Comments;
