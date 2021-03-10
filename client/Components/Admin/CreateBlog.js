import React, { useState, useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useNormalFetch } from "../../hooks/useNormalFetch";
import { useValidateImageURL } from "use-validate-image-url";

import Editor from "../Common/Editor";
import DisplaySingleBlog from "../Common/DisplaySingleBlog";

import styles from "./admin.module.css";
import DefaultLayout from "../Layout/DefaultLayout";
import Notification from "../Common/Notification/Notification";

import { handleEscape } from "../../helpers/keyPresses";

const CreateBlog = () => {
    const { user } = useAuth();

    //#region  state
    const [blog, setBlog] = useState({});
    const [body, setBody] = useState(null);
    const [errors, setErrors] = useState({});
    const [showPreview, setShowPreview] = useState(false);
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

        console.log(content);

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
                            x
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
        <main className={`non-focusable ${styles.main}`}>
            <div className={styles.title}>Create new blog</div>

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

                        <input type="submit" onClick={handleSubmit} />
                    </form>

                    {Object.keys(blog).length > 0 && (
                        <button
                            onClick={() => setShowPreview(true)}
                            title="Preview what you have so far"
                        >
                            Preview
                        </button>
                    )}
                </div>
            </div>

            {/* <AnimatePresence>
                {showPreview && (
                    <Modal setOpenModal={setShowPreview} maxWidth="1250px" exitButton={false}>
                        <DisplaySingleBlog blog={blog} userName={user.userName} />
                    </Modal>
                )}
            </AnimatePresence> */}
        </main>
    );
};

export default CreateBlog;

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

1. Style buttons in a unique way.
2. Make tooltip question mark prettier
3. Think of a good explanation for Short preview, include that it should ideally be less than 90 characters
4. work on DisplayBlogsAsGrid
5. work on /search?query component + maybe add highlighted search
6. remove ... from DisplaySingleBlog.js

*/
