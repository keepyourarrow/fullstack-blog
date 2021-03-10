import React, { useState } from "react";
import { useNormalFetch } from "../../hooks/useNormalFetch";

import styles from "./admin.module.css";


const Dashboard = () => {
    const [body, setBody] = useState(null);
    const { error: authError, loading, res } = useNormalFetch({
        //custom hook to post user
        body,
        type: "post",
        url: "blogs",
        withAuth: true,
    });

    return (
        <main className={styles.main}>
            <button
                onClick={() =>
                    setBody({
                        category: "life",
                        title: "My blog423",
                        content:
                            "<p>Bob</p> <p>Dop</p> <p>OOp</p> <p>Wop</p> <p>Gop</p> <p>Nop</p> <p>Rob</p>",
                        image:
                            "https://digitaltemplatemarket.com/wp-content/uploads/2019/03/Bluebox.jpg",
                    })
                }
                className="btn btn-main"
            >
                cc
            </button>
            <div className={styles.title}>Dashboard</div>
        </main>
    );
};

export default Dashboard;
