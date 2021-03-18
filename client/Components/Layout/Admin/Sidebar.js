import React, { useState, useEffect } from "react";
import Link from "next/link";
import slugify from "slugify";

import styles from "./adminLayout.module.css";
import { useRouter } from "next/router";

const defaultData = [
    { id: 1, name: "Dashboard", link: "/", active: true },
    { id: 2, name: "Create blog", link: "/create-blog", active: false },
    { id: 3, name: "Blogs", link: "/blogs", active: false },
    { id: 4, name: "Categories", link: "/categories", active: false },
    { id: 5, name: "Forms", link: "/", active: false },
    { id: 6, name: "Empty page", link: "/", active: false },
];

const Sidebar = ({ openSidebar, setOpenSidebar }) => {
    const [links, setLinks] = useState(defaultData);
    const router = useRouter();

    // set active
    useEffect(() => {
        let path = router.pathname.split("/"); // "", "dashboard" "third param"

        if (path[2]) {
            let found = defaultData.find((item) => item.link.includes(path[2]));
            handleActive(found?.id);
        }
        console.log("router");
    }, [router]);

    const handleActive = (id) => {
        const tempLinks = [...links];
        for (let i = 0; i < tempLinks.length; i++) {
            let link = tempLinks[i];

            if (link.id === id) {
                link.active = true;
                // setCurrent(link.name);
            } else {
                link.active = false;
            }
        }

        setOpenSidebar(false);
        setLinks([...tempLinks]);
    };
    return (
        <div className={`${styles.sidebar} ${openSidebar ? styles.active : ""}`}>
            {links.map((link) => {
                let classNames = styles.sidebar__link;
                classNames += link.active ? ` ${styles.sidebar__link__active}` : "";

                return (
                    <Link href={`/dashboard${link.link}`} key={link.id}>
                        <a
                            className={`${classNames} secondary-transition`}
                            onClick={() => handleActive(link.id)}
                        >
                            {link.name}
                        </a>
                    </Link>
                );
            })}
        </div>
    );
};

export default Sidebar;
