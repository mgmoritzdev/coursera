const express = require( "express" );
const http = require( "http" );
const bodyParser = require( "body-parser" );
const morgan = require( "morgan" );
const dishRouter = require( "./routes/dishRouter" );

const host = "localhost";
const port = 3000;

const app = express();
app.use( bodyParser.json() );
app.use( morgan( "dev" ) );
app.use( "/dishes", dishRouter );

app.use( express.static( `${__dirname}/public` ) );

app.use( ( req, res, next ) => {
  res.statusCode = 200;
  res.setHeader( "Content-Type", "text/html" );
  res.end( "<html><body><h1>Hello</h1></body></html>" );
} );

const server = http.createServer( app );

server.listen( port, host, () => {
  console.log( `Running at http://${host}:${port}` );
} );
