const express = require( "express" );
const bodyParser = require( "body-parser" );

const dishRouter = express.Router();
dishRouter.use( bodyParser.json() );

dishRouter.route( "/" )
  .all( ( req, res, next ) => {
    res.statusCode = 200;
    res.setHeader( "Content-Type", "text/plain" );
    next();
  } )
  .get( ( req, res, next ) => {
    res.end( "Will send all the dishes to you" );
  } )
  .post( ( req, res, next ) => {
    const { name, description } = req.body;
    res.end( `Will add the dish ${name} with details ${description}` );
  } )
  .put( ( req, res, next ) => {
    res.statusCode = 403;
    res.end( "PUT operation not supported /dishes" );
  } )
  .delete( ( req, res, next ) => {
    res.end( "Deleting all the dishes!" );
  } );

dishRouter.route( "/:dishId" )
  .all( ( req, res, next ) => {
    res.statusCode = 200;
    res.setHeader( "Content-Type", "text/plain" );
    next();
  } )
  .get( ( req, res, next ) => {
    res.end( `Will send to you the dish ${req.params.dishId}` );
  } )
  .post( ( req, res, next ) => {
    res.statusCode = 403;
    res.end( "POST operation not supported /dishes" );
  } )
  .put( ( req, res, next ) => {
    res.statusCode = 403;
    const response = [
      `Will modify the dish ${req.params.dishId}`,
      `with name = ${req.body.name} and`,
      `description = ${req.body.description}`
    ].join( " " );
    res.end( response );
  } )
  .delete( ( req, res, next ) => {
    res.end( `Will delete the dish with id = ${req.params.dishId}` );
  } );

module.exports = dishRouter;
