import React, { useEffect, useState, useRef } from "react";
import { GoSearch } from "react-icons/go";
import { AiOutlineClose } from "react-icons/ai";
// import { useInput } from "../../hooks/useInput";

const Search = (props) => {
    const [showInput, setShowInput] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        props.history.location.push({
            pathname: "/search",
            search: `?search=${input}`,
        });
        setInput("");
        setShowInput(false);
    };
    // const { input, setInput, handleChange, handleKeyPress } = useInput({
    //     handleSubmit,
    //     setShowInput,
    // });
    const inputRef = useRef(null);

    useEffect(() => {
        // inputRef.current.focus();
    }, [showInput]);

    return (
        <form className="primary-nav__search-form">
            <div className="primary-nav__search-form__input-container absolute">
                {/* <input
                    // value={input}
                    className={`primary-nav__search-form__input-field form-input main-transition ${
                        showInput ? "showInput" : ""
                    }`}
                    ref={inputRef}
                    // onChange={handleChange}
                    // onKeyDown={handleKeyPress}
                    type="text"
                    placeholder={"Search"}
                /> */}
            </div>
            {!showInput ? (
                <button
                    className="primary-nav__search-form__search-btn relative"
                    onClick={() => setShowInput(true)}
                >
                    <span>
                        <GoSearch />
                    </span>
                </button>
            ) : (
                <div className="primary-nav__search-form__input-btn-container relative">
                    <button className="primary-nav__search-form__input-btn" onClick={handleSubmit}>
                        <span>
                            <GoSearch />
                        </span>
                    </button>
                    <button
                        className="primary-nav__search-form__input-btn"
                        onClick={() => setShowInput(false)}
                    >
                        <span>
                            <AiOutlineClose />
                        </span>
                    </button>
                </div>
            )}
        </form>
    );
};

export default Search;
