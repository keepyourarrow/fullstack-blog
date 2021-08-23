import React from "react";
import Sidebar from "../Sidebar/Sidebar";
import Header from "./Header/Header";

const DefaultLayout = ({ children }) => {
    return (
        <div className="app">
            <div className="container app__main-wrapper">
                <Header />

                <main className="app__main-section">
                    <section className="blog-section">{children}</section>
                    <Sidebar />
                </main>
            </div>
        </div>
    );
};

export default DefaultLayout;
