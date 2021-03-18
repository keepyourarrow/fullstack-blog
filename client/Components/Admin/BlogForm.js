import React, { useState, useEffect, useRef } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useNormalFetch } from "../../hooks/useNormalFetch";
import { useValidateImageURL } from "use-validate-image-url";

import Editor from "../Common/Editor";
import DisplaySingleBlog from "../Common/DisplaySingleBlog";

import styles from "./admin.module.css";
import { motion, AnimatePresence } from "framer-motion";
import FillButton from "../Common/Ui/FillButton";
import Notification from "../Common/Notification/Notification";
import DefaultLayout from "../Layout/DefaultLayout";

import Container from "./Template/Container";
import { handleEscape } from "../../helpers/keyPresses";
import { fadeVariant } from "../../helpers/framer-motion/variants";

const BlogForm = ({ title = "Create new blog", blog: existingBlog = {} }) => {
    const { user } = useAuth();
    const scrollToDiv = useRef();

    //#region  state
    const [blog, setBlog] = useState(existingBlog);
    const [body, setBody] = useState(null);
    const [errors, setErrors] = useState({});

    // preview
    const [showPreview, setShowPreview] = useState(false);
    const [closePreviewButton, setClosePreviewButton] = useState(false);
    //#endregion state
    const imageIsValid = useValidateImageURL(blog.image);

    const { error: fetchError, loading, res } = useNormalFetch({
        //custom hook to post user
        body,
        type: "post",
        url: "blogs",
        withAuth: true,
    });

    const handleEditorChange = (content, type) => {
        setBlog({
            ...blog,
            [type]: content,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        let title = blog.title?.trim();
        let category = blog.category?.trim();
        let { content, image, short_preview } = blog;

        let tempErrors = {};

        // title
        if (title) {
            if (title.length <= 5) {
                tempErrors.title = "5+ characters required";
            } else {
                delete tempErrors.title;
            }
        } else {
            tempErrors.title = "Title is required";
        }

        // category
        if (category) {
            if (category.length <= 3) {
                tempErrors.category = "3+ characters required";
            } else {
                delete tempErrors.category;
            }
        } else {
            tempErrors.category = "Category is required";
        }

        if (content) {
            if (content.length <= 50) {
                tempErrors.content = "Content is too short (50+ characters required)";
            } else {
                delete tempErrors.content;
            }
        } else {
            tempErrors.content = "Content is required";
        }

        if (image) {
            if (imageIsValid === "invalid") {
                tempErrors.image = "Invalid Url";
            } else {
                delete tempErrors.image;
            }
        } else {
            tempErrors.image = "Image is required";
        }

        if (short_preview) {
            if (short_preview.length <= 20) {
                tempErrors.short_preview = "20+ characters required";
            } else {
                delete tempErrors.short_preview;
            }
        } else {
            tempErrors.short_preview = "Short Preview is required";
        }

        setErrors(tempErrors);

        // scrollToTop;
        scrollToDiv.current.scrollIntoView({ behavior: "smooth" });

        if (Object.keys(tempErrors).length > 0) {
            return;
        }

        setBody({ ...blog });
        console.log("NO ERRORS");
    };

    if (showPreview) {
        return (
            <div className="fixed inset-0 overflow-y-auto">
                <Notification
                    message="This is just a preview. Press esc to exit"
                    setClose={setShowPreview}
                />

                <DefaultLayout>
                    <div className="relative w-100">
                        <button
                            className="absolute esc-btn"
                            style={{ right: 30, top: -10 }}
                            onClick={() => setShowPreview(false)}
                        >
                            esc
                        </button>
                        <section
                            className="blog-section non-focusable"
                            tabIndex="0"
                            onKeyDown={(e) => handleEscape(e, () => setShowPreview(false))}
                        >
                            <DisplaySingleBlog
                                blog={blog}
                                author={user.userName}
                                created_at={new Date().toJSON()}
                                comments={0}
                                type="single"
                            />
                        </section>
                    </div>
                </DefaultLayout>
            </div>
        );
    }

    const props = {
        setBlog,
        blog,
        errors,
    };
    return (
        <Container title={title} containerRef={scrollToDiv}>
            <div className={`container ${styles.mainContent}`}>
                <div className={`${styles.formContainer}`}>
                    <form>
                        <Input type="title" name="Title" value={blog.title} {...props} />
                        <Input type="category" name="Category" value={blog.category} {...props} />

                        <Input
                            type="image"
                            name="Image"
                            value={blog.image}
                            placeholder="Example: https://i.imgur.com/jcIN7Kt.jpeg"
                            suggestion="(.jpg .png .jpeg)"
                            {...props}
                        />

                        <Input
                            type="short_preview"
                            name="Short Preview"
                            value={blog.short_preview}
                            suggestion="(This is a short description)"
                            tooltip="you can see it when you browse by category/search"
                            placeholder="20-80 characters"
                            {...props}
                        />

                        <div className="field-group">
                            {/* content */}
                            <div className="field">
                                <div className="label" htmlFor="title">
                                    Content <span className="required">*</span>
                                    <span className="suggestion">
                                        - (this is the main body of your blog)
                                    </span>
                                </div>
                                {errors.content && <div className="error">{errors?.content}</div>}

                                <Editor
                                    height="500"
                                    initVal={blog.content || ""}
                                    type="content"
                                    onChange={handleEditorChange}
                                />
                            </div>
                        </div>

                        <div
                            className="field-group"
                            title={
                                "Preview is what's gonna be shown on the main page as a description of the blog." +
                                "\nThink of a preview as a teaser or a clickbaity youtube thumbnail." +
                                "\nIf you choose to omit the preview, there will be no read more button." +
                                "\nInclude Preview if you want to handpick what the reader is gonna see in the description"
                            }
                        >
                            {/* preview */}
                            <div className="field">
                                <div className="label">
                                    <span>
                                        Preview <span className="optional">(optional)</span>
                                    </span>
                                    <span className="question-mark">?</span>
                                </div>

                                <Editor
                                    height="500"
                                    initVal={blog.preview || ""}
                                    type="preview"
                                    onChange={handleEditorChange}
                                />
                            </div>
                        </div>

                        <input className="btn btn-main mt-1" type="submit" onClick={handleSubmit} />
                    </form>

                    {inputsNotEmpty(blog) && (
                        <div className="fixed" style={{ top: "170px", right: "85px" }}>
                            <AnimatePresence exitBeforeEnter>
                                {!closePreviewButton && (
                                    <motion.div
                                        transition={{ duration: 0.2, ease: "easeInOut" }}
                                        key="preview"
                                        {...fadeVariant("scale", 0.5, 1)}
                                    >
                                        <FillButton
                                            bgColor="#007fff"
                                            fillColor="green"
                                            width="6.6rem"
                                            height="3.4rem"
                                        >
                                            <button
                                                onClick={() => setShowPreview(true)}
                                                title="Preview what you have so far"
                                            >
                                                Preview
                                            </button>
                                        </FillButton>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                            <button
                                className="fixed secondary-btn"
                                style={{ top: "185px", right: "15px" }}
                                onClick={() => setClosePreviewButton(!closePreviewButton)}
                            >
                                {!closePreviewButton ? "hide" : "show"}
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </Container>
    );
};

export default BlogForm;

// custom component

const Input = ({ type, name, value, blog, setBlog, errors, placeholder, suggestion, tooltip }) => {
    return (
        <div className="field-group">
            <div className="field">
                <div className="label" title={tooltip}>
                    <label htmlFor={type}>
                        {name} <span className="required">*</span>
                        {suggestion && <span className="suggestion">- {suggestion}</span>}
                        {tooltip && <span className="question-mark">?</span>}
                    </label>
                </div>
                <input
                    className="form-input"
                    type="text"
                    value={value || ""}
                    id={type}
                    name={type}
                    autoComplete="off"
                    onChange={(e) => setBlog({ ...blog, [type]: e.target.value })}
                    placeholder={placeholder || ""}
                />
                {errors[type] && <div className="error">{errors?.[type]}</div>}
            </div>
        </div>
    );
};

/* TODO

1. Style buttons in a unique way. ------- Done
2. Make tooltip question mark prettier --------- Done
3. Think of a good explanation for Short preview, include that it should ideally be less than 90 characters ------- Done
4. work on DisplayBlogsAsGrid
5. work on /search?query component + maybe add highlighted search ------- Done
6. remove ... from DisplaySingleBlog.js

*/

const inputsNotEmpty = (blog) => {
    return Object.values(blog).some((x) => x !== null && x !== "");
};
