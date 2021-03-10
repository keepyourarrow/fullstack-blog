export default function BlogDetails( {foundBlog} ) {
    if ( !foundBlog )
        return <h1>Sorry no blog was found</h1>

    return <div>{JSON.stringify( foundBlog )}</div>
}


export const getServerSideProps = async ( ctx ) => {
    const id = ctx.params.id;
    console.log( id );
    const data = [
        {id: 1, title: "first blog", photo: "url//http:///////1231231213", description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam dolore, placeat sunt laboriosam consequuntur alias."},
        {id: 2, title: "second blog", photo: "url//http:///////1231231213", description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam dolore, placeat sunt laboriosam consequuntur alias."},
        {id: 3, title: "third blog", photo: "url//http:///////1231231213", description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam dolore, placeat sunt laboriosam consequuntur alias."},
        {id: 4, title: "fou blog", photo: "url//http:///////1231231213", description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam dolore, placeat sunt laboriosam consequuntur alias."},
        {id: 5, title: "five blog", photo: "url//http:///////1231231213", description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam dolore, placeat sunt laboriosam consequuntur alias."},
        {id: 6, title: "six blog", photo: "url//http:///////1231231213", description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam dolore, placeat sunt laboriosam consequuntur alias."},
    ];

    const foundBlog = data.find( ( blog ) => blog.id == id );

    return {props: {foundBlog: foundBlog || null}}
}