import Head from "next/head";
import { Home } from "../Components/Home/Home";
import DefaultLayout from "../Components/Layout/DefaultLayout";

export default function HomePage({ blogs, notFound }) {
    if (blogs.length === 0) {
        return <div>NOt found</div>;
    }
    return (
        <div>
            <Home blogs={blogs} />
        </div>
    );
}

export async function getStaticProps(context) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/blogs`);
    const data = await res.json();

    if (!data) {
        return {
            notFound: true,
        };
    }

    return {
        props: { blogs: data }, // will be passed to the page component as props
    };
}
