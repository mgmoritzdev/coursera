const http = require( "http" );
const fs = require( "fs" );
const path = require( "path" );

const host = "localhost";
const port = 3000;

const server = http.createServer( ( req, res ) => {
  console.log( req.headers );

  if ( req.method == "GET" ) {
    var fileUrl;
    if ( req.url == "/" ) {
      fileUrl = "/index.html";
    } else {
      fileUrl = req.url;
    }

    var filePath = path.resolve( "./public" + fileUrl );
    console.log( filePath );
    const fileExt = path.extname( filePath );

    if ( fileExt == ".html" ) {
      fs.exists( filePath, ( exists ) => {
        if ( !exists ) {
          res.statusCode = 404;
          res.setHeader( "Content-Type", "text/html" );
          res.end( "<html><body><h1>Error 404</h1></body></html>" );
        }
        res.statusCode = 200;
        res.setHeader( "Content-Type", "text/html" );
        fs.createReadStream( filePath ).pipe( res );

      } );
    } else {
      res.statusCode = 404;
      res.setHeader( "Content-Type", "text/html" );
      res.end( "<html><body><h1>Error 404</h1></body></html>" );
    }
  } else {
    res.statusCode = 404;
    res.setHeader( "Content-Type", "text/html" );
    res.end( "<html><body><h1>Error 404</h1></body></html>" );
  }
} );

server.listen( port, host, ()=> {console.log( `Server running at http://${host}:${port}` );} );
