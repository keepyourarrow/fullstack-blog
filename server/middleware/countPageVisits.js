const { prisma } = require( "../lib/prisma.js" );

// counting views for pages
// /api/blogs/:title
// /api/blogs/category/:name
// TODO add more

function countPageVisits ( req, res, next ) {

  let url = req.originalUrl; // /api/blogs ...

  const ip = req.headers[ 'x-forwarded-for' ] || req.connection.remoteAddress;

  if ( url.includes( "/api/blogs/" ) ) {
    let params = url.replace( "/api/blogs/", "" );

    // api/blogs/:name/
    if ( params.includes( "/" ) ) {
      params = params.split( "/" );
      let type = params[ 0 ]; // category
      let queryParam = params[ 1 ]; // query param

      // api/blogs/category/:name
      if ( type === "category" && queryParam ) {
        console.log( params, "params" );
      }
    }

    // api/blogs/:name/
    if ( params[ 0 ] && !params[ 1 ] ) {
      console.log( params, "params2" );
    }

  }


  next();
}



module.exports = {
  countPageVisits,
};
