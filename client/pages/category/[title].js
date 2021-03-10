export default function blogsByCategory({ foundBlog }) {
  if (!foundBlog) return <h1>Sorry no blogs were found</h1>;

  return <div>{JSON.stringify(foundBlog)}</div>;
}

export const getStaticProps = async (ctx) => {
  console.log(ctx);
  //     const res = await fetch(`${process.env.SERVER_URL}/api/blogs/category`);
  //   const data = await res.json();

  //   if (!data) {
  //     return {
  //       notFound: true,
  //     };
  //   }

  return {
    props: { blogs: [] }, // will be passed to the page component as props
  };
};

export async function getStaticPaths() {
  return {
    paths: [
      // { params: { ... } } // See the "paths" section below
    ],
    fallback: true, // See the "fallback" section below
  };
}
