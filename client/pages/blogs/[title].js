import DisplaySingleBlog from "../../Components/Common/SingleBlog/DisplaySingleBlog";

export default function blogByTitlePage({ blog }) {
    return (
        <DisplaySingleBlog
            blog={{ ...blog }}
            author={blog.user}
            created_at={blog.created_at}
            comments={blog.comments}
            type="single"
        />
    );
}

export const getStaticProps = async ({ params }) => {
    const data = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/blogs/${params.title}`);
    const blog = await data.json();

    if (blog.message) {
        return {
            notFound: true,
        };
    }

    return {
        props: { blog }, // will be passed to the page component as props
        revalidate: 120,
    };
};

export async function getStaticPaths() {
    const data = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/blogs`);

    const json = await data.json();

    const paths = json.map((item) => ({ params: { title: item.title.toLowerCase() } }));

    console.log(paths);
    return {
        paths,
        fallback: "blocking",
    };
}
