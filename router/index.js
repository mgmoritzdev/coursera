const express = require( "express" );
const http = require( "http" );
const bodyParser = require( "body-parser" );
const morgan = require( "morgan" );

const host = "localhost";
const port = 3000;

const app = express();
app.use( bodyParser.json() );
app.use( morgan( "dev" ) );

app.all( "/dishes", ( req, res, next ) => {
  res.statusCode = 200;
  res.setHeader( "Content-Type", "text/plain" );
  next();
} );

app.get( "/dishes", ( req, res, next ) => {
  res.end( "Will send all the dishes to you" );
} );

app.post( "/dishes", ( req, res, next ) => {
  const { name, description } = req.body;
  res.end( `Will add the dish ${name} with details ${description}` );
} );

app.put( "/dishes", ( req, res, next ) => {
  res.statusCode = 403;
  res.end( "PUT operation not supported /dishes" );
} );

app.delete( "/dishes", ( req, res, next ) => {
  res.end( "Deleting all the dishes!" );
} );

app.get( "/dishes/:dishId", ( req, res, next ) => {
  res.end( `Will send details of ${req.params.dishId}` );
} );

app.post( "/dishes/:dishId", ( req, res, next ) => {
  const { name, description } = req.body;
  res.end( `POST operation is not supperted in /dishes/:dishId` );
} );

app.put( "/dishes/:dishId", ( req, res, next ) => {
  const { name, description } = req.body;

  res.statusCode = 403;
  res.write( `Update the dish: ${req.params.dishId}` );
  res.end( `Will update the dish: ${name} with details: ${descrition}` );
} );

app.delete( "/dishes/:dishId", ( req, res, next ) => {
  res.end( `Deleting the dish ${req.params.dishId}` );
} );

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
