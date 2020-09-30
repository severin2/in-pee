const { uniq } = require( 'lodash' );

function makeArray( length, width ) {
  const newArray = [];
  for ( let i = 0; i < length; i += 1 ) {
    newArray.push( null );
  }
  if ( !width ) {
    return newArray;
  }
  for ( let i = 0; i < length; i += 1 ) {
    newArray[ i ] = makeArray( width );
  }
  return newArray;
}

const MAX_SIZE = 10;

// Stores the vertices
const store = makeArray( MAX_SIZE );

// Graph
const graph = makeArray( MAX_SIZE, MAX_SIZE );

// Degree of the vertices
const d = makeArray( MAX_SIZE );

const cliquesFound = [];

// Function to check if the given set of vertices
// in store array is a clique or not
function is_clique( vertex ) {
  // Run a loop for all the set of edges
  // for the select vertex
  for ( let i = 1; i < vertex; i++ ) {
    for ( let j = i + 1; j < vertex; j++ ) {

      // If any edge is missing
      if ( graph[ store[ i ] ][ store[ j ] ] == 0 ) {
        return false;
      }
    }
  }
  return true;
}

// Function to print the clique
function print( n ) {
  for ( let i = 1; i < n; i++ ) {
    cliquesFound.push( store.slice( 1, n ).join( ' ' ) );
  }
}

// Function to find all the cliques of size s
function findCliques( start, lengthOfSet, s, n ) {
  // Check if any vertices from start+1 can be inserted
  for ( let j = start + 1; j <= n - ( s - lengthOfSet ); j++ )

    // If the degree of the graph is sufficient
    if ( d[ j ] >= s - 1 ) {

      // Add the vertex to store
      store[ lengthOfSet ] = j;

      // If the graph is not a clique of size k
      // then it cannot be a clique
      // by adding another edge
      if ( is_clique( lengthOfSet + 1 ) ) {
        // If the length of the clique is
        // still less than the desired size
        if ( lengthOfSet < s ) {

          // Recursion to add vertices
          findCliques( j, lengthOfSet + 1, s, n );

        } else {
          // Size is met
          print( lengthOfSet + 1 );
        }
      }
    }
}

// Driver code
function start( k, edges ) {
  for ( let i = 0; i < edges.length; i++ ) {
    graph[ edges[ i ][ 0 ] ][ edges[ i ][ 1 ] ] = 1;
    graph[ edges[ i ][ 1 ] ][ edges[ i ][ 0 ] ] = 1;
    d[ edges[ i ][ 0 ] ] += 1;
    d[ edges[ i ][ 1 ] ] += 1;
  }

  findCliques( 0, 1, k, edges.length );

  return 0;
}

const edges = [
  [ 1, 2 ],
  [ 2, 3 ],
  [ 3, 1 ],
  [ 4, 3 ],
  [ 4, 5 ],
  [ 5, 3 ]
];
const k = 3;
start( k, edges );
console.log( uniq( cliquesFound ) );
