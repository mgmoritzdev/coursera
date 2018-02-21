var rect = require( "./rectangle" );

function solveRect( l, b ) {
  console.log( `l: ${l}, b = ${b}` );

  rect( l, b, ( err, rectangle ) => {
    if ( err ) {
      console.log( "err" );
    } else
    {
      console.log( `area: ${rectangle.area()}` );
      console.log( `perimeter: ${rectangle.perimeter()}` );
    }
  } );
}

solveRect( 14, 20 );
